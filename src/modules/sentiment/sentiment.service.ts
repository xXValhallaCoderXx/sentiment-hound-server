import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SentimentService {
    constructor(private prisma: PrismaService) { }


    async analyzeText(data: string) {
        const res = await fetch("http://localhost:8000/analyze/tweet-bulk", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "data": data
            })
        })
        const response = await res.json()
        return response
    }


}
