import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';

import { ActivationDto, ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from './dto/restaurant.dto';
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
export class RestaurantService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService
  ) { }


}