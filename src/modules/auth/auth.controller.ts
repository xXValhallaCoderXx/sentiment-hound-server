import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guards/local.auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    signIn(@Request() req) {
        return this.authService.signIn(req.user);
    }

    @Post('register')
    async register(@Body() data: any) {
        return this.authService.registerAccount(data);
    }
}
