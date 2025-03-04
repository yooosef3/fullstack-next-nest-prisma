"use client"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { LOGIN_USER } from "@/graphql/actions/login.action";
import Cookies from "js-cookie";
const formSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست!"),
  password: z.string().min(8, "رمز عبور حداقل 8 کاراکتر می‌باشد!"),
});

type LoginSchema = z.infer<typeof formSchema>;

const LoginForm = ({ setActiveState, setOpen }: any) => {

  const [loginUser, { loading }] = useMutation(LOGIN_USER)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await loginUser({
        variables: loginData
      })
      if (response.data.Login.user) {
        toast.success("با موفقیت وارد شدید!");
        Cookies.set("refresh_token", response.data.Login.refreshToken);
        Cookies.set("access_token", response.data.Login.accessToken);
        setOpen();
        reset();
        window.location.reload();
      } else {
        toast.error(response.data.Login.error.message);
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="p-8 space-y-6 bg-white">
      <h1 className="text-2xl font-bold text-center text-gray-800">ورود</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2 w-full">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            ایمیل
          </label>
          <input
            dir="ltr"
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            رمز عبور
          </label>
          <div className="relative">
            <input
              dir="ltr"
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

        <div className="flex justify-between">
          <p onClick={() => setActiveState('ForgotPassword')} className="text-sm text-blue-600 hover:underline">فراموشی رمز عبور؟</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "در حال ورود..." : "ورود"}
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
        <p className="text-sm mt-4">حساب کاربری ندارید؟ <span onClick={() => setActiveState('Signup')} className="text-blue-600 cursor-pointer">ثبت نام</span></p>
      </div>
    </div>
  );
};

export default LoginForm;