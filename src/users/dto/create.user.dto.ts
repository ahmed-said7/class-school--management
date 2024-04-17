import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { userType } from "../user.services";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsOptional()
    @IsString()
    image:string;
    @IsOptional()
    @IsEnum(userType)
    role:userType;
};
