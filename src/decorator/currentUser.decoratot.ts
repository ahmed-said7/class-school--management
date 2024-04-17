import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";
import { userType } from "src/users/user.services";


declare global {
    namespace Express {
        interface Request {
            user : {
                id:number;
                name: string;
                email: string;
                password: string;
                image?: string;
                passwordChangedAt?: Date;
                role: string;
                departmentId?:number
                passwordResetCode?: string
                passwordResetCodeExpiresIn?: Date;
            };
        }
    }
};

export const User=createParamDecorator((data:unknown,ctx:ExecutionContext)=>{
    const req=ctx.switchToHttp().getRequest<Request>();
    return req.user;
});