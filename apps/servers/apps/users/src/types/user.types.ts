import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";

@ObjectType()
export class ErrorType {
  @Field(() => String)
  message: string;

  @Field({nullable: true})
  code?: string
}

@ObjectType()
export class RegisterResponse {
  @Field()
  activation_token: string;

  @Field(() => User, { nullable: true })
  user?: User | any;

  @Field(() => ErrorType, { nullable: true })
  error?: ErrorType;
}

@ObjectType()
export class ActivationResponse {
  @Field(() => User)
  user: User | unknown;

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