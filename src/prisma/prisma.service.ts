import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit,OnModuleDestroy {
  public readonly client= this.$extends({
    result:{
        user:{
            image:{
                needs:{image:true},
                compute(user){
                    return `${process.env.base_url}/user/${user.image}`;
                }
            }
        }
    }
  });
  async onModuleInit() {
    await this.$connect();
  };
  async onModuleDestroy() {
    await this.$disconnect();
  }
}