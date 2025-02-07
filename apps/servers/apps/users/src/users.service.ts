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

    // Create the user in the database
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

    return {activationToken, response, user: createdUser};
  }

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

  async activateUser(activationDto: ActivationDto, response: Response){
    const {activationToken, activationCode} = activationDto
    const newUser : {user: UserData, activationCode: string} = this.jwtService.verify(activationToken,{
      secret:this.configService.get<string>('ACTIVATION_SECRET')
    } as JwtVerifyOptions) as {user: UserData, activationCode: string}

    if(newUser.activationCode !== activationCode){
      throw new BadRequestException('کد فعالسازی نامعتبر است')
    }

    const {name, email,password,phone_number} = newUser.user

    const existUser = await this.prisma.user.findUnique({
      where:{
        email
      }
    })

    if(existUser){
      throw new BadRequestException('کاربر با این ایمیل قبلا ثبت نام کرده است')
    }

    const user = await this.prisma.user.create({
      data:{
        name,
        email,
        password,
        phone_number
      }
    })

    return {user, response}
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

  async getLogedInUser(req:any){
    const user = req.user;
    const accessToken = req.accessToken;
    const refreshToken = req.refreshToken;

    return {user, accessToken, refreshToken}
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