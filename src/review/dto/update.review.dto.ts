import { IsNumber, IsOptional, Max, Min } from "class-validator";

export class UpdateReviewDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(5)
    rating:number;
};