import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import {  UserService, userType,User as UserInterface } from "../user.services";
import { CreateUserDto } from "../dto/create.user.dto";
import { UploadFileInterceptor } from "src/interceptors/upload.file.interceptor";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { UpdateUserDto } from "../dto/update.user.dto";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { User } from "src/decorator/currentUser.decoratot";


@Controller("user")
export class UserController {
    constructor(private UserService:UserService){};
    @Patch()
    @UseGuards(AuthenticationGuard)
    @UseInterceptors(FileInterceptor('image'),UploadFileInterceptor)
    updateMe(@User() user:UserInterface , @Body() body:UpdateUserDto){
        return this.UserService.updateUser(body,user.id);
    };
    @Delete()
    @UseGuards(AuthenticationGuard)
    deleteMe( @User() user:UserInterface ){
        return this.UserService.deleteUser(user.id);
    };
    @Get()
    @UseGuards(AuthenticationGuard)
    getUser(@User() user:UserInterface){
        return user;
    };
};