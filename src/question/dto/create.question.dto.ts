import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsNumber()
    subjectId : number;
    @IsNotEmpty()
    @IsString()
    correctAnswer: string;
    @IsNotEmpty()
    @IsArray({ each:true })
    answers: string[];
};