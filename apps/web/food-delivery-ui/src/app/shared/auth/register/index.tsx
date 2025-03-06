"use client"
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '@/graphql/actions/register.action';
import toast from 'react-hot-toast';
const formSchema = z.object({
  name: z.string().min(2, "نام باید حداقل 2 کاراکتر باشد!"),
  email: z.string().email("ایمیل معتبر نیست!"),
  password: z.string().min(8, "رمز عبور حداقل 8 کاراکتر می‌باشد!"),
  phone_number: z
    .number()
    .min(11, "شماره تلفن باید 11 رقمی باشد!!"),
});

type RegisterSchema = z.infer<typeof formSchema>;

const RegisterForm = ({ setActiveState }: any) => {
  const inputFields = [
    {
      id: "name",
      label: "نام و نام خانوادگی",
      type: "text",
      placeholder: "علی محمدی",
      dir: "rtl",
      validation: {
        required: true,
        minLength: 2
      }
    },
    {
      id: "email",
      label: "ایمیل",
      type: "email",
      placeholder: "example@email.com",
      dir: "ltr"
    },
    {
      id: "phone_number",
      label: "شماره موبایل",
      type: "number",
      placeholder: "09123456789",
      dir: "ltr",
      valueAsNumber: true
    },
    {
      id: "password",
      label: "رمز عبور",
      type: "password",
      placeholder: "********",
      dir: "ltr",
      isPassword: true
    }
  ];

  const [registerUserMutation, { loading }] = useMutation(REGISTER_USER)

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
    try {
      const response = await registerUserMutation({
        variables: {
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          phone_number: registerData.phone_number,
        }
      })
      localStorage.setItem(
        "activation_token",
        response?.data?.register?.activation_token
      );
      localStorage.setItem('access_token', response?.data?.register?.access_token)
      console.log(response?.data?.register)
      toast.success("لطفا ایمیل خود را به منظور فعالسازی حساب خود بررسی کنید!")
      reset()
      setActiveState("Verification")
    } catch (error: any) {
      toast.error(error?.message)
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="p-2 space-y-6 bg-white">
      <h5 className="text-2xl font-bold text-center text-gray-800 p-3 bg-slate-50">ثبت نام</h5>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {inputFields.map((field) => (
          <div key={field.id} className="space-y-2 w-full">
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-500">
              {field.label}
            </label>
            <div className={`${field.isPassword ? 'relative' : ''}`}>
              <input
                dir={field.dir}
                {...register(field.id as keyof RegisterSchema, 
                  field.valueAsNumber ? { valueAsNumber: true } : {}
                )}
                type={field.isPassword ? (showPassword ? "text" : "password") : field.type}
                id={field.id}
                className="!w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder={field.placeholder}
              />
              {field.isPassword && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              )}
            </div>
            {errors[field.id as keyof RegisterSchema] && (
              <p className="text-xs text-red-600">
                {errors[field.id as keyof RegisterSchema]?.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "در حال ثبت نام..." : "ثبت نام"}
        </button>
      </form>

      <div className="flex flex-col items-center">
        {/* <p className="text-sm">یا با</p>
        <div className="flex space-x-4">
          <button onClick={signIn} className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
            <FaGoogle className="mr-2" />
          </button>
        </div> */}
        <p className="text-sm mt-4">از قبل حساب دارید؟ <span onClick={() => setActiveState('Login')} className="text-teal-600 cursor-pointer">وارد شوید</span></p>
      </div>
    </div>
  );
};

export default RegisterForm;
