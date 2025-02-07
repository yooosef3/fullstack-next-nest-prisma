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
        const gqlContext = GqlExecutionContext.create(context);
        const {req} = gqlContext.getContext();

        const accessToken = req.headers.accessToken as string;
        const refreshToken = req.headers.refreshToken as string;

        if(!accessToken || !refreshToken){
            throw new UnauthorizedException('لطفا برای دسترسی یه این بخش وارد شوید');
        }

        if(accessToken){
            const decoded = this.jwtService.verify(accessToken,{
                secret: this.config.get<string>('ACCESS_TOKEN_SECRET')
            });

            if(!decoded){
                throw new UnauthorizedException('access token نامعتبر است');
            }

            await this.updateAccessToken(req)
        }

        return true
    }

    private async updateAccessToken(req:any):Promise<void>
    {
        try {
            const refreshTokenData = req.headers.refreshToken as string;
            const decoded = this.jwtService.verify(refreshTokenData,{
                secret: this.config.get<string>('REFRESH_TOKEN_SECRET')
            });

            if(!decoded){
                throw new UnauthorizedException('refresh token نامعتبر است');
            }

            const user = await this.prisma.user.findUnique({
                where:{
                    id: decoded.id
                },
            });

            // if (!user) {
            //     throw new UnauthorizedException('User not found');
            // }

            const accessToken = this.jwtService.sign(
                {id: user?.id},
                {
                    secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
                    expiresIn: '15m'
                }
            )

            const refreshToken = this.jwtService.sign(
                {id: user?.id},
                {
                    secret: this.config.get<string>('REFRESH_TOKEN_SECRET'),
                    expiresIn: '3d'
                }
            )

            req.accessToken = accessToken;
            req.refreshToken = refreshToken;
            req.user = user

        } catch (error) {
            console.log(error)
        }
    }
}