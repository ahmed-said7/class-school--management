import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";

interface Options {
    subject:string; 
    to:string; 
    text:string;
}


@Injectable()
export class NodemailerService {
    private readonly transport:nodemailer.Transporter;
    constructor(config:ConfigService){
        this.transport=nodemailer.createTransport({
            host:config.get<string>('host'),
            port:config.get<number>('port'),
            auth:{
                user:config.get<string>("user")
                ,pass:config.get<string>("pass")
            }
        });
    };
    sendResetCode(to:string,code:string){
        const subject="reset code to change password";
        const text=`your reset code to change password is ${code}`;
        return this.send({subject,text,to});
    };
    send( opts : Options ){
        return this.transport.sendMail({ ... opts , from : "tanta engineering"  })
    };
};