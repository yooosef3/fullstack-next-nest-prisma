import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "رمز عبور حداقل 8 کاراکتر می‌باشد!"),
});

type LoginSchema = z.infer<typeof formSchema>;

const LoginForm = () => {

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
    console.log(loginData)
  };

  return (
    <div>
      <h1>ورود</h1>
     
    </div>
  );
};

export default LoginForm;