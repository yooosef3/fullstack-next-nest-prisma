import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../../../prisma/Prisma.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService:JwtService,
        private readonly prisma:PrismaService,
        private readonly config:ConfigService
    ){}

    async canActivate(context:ExecutionContext):Promise<boolean>{
        try {
            const gqlContext = GqlExecutionContext.create(context);
            const {req} = gqlContext.getContext();

            
            const accessToken = (
                req.headers.accesstoken || 
                req.headers.accessToken
            ) as string;
            
            const refreshToken = (
                req.headers.refreshtoken || 
                req.headers.refreshToken
            ) as string;

            if(!accessToken || !refreshToken){
                throw new UnauthorizedException('لطفا برای دسترسی یه این بخش وارد شوید');
            }

            try {
                const decoded = this.jwtService.verify(accessToken, {
                    secret: this.config.get<string>('ACCESS_TOKEN_SECRET')
                });

                const user = await this.prisma.user.findUnique({
                    where: { id: decoded.id }
                });

                if (!user) {
                    throw new UnauthorizedException('کاربر یافت نشد');
                }

                req.user = user;
                req.accesstoken = accessToken;
                req.refreshtoken = refreshToken;
                
                return true;

            } catch (error) {
                if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
                    await this.updateAccessToken(req);
                    return true;
                }
                throw error;
            }

        } catch (error) {
            console.error('Auth Guard Error:', error);
            throw error;
        }
    }

    private async updateAccessToken(req:any):Promise<void>{
        try {
            const refreshToken = (
                req.headers.refreshtoken || 
                req.headers.refreshToken
            ) as string;

            const decoded = this.jwtService.verify(refreshToken, {
                secret: this.config.get<string>('REFRESH_TOKEN_SECRET')
            });

            if(!decoded){
                throw new UnauthorizedException('refresh token نامعتبر است');
            }

            const user = await this.prisma.user.findUnique({
                where: { id: decoded.id }
            });

            if (!user) {
                throw new UnauthorizedException('کاربر یافت نشد');
            }

            const newAccessToken = this.jwtService.sign(
                { id: user.id },
                {
                    secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
                    expiresIn: '15m'
                }
            );

            const newRefreshToken = this.jwtService.sign(
                { id: user.id },
                {
                    secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
                    expiresIn: '3d'
                }
            );

            req.user = user;
            req.accesstoken = newAccessToken;
            req.refreshtoken = newRefreshToken;

        } catch (error) {
            console.error('Token Refresh Error:', error);
            throw new UnauthorizedException('لطفا دوباره وارد شوید');
        }
    }
}