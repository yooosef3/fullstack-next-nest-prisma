import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

@InputType()
export class RegisterDto {
    @Field()
    @IsNotEmpty({ message: "وارد کردن نام کاربری ضروری است" })
    @IsString({ message: "نام کاربری باید رشته باشد" })
    name: string;

    @Field()
    @IsNotEmpty({ message: "وارد کردن رمز عبور ضروری است" })
    @MinLength(8, { message: "رمز عبور باید حداقل 8 کاراکتر باشد" })
    password: string;

    @Field()
    @IsNotEmpty({ message: "وارد کردن ایمیل ضروری است" })
    @IsEmail({}, { message: "ایمیل وارد شده نامعتبر است" })
    email: string;

    @Field()
    @IsNotEmpty({ message: "وارد کردن موبایل ضروری است" })
    phone_number: number;
}

@InputType()
export class ActivationDto {
  @Field()
  @IsNotEmpty({ message: 'توکن فعالسازی ضروری است' })
  activationToken: string;

  @Field()
  @IsNotEmpty({ message: 'کد فعالسازی ضروری است' })
  activationCode: string;
}

@InputType()
export class LoginDto {
    @Field()
    @IsNotEmpty({ message: "وارد کردن ایمیل ضروری است" })
    @IsEmail({}, { message: "ایمیل وارد شده باید معتبر باشد" })
    email: string;

    @Field()
    @IsNotEmpty({ message: "وارد کردن رمز عبور ضروری است" })
    password: string;
}