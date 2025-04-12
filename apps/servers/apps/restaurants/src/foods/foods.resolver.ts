import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FoodsService } from "./foods.service";
import { CreateFoodResponse } from "./types/foods.types";
import { CreateFoodDto } from "./dto/foods.dto";
import { BadRequestException, UseGuards } from "@nestjs/common";
import { Food } from "./entities/foods.entity";
import { Response } from "express";
import { AuthGuard } from "../guards/auth.guard";

@Resolver()
export class FoodsResolver {
    constructor(private readonly foodsService: FoodsService) {}

    @Mutation(() => CreateFoodResponse)
    // @UseGuards(AuthGuard)
    async createFood(
        @Args("createFoodDto", { type: () => CreateFoodDto }) createFoodDto: CreateFoodDto,
        @Context() context: { req: Request }
    ) {
        if (!createFoodDto) {
            throw new BadRequestException("Please provide the food information.");
        }
        return await this.foodsService.createFood(createFoodDto, context.req);
    }

   
}