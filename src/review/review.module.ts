import { Module } from "@nestjs/common";
import { ApiModule } from "src/api/api.module";
import { PrismaService } from "src/prisma/prisma.service";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";


@Module(
    { 
    providers : [ ReviewService ],
    controllers : [ReviewController  ],
    imports : [ ApiModule , PrismaService ]
})

export class ReviewModule {};