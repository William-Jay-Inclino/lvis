import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AuthService } from "../auth.service";
import { User } from "../entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super()
    }

    async validate(username: string, password: string): Promise<User> {
        console.log('local.strategy.ts - validate()', username, password)
        const user = await this.authService.validateUser(username, password);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}