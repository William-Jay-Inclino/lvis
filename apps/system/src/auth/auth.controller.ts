import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from 'express';
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { User } from "../user/entities/user.entity";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: Request): Promise<{ user: User, access_token: string }> {
        return this.authService.login(req.user as User);
    }
}