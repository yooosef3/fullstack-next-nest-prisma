import { Args, Context, Mutation, Resolver, Query } from "@nestjs/graphql";
import { RestaurantService } from "./restaurant.service";
import {
  ActivationResponse,
  LoginResponse,
  LogoutResposne,
  RegisterResponse,
} from "./types/restaurant.type";
import { ActivationDto, RegisterDto } from "./dto/restaurant.dto";
import { Response, Request } from "express";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "./guards/auth.guard";

@Resolver("Restaurant")
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

}