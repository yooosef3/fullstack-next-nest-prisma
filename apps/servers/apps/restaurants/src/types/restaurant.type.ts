import { Field, ObjectType } from "@nestjs/graphql";
import { ErrorType } from "./restaurant.types";

@ObjectType()
export class ActivationResponse {
    @Field()
    success: boolean;

    @Field()
    message: string;
}

@ObjectType()
export class LoginResponse {
    @Field()
    success: boolean;

    @Field()
    message: string;

    @Field()
    token: string;
}

@ObjectType()
export class LogoutResposne {
    @Field()
    success: boolean;

    @Field()
    message: string;
}

@ObjectType()
export class RegisterResponse {
    @Field()
    success: boolean;

    @Field()
    message: string;

    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType;
} 