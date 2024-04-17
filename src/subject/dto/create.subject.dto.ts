import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSubjectDto {
    @IsNotEmpty()
    @IsString()
    name : string;
    @IsNotEmpty()
    @IsString()
    image : string
    @IsNotEmpty()
    @IsNumber()
    grade : number;
    @IsNotEmpty()
    @IsNumber()
    departmentId : number;
    @IsNotEmpty()
    @IsOptional()
    instructorId : number;
};