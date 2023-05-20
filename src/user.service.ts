// import { Injectable } from '@nestjs/common';
// import { PrismaService } from './prisma.service';
// import { User, Prisma } from '@prisma/client';

// @Injectable()
// export class UserService {
//     constructor(private prisma: PrismaService) { }

//     async user(
//         userWhereUniqueInput: Prisma.UserWhereUniqueInput,
//     ): Promise<User | null> {
//         return this.prisma.user.findUnique({
//             where: userWhereUniqueInput,
//         });
//     }

//     async users(params: {
//         skip?: number;
//         take?: number;
//         cursor?: Prisma.UserWhereUniqueInput;
//         where?: Prisma.UserWhereInput;
//         orderBy?: Prisma.UserOrderByWithRelationInput;
//     }): Promise<User[]> {
//         const { skip, take, cursor, where, orderBy } = params;
//         return this.prisma.user.findMany({
//             skip,
//             take,
//             cursor,
//             where,
//             orderBy,
//         });
//     }

//     async createUser(data: Prisma.UserCreateInput): Promise<User> {
//         return this.prisma.user.create({
//             data,
//         });
//     }

//     async updateUser(params: {
//         where: Prisma.UserWhereUniqueInput;
//         data: Prisma.UserUpdateInput;
//     }): Promise<User> {
//         const { where, data } = params;
//         return this.prisma.user.update({
//             data,
//             where,
//         });
//     }

//     async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
//         return this.prisma.user.delete({
//             where,
//         });
//     }
// }

// import { AppService } from './app.service';
// import {
//   Controller,
//   Get,

// } from '@nestjs/common';
// import { UserService } from './user.service';
// import { PostService } from './post.service';

// @Controller()
// export class AppController {
//   constructor(
//     private readonly appService: AppService,
//     private readonly userService: UserService,
//     private readonly postService: PostService,
//   ) { }


//   @Get()
//   async getHello(): Promise<string> {

//     const res = await fetch("http://localhost:8000/analyze/tweet", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         "input_text": "I really liek cheese"
//       })
//     })
//     const response = await res.json()
//     console.log("RESPONSER: ", response)
//     return this.appService.getHello();
//   }


//   // @Get('feed')
//   // async getPublishedPosts(): Promise<PostModel[]> {
//   //   return this.postService.posts({
//   //     where: { published: true },
//   //   });
//   // }

//   // @Get('filtered-posts/:searchString')
//   // async getFilteredPosts(
//   //   @Param('searchString') searchString: string,
//   // ): Promise<PostModel[]> {
//   //   return this.postService.posts({
//   //     where: {
//   //       OR: [
//   //         {
//   //           title: { contains: searchString },
//   //         },
//   //         {
//   //           content: { contains: searchString },
//   //         },
//   //       ],
//   //     },
//   //   });
//   // }

//   // @Post('post')
//   // async createDraft(
//   //   @Body() postData: { title: string; content?: string; authorEmail: string },
//   // ): Promise<PostModel> {
//   //   const { title, content, authorEmail } = postData;
//   //   return this.postService.createPost({
//   //     title,
//   //     content,
//   //     author: {
//   //       connect: { email: authorEmail },
//   //     },
//   //   });
//   // }

//   // @Post('user')
//   // async signupUser(
//   //   @Body() userData: { name?: string; email: string },
//   // ): Promise<UserModel> {
//   //   return this.userService.createUser(userData);
//   // }

//   // @Put('publish/:id')
//   // async publishPost(@Param('id') id: string): Promise<PostModel> {
//   //   return this.postService.updatePost({
//   //     where: { id: Number(id) },
//   //     data: { published: true },
//   //   });
//   // }

//   // @Delete('post/:id')
//   // async deletePost(@Param('id') id: string): Promise<PostModel> {
//   //   return this.postService.deletePost({ id: Number(id) });
//   // }
// }

import { Injectable } from '@nestjs/common';
// import { PrismaService } from './prisma.service';
// import { Tweet, Prisma } from '@prisma/client';

// @Injectable()
// export class PostService {
//     constructor(private prisma: PrismaService) { }

//     async post(
//         postWhereUniqueInput: Prisma.TweetWhereUniqueInput,
//     ): Promise<Tweet | null> {
//         return this.prisma.tweet.findUnique({
//             where: postWhereUniqueInput,
//         });
//     }

//     async posts(params: {
//         skip?: number;
//         take?: number;
//         cursor?: Prisma.TweetWhereUniqueInput;
//         where?: Prisma.TweetWhereInput;
//         orderBy?: Prisma.TweetOrderByWithRelationInput;
//     }): Promise<Tweet[]> {
//         const { skip, take, cursor, where, orderBy } = params;
//         return this.prisma.tweet.findMany({
//             skip,
//             take,
//             cursor,
//             where,
//             orderBy,
//         });
//     }

//     // async createPost(data: Prisma.PostCreateInput): Promise<Post> {
//     //     return this.prisma.post.create({
//     //         data,
//     //     });
//     // }

//     // async updatePost(params: {
//     //     where: Prisma.PostWhereUniqueInput;
//     //     data: Prisma.PostUpdateInput;
//     // }): Promise<Post> {
//     //     const { data, where } = params;
//     //     return this.prisma.post.update({
//     //         data,
//     //         where,
//     //     });
//     // }

//     // async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
//     //     return this.prisma.post.delete({
//     //         where,
//     //     });
//     // }
// }