import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';

@Controller('youtube')
export class YoutubeController {
    constructor(private youtubeService: YoutubeService) { }

    // @UseGuards(JwtAuthGuard)
    @Post('analyze')
    async register(@Body() body) {
        return this.youtubeService.getVideoComments(body);
    }
}
