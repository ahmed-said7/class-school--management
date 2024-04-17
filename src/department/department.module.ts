import { Module } from "@nestjs/common";
import { DepartmentsController } from "./department.controller";
import { DepartmentService } from "./department.service";
import { ApiModule } from "src/api/api.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthenticationGuard } from "src/guards/authentication.guard";
import { AuthorizationGuard } from "src/guards/authorization.guard";


@Module({controllers:[DepartmentsController]
    ,providers:[DepartmentService
        ,{provide:"folder",useValue:"department"} ],imports:[ApiModule,PrismaModule]
})
export class DepartmentModule {};