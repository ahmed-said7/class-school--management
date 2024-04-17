import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

interface CreateQuestions {
    subjectId : number;
    correctAnswer: string;
    answers: string[];
}; 

interface UpdateQuestions {
    subjectId? : number;
    correctAnswer?: string;
    answers?: string[];
};

@Injectable()
export class QuestionService {
    constructor(private prisma:PrismaService){};
    async createQuestion(body:CreateQuestions){
        await this.validateSubjectId(body.subjectId);
        this.validateCorrectAnswer(body.answers,body.correctAnswer);
        const question=await this.prisma.question.create({data:body});
        return { question };
    };

    private async validateSubjectId( subjectId : number ){
        const subject=await this.prisma.subject.findUnique({where:{id:subjectId}});
        if(!subject){
            throw new HttpException("subject not found",400);
        };
    };
    
    private validateCorrectAnswer(answers:string[],correctAnswer:string){
        if( ! answers.includes(correctAnswer) ){
            throw new HttpException("correct answer should be valid",400);
        };
    };
    
    async updateQuestion(id:number,body:UpdateQuestions){
        if(body.subjectId){
            await this.validateSubjectId(body.subjectId);
        };
        const question = await this.prisma.question.findUnique({where:{id}});
        if(!question){
            throw new HttpException("question not found",400);
        };
        if(body.correctAnswer && body.answers ){
            this.validateCorrectAnswer(body.answers,body.correctAnswer);
        };
        if( body.correctAnswer && !body.answers ){
            this.validateCorrectAnswer(question.answers,body.correctAnswer);
        };
        if( !body.correctAnswer && body.answers ){
            this.validateCorrectAnswer(body.answers,question.correctAnswer);
        };
        const updated=await this.prisma.question.update({where:{id},data:body});
        return {updated};
    };
    
    async deleteQuestion(id:number){
        try{
            const question=await this.prisma.question.delete({where:{id}});
            return {question};
        }catch(e){
            throw new HttpException("question not found",400);
        };
    };
    async getQuestions(subjectId:number){
        const questions=await this.prisma.question.findMany({where:{subjectId}});
        return {questions};
    };
    async validateAnswers(body:{ questionId:number; answer:string }[],subjectId:number,userId:number){
        const ids=body.map( (field:{questionId:number; answer:string}) => field.questionId );
        const questions=await this.prisma.question.findMany({where:{id:{in:ids}}});
        if(questions.length !== ids.length ){
            throw new HttpException("Invalid question ids",400);
        };
        const obj = { score:0 , questions:body.length  };
        body.forEach( async ( field:{questionId:number; answer:string} )=>{
            const question=await this.prisma.question.findUnique({where:{id:field.questionId}});
            if(question.correctAnswer == field.answer ){
                obj.score += 1;
            };
        });
        const subject =await this.prisma.subject.findUnique({where:{id:subjectId}});
        if(!subject){
            throw new HttpException("Subject not found",400);
        };
        const quiz=await this.prisma.quiz.
        create
        ({data:
            {studentId:userId,subjectId:subjectId,count:obj.questions,grade:obj.score}
            ,include:{subject:true}});
        return { quiz };
    };
};