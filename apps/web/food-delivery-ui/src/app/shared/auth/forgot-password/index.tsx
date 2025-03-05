"use client"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { LOGIN_USER } from "@/graphql/actions/login.action";
import Cookies from "js-cookie";
import { FORGOT_PASSWORD } from "@/graphql/actions/forgot-password.action";
import { em } from "@mantine/core";
const formSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست!"),
});

type ForgotPasswordSchema = z.infer<typeof formSchema>;

const ForgotPassword = ({ setActiveState, setOpen }: any) => {

  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    try {
      const response = await forgotPassword({
        variables: {
          email: data.email,
        },
      });
      toast.success('لطفا ایمیل خود را برای تغییر رمز بررسی کنید!');
      reset();
    } catch (error: any) {
      toast.error(error.message)
    }
  };


  return (
    <div className="p-8 space-y-6 bg-white">
      <h1 className="text-2xl font-bold text-center text-gray-800">فراموشی رمز عبور</h1>
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "در حال ثبت..." : "ثبت"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;