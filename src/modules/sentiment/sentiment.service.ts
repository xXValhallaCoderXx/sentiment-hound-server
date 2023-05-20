import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

import { RecordNotFound } from 'src/exceptions/api-exceptions';

@Injectable()
export class SentimentService {
    constructor(private prisma: PrismaService) { }


    async analyzeText(data: string) {
        console.log("DATA: ", data)
        const res = await fetch("http://localhost:8000/analyze/tweet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "input_text": data
            })
        })
        const response = await res.json()
        return response
    }


}
