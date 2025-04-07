import { Directive, Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Food {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    price: number;

    @Field()
    estimatedPrice?: number;

    @Field()
    category: string;

    @Field()
    images: string[];

    @Field()
    restaurantId: string;
}