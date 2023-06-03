import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';

@Controller('twitter')
export class TwitterController {
    constructor(private twitterService: TwitterService) { }

    // @UseGuards(JwtAuthGuard)
    @Post('analyze')
    async register(@Body() body) {
        return this.twitterService.getTweetReplies(body.data);
    }
}
