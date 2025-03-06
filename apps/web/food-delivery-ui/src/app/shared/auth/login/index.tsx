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
  const inputFields = [
    {
      id: "email",
      label: "ایمیل",
      type: "email",
      placeholder: "example@email.com",
      dir: "ltr"
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
    <div className="p-2 space-y-6 bg-white">
      <h5 className="text-2xl font-bold text-center text-gray-800 p-3 bg-slate-50">ورود</h5>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {inputFields.map((field) => (
          <div key={field.id} className="space-y-2 w-full">
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-500">
              {field.label}
            </label>
            <div className={`${field.isPassword ? 'relative' : ''}`}>
              <input
                dir={field.dir}
                {...register(field.id as keyof LoginSchema)}
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
            {errors[field.id as keyof LoginSchema] && (
              <p className="text-xs text-red-600">
                {errors[field.id as keyof LoginSchema]?.message}
              </p>
            )}
          </div>
        ))}

        <div className="flex justify-between">
          <p onClick={() => setActiveState('ForgotPassword')} className="text-sm text-teal-600 cursor-pointer">
            فراموشی رمز عبور؟
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "در حال ورود..." : "ورود"}
        </button>
      </form>

      <div className="flex flex-col items-center">
        <p className="text-sm mt-4">
          حساب کاربری ندارید؟{' '}
          <span onClick={() => setActiveState('Signup')} className="text-teal-600 cursor-pointer">
            ثبت نام
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;