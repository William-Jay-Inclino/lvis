import { Injectable, NotFoundException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'apps/system/src/user/entities/user.entity';
import { UserService } from 'apps/system/src/user/user.service';
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY
        })
    }

    async validate(validationPayload: { username: string, sub: string }): Promise<User | null> {
        const user = this.usersService.findOne(validationPayload.sub);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user
    }
}