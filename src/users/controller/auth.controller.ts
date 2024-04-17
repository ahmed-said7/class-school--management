import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService, userType } from "../user.services";
import { CreateUserDto } from "../dto/create.user.dto";
import { UploadFileInterceptor } from "src/interceptors/upload.file.interceptor";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { UpdateUserDto } from "../dto/update.user.dto";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { AuthorizationGuard } from "src/guards/authorization.guard";

@Controller("auth")
export class AuthController {
    constructor(private UserService:UserService){};
    @Post("signup")
    @UseInterceptors(FileInterceptor('image'),UploadFileInterceptor)
    signup( @Body() body : CreateUserDto ,@Res() res:Response ){
        return this.UserService.signup(body,res);
    };
    @Post("login")
    login( @Body() body : CreateUserDto ,@Res() res:Response ){
        return this.UserService.login(body,res);
    };
    @Patch(":id")
    @SetMetadata("roles",[userType.manager])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @UseInterceptors(FileInterceptor('image'),UploadFileInterceptor)
    updateUser(@Param("id",ParseIntPipe) id:number, @Body() body:UpdateUserDto){
        return this.UserService.updateUser(body,id);
    };
    @Delete(":id")
    @SetMetadata("roles",[userType.manager])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    deleteUser(@Param("id",ParseIntPipe) id:number){
        return this.UserService.deleteUser(id);
    };
    @Get(":id")
    @SetMetadata("roles",[userType.manager])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    getUser(@Param("id",ParseIntPipe) id:number){
        return this.UserService.getUser(id);
    };
};