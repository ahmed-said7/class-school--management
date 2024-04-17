import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty()
    @IsNumber()
    instructorId:number;
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    rating:number;
};

interface UpdateReview {
    rating?:number;
};