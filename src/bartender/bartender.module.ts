import { Module } from '@nestjs/common';
import { BartenderService } from './bartender.service';
import { BartenderController } from './bartender.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [BartenderService, PrismaService],
  controllers: [BartenderController],
})
export class BartenderModule {}
