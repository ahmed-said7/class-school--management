import { Body, Controller, Param, Patch, Post, UseGuards } from "@nestjs/common";
import {  UserService, User as UserInterface } from "../user.services";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { User } from "src/decorator/currentUser.decoratot";
import { ChangeLoggedUserPasswordDto,  ChangePasswordDto } from "../dto/change.password.dto";

@Controller("password")
export class PassController {
    constructor(private UserService:UserService){};
    @Post()
    @UseGuards(AuthenticationGuard)
    login( @Body() body : ChangeLoggedUserPasswordDto ,@User() user:UserInterface ){
        return this.UserService.changeLoggedUserPassword(body,user);
    };
    @Patch()
    sendResetCode(@Body("email") email:string){
        return this.UserService.forgetPassword(email);
    };
    @Patch(":code")
    deleteMe( @Param("code") code:string , @Body() body : ChangePasswordDto  ){
        return this.UserService.validateResetCode(code,body);
    };
};