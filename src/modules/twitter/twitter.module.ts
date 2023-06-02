import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { PrismaService } from 'src/prisma.service';
import { TwitterController } from './twitter.controller';
import { SentimentService } from '../sentiment/sentiment.service';
@Module({
  providers: [TwitterService, PrismaService, SentimentService],
  exports: [TwitterService],
  controllers: [TwitterController]
})
export class TwitterModule { }
