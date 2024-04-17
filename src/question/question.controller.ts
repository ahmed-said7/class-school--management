import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { User as UserInterface, userType } from "src/users/user.services";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { UpdateQuestionDto } from "./dto/update.question.dto";
import { CreateQuestionDto } from "./dto/create.question.dto";
import { ValidateQuestionDto } from "./dto/validate.question.dto";
import { User } from "src/decorator/currentUser.decoratot";


@Controller("question")
export class QuestionController {
    constructor(private question:QuestionService){};
    @Get(":id")
    @UseGuards(AuthenticationGuard)
    getAllQuestions( @Param("id",ParseIntPipe) id:number ){
        return this.question.getQuestions(id);
    };
    @Patch(":id")
    @SetMetadata("roles",[userType.teacher])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    updateQuestion( @Param("id",ParseIntPipe) id:number,@Body() body:UpdateQuestionDto ){
        return this.question.updateQuestion(id,body);
    };
    @Delete(":id")
    @SetMetadata("roles",[userType.teacher])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    deleteQuestion( @Param("id",ParseIntPipe) id:number){
        return this.question.deleteQuestion(id);
    };
    @Post()
    @SetMetadata("roles",[userType.teacher])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    createQuestion( @Body() body:CreateQuestionDto){
        return this.question.createQuestion(body);
    };
    @Post("quiz/:subject")
    @UseGuards(AuthenticationGuard)
    validateAnswers( @Body() body:ValidateQuestionDto,
    @Param("subject" ,ParseIntPipe) subject:number,@User() user:UserInterface
){
        return this.question.validateAnswers(body.answers,subject,user.id);
    };
};