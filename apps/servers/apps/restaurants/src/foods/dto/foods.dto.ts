import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString, MinLength, IsArray, ArrayNotEmpty } from "class-validator";

@InputType()
export class CreateFoodDto {
    @Field()
    @IsNotEmpty({ message: "وارد کردن نام غدا ضروری است" })
    @IsString({ message: "نام کاربری باید رشته باشد" })
    name: string;

    @Field()
    @IsNotEmpty({ message: "وارد کردن جزییات غدا ضروری است" })
    @IsString({ message: "جرییات غدا باید رشته باشد" })
    description: string;

    @Field()
    @IsNotEmpty({ message: "وارد کردن قیمت غدا ضروری است" })
    price: number;

    @Field()
    @IsNotEmpty({ message: "وارد کردن قیمت تخمینی غدا ضروری است" })
    estimatedPrice?: number;

    
    @Field()
    @IsNotEmpty({ message: "وارد کردن دسته غدا ضروری است" })
    @IsString({ message: "دسته غدا باید رشته باشد" })
    category: string;

    @Field(() => [String])
    @IsArray({message:"تصاویر غذاها باید آرایه باشد"})
    @ArrayNotEmpty({message:"آرایه تصاویر نباید خالی باشد"})
    images: string[]

}
