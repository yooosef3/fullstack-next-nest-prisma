import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ActivationDto, CreateFoodDto, ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from './dto/foods.dto';
import { PrismaService } from '../../../../prisma/Prisma.service';
import { EmailService } from '../email/email.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

type Images = {
  public_id: string;
  url: string;
};

type Food = {
  name: string;
  description: string;
  price: number;
  estimatedPrice: number;
  category: string;
  images: Images[] | any;
};

@Injectable()
export class FoodsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly clodinaryService: CloudinaryService
  ) {}

  async createFood(createFoodDto: CreateFoodDto, req:any,response:any){
    try {
      const { name, description, price, estimatedPrice, category, images } =
        createFoodDto as Food;
      const restaurantId = req.restaurant?.id;

      let foodImages: Images | any = [];

      for (const image of images) {
        if (typeof image === "string") {
          const data = await this.clodinaryService.upload(image);
          foodImages.push({
            public_id: data.public_id,
            url: data.secure_url,
          });
        }
      }

      const foodData = {
        name,
        description,
        price,
        estimatedPrice,
        category,
        images: {
          create: foodImages.map(
            (image: { public_id: string; url: string }) => ({
              public_id: image.public_id,
              url: image.url,
            })
          ),
        },
        restaurantId,
      };

      await this.prisma.foods.create({
        data: foodData,
      });

      return { message: "Food Created Successfully!" };
    } catch (error) {
      return { message: error };
    }
  }
}