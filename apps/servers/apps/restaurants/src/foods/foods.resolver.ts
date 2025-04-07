import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FoodsService, UsersService } from "./foods.service";
import { ActivationResponse, CreateFoodResponse, ForgotPasswordResponse, LoginResponse, LogOutResponse, RegisterResponse, ResetPasswordResponse } from "./types/foods.types";
import { ActivationDto, CreateFoodDto, ForgotPasswordDto, RegisterDto, ResetPasswordDto } from "./dto/foods.dto";
import { BadRequestException, UseGuards } from "@nestjs/common";
import { User } from "./entities/foods.entity";
import { Response } from "express";
import { AuthGuard } from "../guards/auth.guard";

@Resolver("Foods")
export class FoodsResolver {
    constructor(private readonly foodsService: FoodsService) {}

    @Mutation(() => CreateFoodResponse )
    @UseGuards(AuthGuard)
    async createFood(
      @Context() context: {req: Request; res:Response},
      @Args("createFoodDto") createFoodDto: CreateFoodDto
    ){
      return await this.foodsService.createFood(
        createFoodDto,
        context.req,
        context.res
      )
    }
}