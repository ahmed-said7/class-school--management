import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
export class AnswerDto {
    @IsNotEmpty()
    @IsNumber()
    questionId:number;
    @IsNotEmpty()
    @IsString()
    answer:string;
};

export class ValidateQuestionDto {
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({each:true})
    @Type( ( ) => AnswerDto )
    answers: { questionId:number; answer:string; }[];
};