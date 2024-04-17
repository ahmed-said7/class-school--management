import { Module } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { ApiModule } from "src/api/api.module";
import { SubjectController } from "./subject.controller";
import { PrismaModule } from "src/prisma/prisma.module";



@Module({
    providers:[SubjectService,{provide:"folder",useValue:"subject"}]
    ,imports:[ApiModule,PrismaModule],controllers:[SubjectController]
})
export class SubjectModule {};