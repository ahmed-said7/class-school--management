import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSubjectDto {
    @IsOptional()
    @IsString()
    name : string;
    @IsOptional()
    @IsString()
    image : string
    @IsOptional()
    @IsNumber()
    grade : number;
    @IsOptional()
    @IsNumber()
    departmentId : number;
    @IsOptional()
    @IsOptional()
    instructorId : number;
};