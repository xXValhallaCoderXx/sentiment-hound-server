import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { SentimentService } from './sentiment.service';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';

@Controller('sentiment')
export class SentimentController {
    constructor(private sentimentService: SentimentService) { }

    @UseGuards(JwtAuthGuard)
    @Post('twitter')
    async register(@Body() body) {
        return this.sentimentService.analyzeText(body.input_text);
    }
}
