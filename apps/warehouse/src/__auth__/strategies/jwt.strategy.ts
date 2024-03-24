import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'apps/system/src/user/entities/user.entity';
import { ExtractJwt, Strategy } from "passport-jwt";
import { catchError, firstValueFrom } from 'rxjs';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    private readonly logger = new Logger(JwtStrategy.name);

    constructor(
        private readonly httpService: HttpService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY
        })
    }

    async validate(validationPayload: { username: string, sub: string }): Promise<User | null> {

        this.logger.log('JwtStrategy validationPayload', validationPayload)

        const query = `
            query{
                validateUserId(id: "${validationPayload.sub}") {
                    id
                    username
                    role
                    status
                    permissions
                }
            }
        `;

        console.log('query', query)

        const { data } = await firstValueFrom(
            this.httpService.post(process.env.API_GATEWAY_URL, { query }).pipe(
                catchError((error) => {
                    throw error
                }),
            ),
        );

        console.log('data', data)

        if (!data || !data.data || !data.data.validateUserId) {
            throw new UnauthorizedException("Unauthorized User")
        }

        return data.data.validateUserId
    }
}