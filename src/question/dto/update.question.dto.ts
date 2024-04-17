import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateQuestionDto {
    @IsOptional()
    @IsNumber()
    subjectId : number;
    @IsOptional()
    @IsString()
    correctAnswer: string;
    @IsOptional()
    @IsArray({ each:true })
    // @Type( () => String )
    answers: string[];
};