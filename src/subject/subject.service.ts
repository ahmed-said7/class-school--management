import { HttpException, Injectable } from "@nestjs/common";
import { ApiService } from "src/api/api.service";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "src/users/user.services";

interface CreateSubject {
    name : string;
    image : string
    grade : number;
    departmentId : number;
    instructorId : number;
};

interface UpdateSubject {
    name? : string;
    image? : string
    grade? : number;
    departmentId? : number;
    instructorId? : number;
};


export interface QuerySubject {
    select?:string;
    sort?:string;
    keyword?:string;
    limit?:string;
    page?:string;
    name?: string;
    id?:number|object;
    grade?: number | object ;
    departmentId?: number | object ;
    instructorId?: number | object ;
};

@Injectable()
export class SubjectService{
    constructor(private prisma:PrismaService,private apiService:ApiService<QuerySubject>){};
    async createSubject(body:CreateSubject){
        const department=this.prisma.user.findFirst({where:{id:body.departmentId}});
        if(!department){
            throw new HttpException('department not found',400);
        };
        const subject=this.prisma.subject.create({
            data:body
        });
        return { subject };
    };
    async getAllSubjects(query:QuerySubject){
        const { obj }=this.apiService.filter(query).select().sort().pagination();
        const subject=await this.prisma.client.subject.findMany(obj);
        return { subject };
    };
    async getSubject(id:number){
        const subject=await this.prisma.client.subject.findFirst(
            {where:{id},include:{department:true,instructor:true}
        });
        if(!subject){
            throw new HttpException("Subject not found",400);
        };
        return { subject };
    };
    async updateSubject(id:number,body:UpdateSubject,user:User){
        const {subject}=await this.getSubject(id);
        if(user.role == "teacher" && subject.instructorId !== user.id ){
            throw new HttpException("you are not allowed to update this subject",400);
        };
        const updated=await this.prisma.client.subject.update({where:{id},
            data:body } );
        return {data:updated};
    };
    async deleteSubject(id:number,user:User){
        const {subject}=await this.getSubject(id);
        if(user.role == "teacher" && subject.instructorId !== user.id ){
            throw new HttpException("you are not allowed to update this subject",400);
        };
        await this.prisma.client.subject.delete({where:{id}});
        return {status:"deleted"};
    };
    async addStudentToSubject(studentId:number,subjectId:number,user:User){
        const subject=await this.prisma.client.subject.findFirst({where:{id:subjectId,instructorId:user.id}});
        if(!subject){
            throw new HttpException("Subject not found",400);
        };
        const student=await this.prisma.client.user.findFirst({where:{id:studentId,role:"student"}});
        if(!student){
            throw new HttpException("Student not found",400);
        };
        const valid=await this.prisma.client.subject_grade
            .findFirst({where:{ subjectId:subjectId , userId:studentId }});
        if(valid){
            throw new HttpException("user has already taken the course",400);
        };
        await this.prisma.client.subject_grade.create({data:{subjectId,userId:studentId }});
        return {status:"you now spent the course"};
    };
    async updateStudentGrade(studentId:number,subjectId:number,user:User,grade:number){
        const subject=await this.prisma.client.subject.findFirst
            ({where:{id:subjectId,instructorId:user.id}});
        if(!subject){
            throw new HttpException("Subject not found",400);
        };
        let passed=false;
        if( grade >= subject.grade/2 ){
            passed=true;
        };
        try{
            const valid=await this.prisma.subject_grade
            .updateMany
            ({ where : { subjectId:subjectId , userId:studentId } , data:{ grade , passed } });
            return {updated:valid};
        }catch(e){
            throw new HttpException("student does not have subject",400);
        };
    };
};