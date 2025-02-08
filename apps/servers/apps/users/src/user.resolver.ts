import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { ActivationResponse, LoginResponse, LogOutResponse, RegisterResponse } from "./types/user.types";
import { ActivationDto, RegisterDto } from "./dto/user.dto";
import { BadRequestException, UseGuards } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { Response } from "express";
import { AuthGuard } from "./guards/auth.guard";

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UsersService) {}

    @Mutation(()=> RegisterResponse)
    async register(
      @Args('registerDto') registerDto: RegisterDto,
      @Context() context: { res: Response },
    ): Promise<RegisterResponse> {
      if (!registerDto.name || !registerDto.email || !registerDto.password) {
        throw new BadRequestException('لطفا ورودی ها را کامل کنید');
      }
  
      const { activationToken, user } = await this.userService.register(
        registerDto,
        context.res,
      );
  
      return { 
        activation_token: activationToken.token,
        user 
      };
    }

    @Mutation(()=> ActivationResponse)
    async activateUser(
        @Args('activationInput') activationDto: ActivationDto,
        @Context() context:{res:Response},
    ):Promise<ActivationResponse>{
        return await this.userService.activateUser(activationDto, context.res);
    }

    @Mutation(() => LoginResponse)
    async Login(
      @Args('email') email: string,
      @Args('password') password: string,
    ): Promise<LoginResponse> {
      return await this.userService.login({ email, password });
    }

    @Query(()=> LoginResponse)
    @UseGuards(AuthGuard)
    async getLoggedInUser(@Context() context: {req: Request}){
      return await this.userService.getLoggedInUser(context.req);
    }

    @Query(()=> LogOutResponse)
    @UseGuards(AuthGuard)
    async LogOutUser(@Context() context: {req: Request}){
      return await this.userService.Logout(context.req);
    }

    @Query(()=>[User])
    async getUsers(){
        return this.userService.getUsers();
    }
}