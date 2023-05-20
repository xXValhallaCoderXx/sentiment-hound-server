import {
    Controller,
    Get,
    Request,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';


@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async register(@Request() req) {
        return this.userService.findById(req.user.id);
    }

}