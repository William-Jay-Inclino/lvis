import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'apps/system/src/user/entities/user.entity';
import { UserService } from 'apps/system/src/user/user.service';
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtSecret } from '../constants';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        })
    }

    async validate(validationPayload: { username: string, sub: string }): Promise<User | null> {
        return this.usersService.findByUserName(validationPayload.username);
    }
}