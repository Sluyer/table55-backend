import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { QrModule } from './qr/qr.module';
import { BartenderModule } from './bartender/bartender.module';

@Module({
  imports: [AuthModule, PrismaModule, QrModule, BartenderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
