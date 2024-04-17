import { HttpException, Injectable } from "@nestjs/common";
import { ApiService } from "src/api/api.service";
import { PrismaService } from "src/prisma/prisma.service";

interface CreateDepartment {
    name : string;
    image? : string;
}

interface UpdateDepartment {
    name? : string;
    image? : string;
}

export interface QueryDepartment {
    select?:string;
    sort?:string;
    keyword?:string;
    limit?:string;
    page?:string;
    name?: string;
    id?:number|object;
};

@Injectable()
export class DepartmentService {
    constructor(private prisma: PrismaService,private apiService:ApiService<QueryDepartment> ){};
    async createDepartment(body:CreateDepartment){
        const department=await this.prisma.client.department.create({data:body});
        return { department };
    };
    async getDepartment(id:number){
        const department=await this.prisma.client.department
            .findFirst({ where: { id } , include : { members:true , subjects:true  } });
        if( ! department ){
            throw new HttpException("Department is not found",400)
        };
        return { department };
    };
    async getAll(query:QueryDepartment){
        const { obj }=this.apiService.filter(query).select().sort().pagination();
        const departments=await this.prisma.client.department.findMany(obj);
        return { departments };
    }
    async updateDepartment(id:number,body:UpdateDepartment){
        try{
            const department=await this.prisma.client.department.update({ where:{id} , data:body });
            return { department };
        }catch(e){
            throw new HttpException("department not found",400);
        };
    };
    async deleteDepartment(id:number){
        try{
            await this.prisma.client.department.delete({ where:{id} });
            return { status:"deleted" };
        }catch(e){
            throw new HttpException("department not found",400);
        };
    };
    async addMemberToDepartment(userId:number,departmentId:number){
        const user=await this.prisma.client.user.findUnique({ where : { id:userId } });
        if(!user){
            throw new HttpException("user not found",400);
        };
        try{
            const department=await this.prisma.client.department.update(
                { where : { id:departmentId } , 
                data : { members:{connect:{id:userId}} } ,
                select : { members:true } }
            );
            return { department };
        }catch(e){
            throw new HttpException("department not found",400);
        };
    };
};