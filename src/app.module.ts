import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SentimentModule } from './modules/sentiment/sentiment.module';
import { TwitterModule } from './modules/twitter/twitter.module';
import { YoutubeModule } from './modules/youtube/youtube.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    SentimentModule,
    TwitterModule,
    YoutubeModule
  ],
})
export class AppModule { }
