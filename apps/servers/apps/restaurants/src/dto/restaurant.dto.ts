import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

@InputType()
export class RegisterDto {
    @Field()
    @IsNotEmpty({ message: "وارد کردن نام ضروری است" })
    @IsString({ message: "نام باید رشته باشد" })
    name: string;

    @Field()
    @IsNotEmpty({ message: "وارد کردن ایمیل ضروری است" })
    @IsEmail({}, { message: "ایمیل معتبر نیست" })
    email: string;

    @Field()
    @IsNotEmpty({ message: "وارد کردن رمز عبور ضروری است" })
    @MinLength(6, { message: "رمز عبور باید حداقل 6 کاراکتر باشد" })
    password: string;

    @Field()
    @IsNotEmpty({ message: "وارد کردن موبایل ضروری است" })
    phone_number: number;
}

@InputType()
export class ActivationDto {
    @Field()
    @IsNotEmpty({ message: "وارد کردن کد فعال سازی ضروری است" })
    activationToken: string;
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

@InputType()
export class ForgotPasswordDto {
    @Field()
    @IsNotEmpty({ message: "وارد کردن ایمیل ضروری است" })
    @IsEmail({}, { message: "ایمیل وارد شده باید معتبر باشد" })
    email: string;
}

@InputType()
export class ResetPasswordDto {
    @Field()
    @IsNotEmpty({ message: 'وارد کردن رمز عبور ضروری است!' })
    @MinLength(8, { message: "نام کاربری باید رشته باشد" })
    password: string;

    @Field()
    @IsNotEmpty({ message: 'توکن ضروری است.' })
    activationToken: string;
}