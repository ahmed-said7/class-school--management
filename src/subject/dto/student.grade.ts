import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateStudentGradeDto {
    @IsNotEmpty()
    @IsNumber()
    grade : number;
    @IsNotEmpty()
    @IsNumber()
    studentId : number;
    @IsNotEmpty()
    @IsOptional()
    subjectId : number;
};