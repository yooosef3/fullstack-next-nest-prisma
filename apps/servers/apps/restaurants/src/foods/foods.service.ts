import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ActivationDto, CreateFoodDto, ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from './dto/foods.dto';
import { PrismaService } from '../../../../prisma/Prisma.service';
import { EmailService } from '../email/email.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';


@Injectable()
export class FoodsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly clodinaryService: CloudinaryService
  ) {}

  async createFood(createFoodDto: CreateFoodDto, req:any,response:any){
    const {name, description, price, estimatedPrice, category, images} = createFoodDto;
    const restaurantId = req.restaurants.id;

    return {message:"Done"}
  }
}