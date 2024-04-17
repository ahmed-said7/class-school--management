import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { DepartmentModule } from './department/department.module';
import { SubjectModule } from './subject/subject.module';
import { ReviewModule } from './review/review.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [DepartmentModule,ReviewModule,QuestionModule,
    ,SubjectModule,UserModule
    ,ConfigModule.forRoot({isGlobal:true,envFilePath:".env"}),UserModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
