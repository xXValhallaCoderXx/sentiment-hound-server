import { Module } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { PrismaService } from 'src/prisma.service';
import { YoutubeController } from './youtube.controller';
import { SentimentService } from '../sentiment/sentiment.service';
import { UserService } from '../user/user.service';
@Module({
    providers: [YoutubeService, PrismaService, SentimentService, UserService],
    exports: [YoutubeService],
    controllers: [YoutubeController]
})
export class YoutubeModule { }
