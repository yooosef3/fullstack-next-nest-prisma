import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';

import { ActivationDto, LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/Prisma.service';
import { EmailService } from './email/email.service';
import { TokenSender } from './utils/sendToken';

interface UserData {
  name: string;
  email: string;
  password: string;
  phone_number?: number | null;
  address?: string | null;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService
  ) {}

  async register(registerDto: RegisterDto, response: Response) {
    const { name, email, password, phone_number } = registerDto;

    const isEmailExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExists) {
      throw new BadRequestException('ایمیل انتخاب شده از قبل موجود است');
    }

    const isPhoneNumberExists = await this.prisma.user.findUnique({
      where: {
        phone_number,
      },
    });

    if (isPhoneNumberExists) {
      throw new BadRequestException('شماره موبایل انتخاب شده از قبل موجود است');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

  
    const createdUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone_number,
        role: 'User',
      },
    });

    const activationToken = await this.createActivationToken(createdUser);
    const activationCode = activationToken.activationCode;

    await this.emailService.sendMail({
      email,
      subject:'حساب خود را فعال کنید',
      template:'./activation-mail',
      name,
      activationCode,
    });

    const accessToken = this.jwtService.sign({ id: createdUser.id }); // Adjust payload as needed
    console.log(activationToken.token);
    return {
      activationToken: { token: activationToken.token, activationCode: activationCode }, // Replace with actual token generation logic
      accessToken, // Return the access token
      user: createdUser,
    };  }

  async createActivationToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
        expiresIn: '5m',
      },
    );

    return { token, activationCode };
  }

  async activateUser(activationDto: ActivationDto, response: Response) {
    const { activationToken, activationCode } = activationDto;
    
    // Verify token and activation code
    const decoded = this.jwtService.verify(activationToken, {
      secret: this.configService.get<string>('ACTIVATION_SECRET')
    }) as { user: UserData, activationCode: string };

    if (decoded.activationCode !== activationCode) {
      throw new BadRequestException('کد فعالسازی نامعتبر است');
    }

    const { email } = decoded.user;

    // Find the existing user
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new BadRequestException('کاربر یافت نشد');
    }

    // Update user's activation status
    const updatedUser = await this.prisma.user.update({
      where: { email },
      data: { isActivated: true }
    });

    // Generate tokens
    const tokenSender = new TokenSender(this.configService, this.jwtService);
    const tokens = tokenSender.sendToken(updatedUser);

    return {
      ...tokens,
      user: updatedUser
    };
}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({
      where:{
        email
      }
    });

    if(user && (await this.comparePassword(password, user.password))){
      const tokenSender = new TokenSender(this.configService, this.jwtService);
      return tokenSender.sendToken(user)
    }else{
      return {
        user:null,
        accessToken:null,
        refreshToken:null,
        error:{
          message:'نام کاربری یا رمز عبور اشتباه است'
        }
      }
    }

  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ):Promise<boolean>{
    return await bcrypt.compare(password, hashedPassword)
  }

  async getLoggedInUser(req:any){
    try {
      if (!req.user) {
        return {
          user: null,
          accessToken: null,
          refreshToken: null,
          error: {
            message: 'کاربر یافت نشد'
          }
        };
      }

      const user = req.user;
      const accessToken = req.accesstoken || req.accessToken;
      const refreshToken = req.refreshtoken || req.refreshToken;

      if (!accessToken || !refreshToken) {
        const tokenSender = new TokenSender(this.configService, this.jwtService);
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = tokenSender.sendToken(user);
        return {
          user,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken
        };
      }

      return {
        user,
        accessToken,
        refreshToken
      };
    } catch (error) {
      console.error('GetLoggedInUser Error:', error);
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        error: {
          message: 'خطا در دریافت اطلاعات کاربر'
        }
      };
    }
  }

  async Logout(req:any){
    req.user = null;
    req.accessToken = null;
    req.refreshToken = null;
    return {message:'با موفقیت خروج شدید'}
  }

  async getUsers() {
    return this.prisma.user.findMany({});
  }
}