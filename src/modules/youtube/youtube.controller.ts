import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';

@Controller('youtube')
export class YoutubeController {
  constructor(private youtubeService: YoutubeService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('analyze')
  async register(@Body() body) {
    return this.youtubeService.getVideoComments(body);
  }

  @Post('save-sentiment')
  async saveSentiment(@Body() body) {
    return this.youtubeService.storeVideoSentiment(body);
  }

  @Get('sentiment')
  async getSentiment(@Body() body) {
    return this.youtubeService.getSentiment(body);
  }
}
