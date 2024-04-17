import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { User as UserInterface, userType } from "src/users/user.services";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { User } from "src/decorator/currentUser.decoratot";
import { QueryReview, ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create.review.dto";
import { UpdateReviewDto } from "./dto/update.review.dto";


@Controller("review")
export class ReviewController {
    constructor(private reviewSrv:ReviewService){};
    @Get()
    @UseGuards(AuthenticationGuard)
    getReviews( @Query() query:QueryReview  ){
        return this.reviewSrv.getAllReviews(query);
    };
    @Get("user/:userId/instructor/:instructorId")
    @UseGuards(AuthenticationGuard)
    getReview( @Param("userId",ParseIntPipe) userId:number,@Param("instructorId",ParseIntPipe) instructorId:number ){
        return this.reviewSrv.getReview(userId,instructorId);
    };
    @Delete(":id")
    @UseGuards(AuthenticationGuard)
    deleteReview( @Param("id",ParseIntPipe) id:number,@User() user:UserInterface){
        return this.reviewSrv.deleteReview(id,user);
    };
    @Post()
    @UseGuards(AuthenticationGuard)
    createReview( @Body() body:CreateReviewDto,@User() user:UserInterface){
        return this.reviewSrv.createReview(body,user);
    };
    @Patch(":id")
    @UseGuards(AuthenticationGuard)
    validateAnswers( @Body() body:UpdateReviewDto,
    @Param("id" ,ParseIntPipe) id:number,@User() user:UserInterface
    ){
        return this.reviewSrv.updateReview(body,id,user);
    };
};