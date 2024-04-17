import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrybtjs from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import {randomBytes,createHash} from "crypto";
import { NodemailerService } from "src/nodemailer/nodemailer.service";

export enum userType {
    teacher="teacher",
    student="student",
    manager="manager"
};

interface CreateUser {
    name: string;
    email: string;
    password: string;
    image?: string;
    role?: userType;
};

export interface User {
    id:number;
    name: string;
    email: string;
    password: string;
    image?: string;
    role: userType;
};

interface UpdateUser {
    name? : string;
    email? : string;
    role? : userType;
    image? : string;
};

interface LoginUser {
    email:string;
    password:string;
};

interface ChangeUserPassword {
    currentPassword:string;
    password:string;
    passwordConfirm:string;
};

interface changePassword {
    password:string;
    passwordConfirm:string;
};

@Injectable()
export class UserService {
    constructor(private prisma:PrismaService,private config:ConfigService,private nodemailer:NodemailerService){};
    async signup(body:CreateUser,res:Response){
        const valid=await this.validateEmail(body.email);
        if(valid){
            throw new HttpException("email already exists",400);
        };
        body.password=await this.hashPassword(body.password);;
        const user= await this.prisma.client.user.create({data:body});
        const token=this.createToken(user.id,res);
        return {user,token};
    };
    async createUser(body:CreateUser){
        const valid=await this.validateEmail(body.email);
        if(valid){
            throw new HttpException("email already exists",400);
        };
        body.password=await this.hashPassword(body.password);;
        const user= await this.prisma.client.user.create({data:body});
        return { user };
    };
    async login(body:LoginUser,res:Response){
        const user=await this.validateEmail(body.email);
        if(! user ){
            throw new HttpException("user not found",400);
        };
        await this.comparePassword( body.password , user.password , "password or email is not correct" );
        const token=this.createToken(user.id,res);
        return {user,token};
    };
    async updateUser(body:UpdateUser,id:number){
        if(body.email){
            const valid=await this.validateEmail(body.email);
            if(valid){
                throw new HttpException("email already exists",400);
            };
        };
        try{
            const user=await this.prisma.client.user.update( { where:{id} , data:body });
            return {user};
        }catch(e){
            throw new HttpException("user not found",400)
        };
    };
    async deleteUser(id:number){
        try{
            await this.prisma.client.user.delete({where:{id}});
            return {status:"deleted"};
        }catch(e){
            throw new HttpException('user not found',400);
        };
    };
    async getUser(id:number){
        const user=await this.prisma.client.user.findUnique({where:{id}});
        if(!user){
            throw new HttpException('user not found',400);
        };
        return {user};
    };
    async changeLoggedUserPassword(body:ChangeUserPassword,user:User){
        if( body.password !== body.passwordConfirm ){
            throw new HttpException("password mismatch",400);
        };
        await this.comparePassword(body.currentPassword,user.password,"current password is not correct");
        const password=await this.hashPassword(body.password);
        try{
            const updated = await this.prisma.client.user.update({where:{id:user.id},
                data:{password,passwordChangedAt:new Date()}});
            return {user:updated};
        }catch(e){
            throw new HttpException('user not found',400);
        };
    };
    async forgetPassword(email:string){
        const valid=await this.validateEmail(email);
        if(!valid){
            throw new HttpException('user not found',400);
        };
        const code=randomBytes(3).toString('hex');
        const hash=createHash("sha256").update(code).digest('hex');
        const expiresIn=new Date( Date.now() + 10*60*1000 );
        const user=await this.prisma.user.update({ 
            where : { id:valid.id } , 
            data:{ passwordResetCode:hash , passwordResetCodeExpiresIn:expiresIn } 
        });
        try{
            this.nodemailer.sendResetCode(user.email,code);
        }catch(err){
            await this.prisma.user.update({ 
                where : { id:valid.id } , 
                data:{ passwordResetCode:null , passwordResetCodeExpiresIn:null } 
            });
        }
        return { user , code }
    };
    async validateResetCode(code:string,body:changePassword){
        const hash=createHash("sha256").update(code).digest('hex');
        const user=await this.prisma.client.user.findFirst(
            { where : { passwordResetCode:hash,passwordResetCodeExpiresIn:{gt:new Date()} }});
        if(!user){
            throw new HttpException('reset code is not valid',400);
        };
        if( body.password !== body.passwordConfirm ){
            throw new HttpException("password mismatch",400);
        };
        const password=await this.hashPassword(body.password);
        try{
            const updated = await this.prisma.client.user.update({
                where:{id:user.id},data:{password,passwordChangedAt:new Date() }});
            return {user:updated};
        }catch(e){
            throw new HttpException('user not found',400);
        };
    };
    private createToken(id:number,res:Response){
        const token= jwt.sign
            ({userId:id},this.config.get<string>("secure_jwt"),{expiresIn:"4d"});
        res.cookie("token",token,{maxAge:4*24*3600*1000,secure:false});
        return token;
    };
    private async validateEmail(email:string){
        const user=await this.prisma.client.user.findFirst( { where : { email } } );
        return user ;
    };
    private async comparePassword(password:string,hash:string,message:string){
        const valid=await bcrybtjs.compare(password,hash);
        if( ! valid ){
            throw new HttpException(message,400);
        };
    };
    private async hashPassword(password:string){
        return bcrybtjs.hash(password,10);
    };
};