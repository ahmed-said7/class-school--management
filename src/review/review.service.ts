import { HttpException, Injectable } from "@nestjs/common";
import { ApiService } from "src/api/api.service";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "src/users/user.services";

interface CreateReview {
    userId?:number;
    instructorId:number;
    rating:number;
};

interface UpdateReview {
    rating?:number;
};

export interface QueryReview {
    id? : number | object ;
    rating? : number | object ;
    userId? : number | object ;
    instructorId? : number | object ;
    select? : string;
    sort? : string;
    page? : string;
    limit? : string;
};

@Injectable()
export class ReviewService {
    constructor( private prisma:PrismaService,private api:ApiService<QueryReview> ){};
    async createReview(body:CreateReview,user:User){
        if(!body.userId) body.userId=user.id;
        const instructor=await this.prisma.user.findFirst({where:{id:body.instructorId, role:"teacher" }});
        if(!instructor){
            throw new HttpException("instructor not found",400);
        };
        const review=await this.prisma.review.create({ data : { ... body , userId:body.userId } });
        await this.reviewAggregations(user.id,body.instructorId);
        return { review };
    };
    async updateReview(body:UpdateReview,instructorId:number,user:User){
        await this.validateReview(instructorId,user.id);
        const review=await this.
            prisma.review.updateMany({ where : { instructorId , userId:user.id } , data : body });
        await this.reviewAggregations(user.id,instructorId);
        return { review };
    };
    private async validateReview(instructorId:number,userId:number){
        const review=await this.prisma.review.findFirst({where : { instructorId,userId }});
        if( ! review ){
            throw new HttpException("Review not found",400);
        }
    };
    async deleteReview(instructorId:number,user:User){
        await this.validateReview(instructorId,user.id);
        await this.prisma.review.deleteMany({ where : { instructorId , userId:user.id }});
        await this.reviewAggregations(user.id,instructorId);
        return {status:"deleted"};
    };
    async getAllReviews(query:QueryReview){
        const { obj }=this.api.filter(query).select().sort().pagination();
        const reviews=await this.prisma.client.review.findMany(obj);
        return { reviews };
    };
    async getReview(userId:number,instructorId:number){
        const review=await this.prisma.client.review.findFirst(
            {where:{userId,instructorId},include:{user:true}
        });
        if( ! review ){
            throw new HttpException("Review not found",400);
        };
        return { review };
    };
    async reviewAggregations(userId:number,instructorId:number){
        const review=await this.prisma.review.groupBy({
            where:{instructorId},
            by:"instructorId",
            // ratingAvg : {}
            _avg : {
                rating:true
            },
            _count : {
                rating:true
            }
        });
        if( review.length > 0 ){
            const ratingAvg=review[0]._avg.rating;
            const ratingQuantity=review[0]._count.rating;
            await this.prisma.user.update({where:{id:instructorId},data:{ratingQuantity,ratingAvg}});
        };
    };
};