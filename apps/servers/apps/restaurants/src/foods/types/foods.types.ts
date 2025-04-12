import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../entities/foods.entity";
import { ErrorType } from "../../types/restaurant.types";

@ObjectType()
export class CreateFoodResponse {
  @Field()
  message: string;

  @Field(() => ErrorType, {nullable: true})
  error?: ErrorType
}

@ObjectType()
export class RegisterResponse {
  @Field()
  activation_token: string;

  @Field()
  access_token: string;

  @Field(() => User, { nullable: true })
  user?: User | any;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class ActivationResponse {
  @Field(() => User)
  user: User;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class LoginResponse {
  @Field(() => User, {nullable: true})
  user?: User | any;

  @Field(() => String, {nullable: true})
  accessToken?: string | null;

  @Field(() => String, {nullable: true})
  refreshToken?: string | null;

  @Field(() => ErrorType, {nullable: true})
  error?: ErrorType;
}

@ObjectType()
export class ForgotPasswordResponse {
  @Field(() => User, {nullable: true})
  user?: User | any;

  @Field(() => String, {nullable: true})
  accessToken?: string | null;

  @Field(() => String, {nullable: true})
  refreshToken?: string | null;

  @Field()
  message?: string;

  @Field(() => ErrorType, {nullable: true})
  error?: ErrorType;
}

@ObjectType()
export class ResetPasswordResponse {
  @Field(() => User)
  user: User | unknown;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class LogOutResponse {
  @Field()
  message?: string;
}
