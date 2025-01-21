import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.connect();
  }

  table = {
    findUnique: (params: any) => {
      // Implement your logic here
    },
    findMany: () => {
      // Implement your logic here
    },
  };

  category = {
    findMany: () => {
      // Implement your logic here
    },
  };
}
