import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'apps/system/prisma/generated/client';
import { UserService } from 'apps/system/src/user/user.service';
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    private readonly logger = new Logger(JwtStrategy.name);

    constructor(private readonly usersService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY
        })
    }

    async validate(validationPayload: { username: string, sub: string }): Promise<User | null> {
        this.logger.log('validate()', validationPayload)
        const user = this.usersService.findOne(validationPayload.sub);

        if (!user) {
            throw new UnauthorizedException("Unauthorized User")
        }

        return user
    }
}