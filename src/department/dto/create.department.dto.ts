import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateDepartmentDto {
    @IsOptional()
    @IsString()
    name:string;
    @IsOptional()
    @IsString()
    image:string;
};