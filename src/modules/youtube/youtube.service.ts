import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { RecordNotFound } from 'src/exceptions/api-exceptions';
import { SentimentService } from '../sentiment/sentiment.service';

@Injectable()
export class YoutubeService {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService,
        private sentimentService: SentimentService,
    ) { }


    async getVideoComments(body: any): Promise<any> {
        const apiUrl = "https://www.googleapis.com/youtube/v3";
        const url = `${apiUrl}/commentThreads?key=${this.configService.get<string>(
            'YOUTUBE_API_KEY',
        )}&part=snippet,replies&videoId=${body.videoId}`;

        const videoMetaData = `${apiUrl}/videos?key=${this.configService.get<string>(
            'YOUTUBE_API_KEY',
        )}&part=snippet&id=${body.videoId}`;

        const videoData = await fetch(url);
        const videoDataResponse = await videoData.json();

        const videoData2 = await fetch(videoMetaData);
        const videoDataResponse2 = await videoData2.json();

        let count = -1;
        const commentMapping = new Set();
        const flatMap: string[] = []
        const comments = videoDataResponse.items.map((comment) => {

            let replies = [];
            if (comment.replies !== undefined) {

                replies = comment.replies.comments.map((reply) => {
                    count++;
                    commentMapping.add({ count, id: reply.id });
                    flatMap.push(reply.snippet.textOriginal)
                    return {
                        comment: reply.snippet.textOriginal,
                        author: reply.snippet.authorDisplayName,
                        likes: reply.snippet.likeCount,
                        updatedAt: reply.snippet.updatedAt,
                        publishedAt: reply.snippet.publishedAt,
                        id: reply.id
                    }
                })
            }
            count++;
            commentMapping.add({ count, id: comment.snippet.topLevelComment.id });

            flatMap.push(comment.snippet.topLevelComment.snippet.textOriginal.slice(0, 512))

            return {
                author: comment.snippet.topLevelComment.snippet.authorDisplayName,
                comment: comment.snippet.topLevelComment.snippet.textOriginal,
                likes: comment.snippet.topLevelComment.snippet.likeCount,
                publishedAt: comment.snippet.topLevelComment.snippet.publishedAt,
                updatedAt: comment.snippet.topLevelComment.snippet.updatedAt,
                id: comment.snippet.topLevelComment.id,
                replies
            }
        });

        const sentiment = await this.sentimentService.analyzeText(flatMap, comments)
        return {
            videoDetails: {
                title: videoDataResponse2.items[0].snippet.title,
                thumbnail: videoDataResponse2.items[0].snippet.thumbnails.standard.url,
            },
            sentiment
        };
    }
}
