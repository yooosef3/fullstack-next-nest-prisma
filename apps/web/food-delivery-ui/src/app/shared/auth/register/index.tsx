"use client"
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from 'react-icons/fa';
const formSchema = z.object({
  name: z.string().min(2, "نام باید حداقل 2 کاراکتر باشد!"),
  email: z.string().email("ایمیل معتبر نیست!"),
  password: z.string().min(8, "رمز عبور حداقل 8 کاراکتر می‌باشد!"),
  phone_number: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست!"),
});

type RegisterSchema = z.infer<typeof formSchema>;

const RegisterForm = ({setActiveState}:any) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    const registerData = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone_number: data.phone_number,
    };
    console.log(registerData);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="p-8 space-y-6 bg-white">
      <h1 className="text-2xl font-bold text-center text-gray-800">ثبت نام</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2 w-full">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            نام و نام خانوادگی
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="!w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="علی محمدی"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2 w-full">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            ایمیل
          </label>
          <input
          dir='ltr'
            {...register("email")}
            type="email"
            id="email"
            className="!w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2 w-full">
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
            شماره موبایل
          </label>
          <input
          dir='ltr'
            {...register("phone_number")}
            type="tel"
            id="phone_number"
            className="!w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="09123456789"
          />
          {errors.phone_number && (
            <p className="text-sm text-red-600">{errors.phone_number.message}</p>
          )}
        </div>

        <div className="space-y-2 w-full">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            رمز عبور
          </label>
          <div className='relative'>

          <input
          dir='ltr'
          {...register("password")}
          type={showPassword ? "text" : "password"}
          id="password"
          className="!w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="********"
          />
          <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
            </button>
                </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "در حال ثبت نام..." : "ثبت نام"}
        </button>
      </form>

      <div className="flex flex-col items-center">
        <p className="text-sm">یا با</p>
        <div className="flex space-x-4">
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
            <FaGoogle className="mr-2" />
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
            <FaGithub className="mr-2" />
          </button>
        </div>
        <p className="text-sm mt-4">از قبل حساب دارید؟ <span onClick={()=> setActiveState('Login')} className="text-blue-600 cursor-pointer">وارد شوید</span></p>
      </div>
    </div>
  );
};

export default RegisterForm;
