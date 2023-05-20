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