import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from 'express';
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { User } from "../user/entities/user.entity";
import { CreateUserInput } from "../user/dto/create-user.input";
import { UserService } from "../user/user.service";
import { Role } from "@prisma/client";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: Request): Promise<{ user: User, access_token: string }> {
        return this.authService.login(req.user as User);
    }

    @Post('create-admin')
    createAdmin(@Body() dto: {password: string}): Promise<User> {

        const admin = {} as CreateUserInput
        admin.username = 'admin'
        admin.password = dto.password
        admin.role = Role.ADMIN

        return this.userService.create(admin)
    }

}