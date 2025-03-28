import { Directive, Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Directive('@key(fields: "id")')
export class Avatars {
    @Field()
    id: string

    @Field()
    public_id: string;

    @Field()
    url: string;

    @Field()
    userId: string;
}

@ObjectType()
export class User {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field(() => Number, { nullable: true })
    phone_number?: number | null;

    @Field(() => String, { nullable: true })
    address?: string | null;

    @Field(() => Avatars, { nullable: true })
    avatar?: Avatars | null;

    @Field()
    role: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}