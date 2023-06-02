import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { RecordNotFound } from 'src/exceptions/api-exceptions';
import { SentimentService } from '../sentiment/sentiment.service';

@Injectable()
export class TwitterService {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService,
        private sentimentService: SentimentService,
    ) { }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.prisma.user.findFirst({ where: { email } });
        return user;
    }

    async getTweetReplies(tweetId: string): Promise<any> {
        // const data = await fetch(`https://api.twitter.com/2/tweets?ids=${tweetId}&tweet.fields=conversation_id&expansions=author_id&user.fields=created_at`, {
        //     headers: {
        //         authorization: `Bearer ${this.configService.get<string>('TWITTER_BEARER_TOKEN')}`
        //     }
        // })
        // const response = await data.json()
        // const conversationId = response.data[0].conversation_id;

        const conversationData = await fetch(
            `https://api.twitter.com/2/tweets/search/recent?query=conversation_id:${tweetId}&tweet.fields=in_reply_to_user_id,author_id,created_at,conversation_id`,
            {
                headers: {
                    authorization: `Bearer ${this.configService.get<string>(
                        'TWITTER_BEARER_TOKEN',
                    )}`,
                },
            },
        );
        const conversationResponse = await conversationData.json();
        console.log('CONVO: ', conversationResponse);
        const sanitizedTweets = conversationResponse.data.map((tweet) => {
            return tweet.text.replace(/@[^ ]+/g, '');
        });
        console.log('PARSED: ', sanitizedTweets);
        const sentiment = this.sentimentService.analyzeText(sanitizedTweets)
        const tweets = '';
        return sentiment;
    }
}
