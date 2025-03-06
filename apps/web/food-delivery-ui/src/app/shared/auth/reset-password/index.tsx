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

// Add type for password fields
type PasswordFieldId = 'password' | 'confirmPassword';

const ResetPassword = ({activationToken}:{activationToken:string | string[]}) => {
  const inputFields = [
    {
      id: 'password' as PasswordFieldId,
      label: "رمز عبور جدید",
      type: "password",
      placeholder: "********",
      dir: "ltr",
      isPassword: true
    },
    {
      id: 'confirmPassword' as PasswordFieldId,
      label: "تکرار رمز عبور",
      type: "password",
      placeholder: "********",
      dir: "ltr",
      isPassword: true
    }
  ] as const;

  const [showPassword, setShowPassword] = useState<Record<PasswordFieldId, boolean>>({
    password: false,
    confirmPassword: false
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(formSchema),
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const isInputsEmpty = !password || !confirmPassword;

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

  const togglePasswordVisibility = (field: PasswordFieldId) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="p-2 space-y-6 bg-white max-w-md mx-auto rounded-lg my-20">
      <h5 className="text-2xl font-bold text-center text-gray-800 p-3 bg-slate-50">تغییر رمز عبور</h5>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {inputFields.map((field) => (
          <div key={field.id} className="space-y-2 w-full">
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-500">
              {field.label}
            </label>
            <div className={`${field.isPassword ? 'relative' : ''}`}>
              <input
                dir={field.dir}
                {...register(field.id as keyof ResetPasswordSchema)}
                type={field.isPassword ? (showPassword[field.id as PasswordFieldId] ? "text" : "password") : field.type}
                id={field.id}
                className="!w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder={field.placeholder}
              />
              {field.isPassword && (
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(field.id)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword[field.id] ? <FaEyeSlash /> : <FaEye />}
                </button>
              )}
            </div>
            {errors[field.id as keyof ResetPasswordSchema] && (
              <p className="text-xs text-red-600">
                {errors[field.id as keyof ResetPasswordSchema]?.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting || loading || isInputsEmpty}
          className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {(isSubmitting || loading) ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          ) : (
            "تغییر رمز عبور"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
