import { Controller, UseGuards, Post, Req, Get } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: Request) {
        console.log('logging in')
        return this.authService.login(req.user as User);
    }

    @Get('test-get')
    test_get(@Req() req: Request) {
        return 'hello'
    }

    @Post('test-post')
    test_post(@Req() req: Request) {
        return 'hello'
    }

}
