import { CallHandler, ExecutionContext, HttpException, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Request } from 'express';
import {v4} from "uuid";
import * as sharp from "sharp";

@Injectable()
export class UploadFileInterceptor implements NestInterceptor {
    constructor( @Inject("folder") private folder:string ) {} ;
    async intercept(context: ExecutionContext, next: CallHandler){
        const req=context.switchToHttp().getRequest<Request>();
        const file=req.file;
        if( !file ){
            return next.handle();
        }
        if(!file.mimetype.startsWith('image')){
            throw new HttpException('file type should be image',400);
        };
        const filename= `${this.folder}-${Date.now()}-${v4()}.jpeg`;
        await sharp(file.buffer).
            resize(500,500)
            .toFormat('jpeg')
            .jpeg({quality:70})
            .toFile(`src/uploads/${this.folder}/${filename}`);
        req.body.image=filename;
        return next.handle();
    };
};