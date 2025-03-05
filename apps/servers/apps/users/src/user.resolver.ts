import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { ActivationResponse, ForgotPasswordResponse, LoginResponse, LogOutResponse, RegisterResponse, ResetPasswordResponse } from "./types/user.types";
import { ActivationDto, ForgotPasswordDto, RegisterDto, ResetPasswordDto } from "./dto/user.dto";
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
    
      const { activationToken, accessToken, user } = await this.userService.register(
        registerDto,
        context.res,
      );
    
      return { 
        activation_token: activationToken.token,
        access_token: accessToken, // Ensure this is included
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
    
    @Mutation(() => ForgotPasswordResponse)
    async forgotPassword(
      @Args('forgotPasswordDto') forgotPasswordDto: ForgotPasswordDto,
    ): Promise<ForgotPasswordResponse> {
      return await this.userService.forgotPassword(forgotPasswordDto);
    }

    @Mutation(() => ForgotPasswordResponse)
    async resetPassword(
      @Args('resetPasswordDto') resetPasswordDto: ResetPasswordDto,
    ): Promise<ResetPasswordResponse> {
      return await this.userService.resetPassword(resetPasswordDto);
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