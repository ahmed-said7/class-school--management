import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
interface Decoded extends jwt.JwtPayload {
    userId:number;
};

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private prisma:PrismaService,private config:ConfigService){};
    async canActivate(context: ExecutionContext):Promise<boolean>{
        const req=context.switchToHttp().getRequest<Request>();
        let token:string;
        if( req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
            token=req.headers.authorization.split(" ")[1];
        };
        if(! token ){
            throw new HttpException("token is required",400);
        };
        let decoded:Decoded;
        try{
            decoded=jwt.verify( token , this.config.get<string>("secure_jwt") ) as Decoded;
            
        }catch(e){
            throw new HttpException("invalid token",400);
        };
        const user=await this.prisma.user.findUnique({ where:{id:decoded.userId }});
        if(!user){
            throw new HttpException("User not found",400);
        };
        if(user.passwordChangedAt){
            const stamp=Math.floor( user.passwordChangedAt.getTime() / 1000 );
            if( decoded.iat < stamp ){
                throw new HttpException("User password changed",400);
            };
        };
        req.user=user;
        return true;
    }
};