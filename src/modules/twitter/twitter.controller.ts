import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';

@Controller('twitter')
export class TwitterController {
    constructor(private twitterService: TwitterService) { }

    @UseGuards(JwtAuthGuard)
    @Get('analyze')
    async register(@Request() req) {
        return this.twitterService.findByEmail(req.user.id);
    }
}
