import { CallHandler, CanActivate, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";


@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector:Reflector){};
    async canActivate(context: ExecutionContext):Promise<boolean>{
        const req=context.switchToHttp().getRequest<Request>();
        const roles=this.reflector.get<string[]>( "roles" , context.getHandler() );
        return roles.includes(req.user.role);
    }
};