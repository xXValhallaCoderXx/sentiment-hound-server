import {
    Body,
    Controller,
    Get,
    Request,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';


@Controller('user')
export class UserController {
    constructor(private userService: UsersService) { }


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async register(@Request() req) {
        return this.userService.findById(req.user.id);
    }

}