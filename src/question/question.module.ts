import { Module } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { ApiModule } from "src/api/api.module";
import { PrismaService } from "src/prisma/prisma.service";


@Module(
    { 
    providers : [ QuestionService ],
    controllers : [ QuestionController ],
    imports : [ ApiModule , PrismaService ]
})

export class QuestionModule {};