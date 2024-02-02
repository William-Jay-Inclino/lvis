import { Controller, UseGuards, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: Request): Promise<{ user: User, access_token: string }> {
        console.log('logging in')
        return this.authService.login(req.user as User);
    }

}
