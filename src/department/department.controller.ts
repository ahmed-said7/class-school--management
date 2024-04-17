import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { User } from "src/decorator/currentUser.decoratot";
import { User as UserInterface, userType } from "src/users/user.services";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { AuthorizationGuard } from "src/guards/authorization.guard";
import { UploadFileInterceptor } from "src/interceptors/upload.file.interceptor";
import { DepartmentService, QueryDepartment } from "./department.service";
import { CreateDepartmentDto } from "./dto/update.department.dto";
import { UpdateDepartmentDto } from "./dto/create.department.dto";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller("department")

export class DepartmentsController {
    constructor(private department: DepartmentService){};
    @Post()
    @SetMetadata("roles",[userType.manager])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @UseInterceptors(FileInterceptor("image"),UploadFileInterceptor)
    createDepartment(@Body() body : CreateDepartmentDto  ){
        return this.department.createDepartment(body);
    };
    @Get(":id")
    @UseGuards(AuthenticationGuard)
    getDepartment(@Param("id",ParseIntPipe) id:number ){
        return this.department.getDepartment(id);
    };
    @Get()
    @UseGuards(AuthenticationGuard)
    getAllDepartments(@Query() query:QueryDepartment){
        return this.department.getAll(query);
    };
    @Delete()
    @SetMetadata("roles",[userType.manager])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    deleteDepartment(@Param("id",ParseIntPipe) id:number  ){
        return this.department.deleteDepartment(id);
    };
    @Patch()
    @SetMetadata("roles",[userType.manager])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    @UseInterceptors(FileInterceptor("image"),UploadFileInterceptor)
    updateDepartment(@Param("id") id:number , @Body() body:UpdateDepartmentDto ){
        return this.department.updateDepartment(id, body);
    };
    @Put("userId/:user/departmentId/:department")
    @SetMetadata("roles",[userType.manager])
    @UseGuards(AuthenticationGuard,AuthorizationGuard)
    addMemberToDepartment(
        @Param("user",ParseIntPipe) user:number,
        @Param("department",ParseIntPipe) departmentId:number 
    ){
        return this.department.addMemberToDepartment(user,departmentId);
    };
};