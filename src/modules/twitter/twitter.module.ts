import { Module } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { PrismaService } from 'src/prisma.service';
import { TwitterController } from './twitter.controller';

@Module({
  providers: [TwitterService, PrismaService],
  exports: [TwitterService],
  controllers: [TwitterController]
})
export class TwitterModule { }
