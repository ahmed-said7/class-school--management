import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { QuerySubject, SubjectService } from "./subject.service";
import { CreateSubjectDto } from "./dto/create.subject.dto";
import { User } from "src/decorator/currentUser.decoratot";
import { User as UserInterface, userType } from "src/users/user.services";
import { UpdateSubjectDto } from "./dto/update.subject.dto";
import { UpdateStudentGradeDto } from "./dto/student.grade";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { UploadFileInterceptor } from "src/interceptors/upload.file.interceptor";
import { FileInterceptor } from "@nestjs/platform-express";




@Controller("subject")
export class SubjectController {
    constructor(private subject: SubjectService){};
    @Post()
    @SetMetadata("roles",[userType.teacher])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @UseInterceptors(FileInterceptor("image"),UploadFileInterceptor)
    createSubject(@Body() body:CreateSubjectDto , @User() user:UserInterface ){
        return this.subject.createSubject({ ... body , instructorId:user.id });
    };
    @Get(":id")
    @UseGuards(AuthenticationGuard)
    getSubject(@Param("id",ParseIntPipe) id:number ){
        return this.subject.getSubject(id);
    };
    @Get()
    @UseGuards(AuthenticationGuard)
    getAllSubjects(@Query() query:QuerySubject){
        return this.subject.getAllSubjects(query);
    };
    @Delete()
    @SetMetadata("roles",[userType.teacher])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    deleteSubject(@Param("id",ParseIntPipe) id:number , @User() user:UserInterface ){
        return this.subject.deleteSubject(id,user);
    };
    @Patch()
    @SetMetadata("roles",[userType.teacher])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @UseInterceptors(FileInterceptor("image"),UploadFileInterceptor)
    updateSubject(@Param("id",ParseIntPipe) id:number , @User() user:UserInterface , @Body() body:UpdateSubjectDto ){
        return this.subject.updateSubject(id,body,user);
    };
    @Put("studentId/:student/subjectId/:subject")
    @SetMetadata("roles",[userType.teacher])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    addStudentToSubject(
        @User() user:UserInterface , 
        @Param("student",ParseIntPipe) student:number,
        @Param("subject",ParseIntPipe) subject:number 
    ){
        return this.subject.addStudentToSubject(student,subject,user);
    };
    @Put()
    @SetMetadata("roles",[userType.teacher])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    addStudentGrade(
        @User() user:UserInterface , 
        @Body() body:UpdateStudentGradeDto
    ){
        return this.subject.updateStudentGrade(body.studentId,body.studentId,user,body.grade);
    };
};