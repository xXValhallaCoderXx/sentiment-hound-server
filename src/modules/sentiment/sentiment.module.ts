import { Module } from '@nestjs/common';
import { SentimentService } from './sentiment.service';
import { PrismaService } from 'src/prisma.service';
import { SentimentController } from './sentiment.controller';

@Module({
  providers: [SentimentService, PrismaService],
  exports: [SentimentService],
  controllers: [SentimentController]
})
export class SentimentModule { }
