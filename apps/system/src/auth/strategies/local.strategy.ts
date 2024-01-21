import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AuthService } from "../auth.service";
import { User } from "apps/system/src/user/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super()
    }

    async validate(username: string, password: string): Promise<User> {
        console.log('local.strategy.ts - validate()', username, this.pass)
        const user = this.authService.validateUser(username, password);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}