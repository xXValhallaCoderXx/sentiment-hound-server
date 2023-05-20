import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Tweet, Prisma } from '@prisma/client';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) { }

    async post(
        postWhereUniqueInput: Prisma.TweetWhereUniqueInput,
    ): Promise<Tweet | null> {
        return this.prisma.tweet.findUnique({
            where: postWhereUniqueInput,
        });
    }

    async posts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.TweetWhereUniqueInput;
        where?: Prisma.TweetWhereInput;
        orderBy?: Prisma.TweetOrderByWithRelationInput;
    }): Promise<Tweet[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.tweet.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    // async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    //     return this.prisma.post.create({
    //         data,
    //     });
    // }

    // async updatePost(params: {
    //     where: Prisma.PostWhereUniqueInput;
    //     data: Prisma.PostUpdateInput;
    // }): Promise<Post> {
    //     const { data, where } = params;
    //     return this.prisma.post.update({
    //         data,
    //         where,
    //     });
    // }

    // async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    //     return this.prisma.post.delete({
    //         where,
    //     });
    // }
}