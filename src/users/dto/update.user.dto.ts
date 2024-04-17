import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { userType } from "../user.services";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsEmail()
    email: string;
    @IsOptional()
    @IsString()
    image:string;
    @IsOptional()
    @IsEnum(userType)
    role:userType;
};