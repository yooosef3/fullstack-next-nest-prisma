"use client"
import React from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { RESET_PASSWORD } from '@/graphql/actions/reset-password.action';

const formSchema = z.object({
  password: z.string().min(8, "رمز عبور حداقل 8 کاراکتر می‌باشد!"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "رمز عبور و تکرار آن یکسان نیستند!",
  path: ["confirmPassword"],
});

type ResetPasswordSchema = z.infer<typeof formSchema>;

const ResetPassword = ({activationToken}:{activationToken:string | string[]}) => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(formSchema),
  });

  const [resetPassword, {loading}] = useMutation(RESET_PASSWORD)

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      await resetPassword({
        variables:{
            password: data?.password,
            activationToken
        }
      })
      toast.success("رمز عبور با موفقیت تغییر کرد!");
      reset();
      router.push('/');
    } catch (error: any) {
      toast.error(error.message)
    }
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="p-8 space-y-6 bg-white max-w-md mx-auto my-10 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center text-gray-800">تغییر رمز عبور</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            رمز عبور جدید
          </label>
          <div className="relative">
            <input
              dir="ltr"
              {...register("password")}
              type={showPassword.password ? "text" : "password"}
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('password')}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword.password ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            تکرار رمز عبور
          </label>
          <div className="relative">
            <input
              dir="ltr"
              {...register("confirmPassword")}
              type={showPassword.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirmPassword')}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "در حال ثبت..." : "تغییر رمز عبور"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
