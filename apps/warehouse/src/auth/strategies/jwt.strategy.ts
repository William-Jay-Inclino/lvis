import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'apps/system/src/user/entities/user.entity';
import { ExtractJwt, Strategy } from "passport-jwt";
import { catchError, firstValueFrom } from 'rxjs';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
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

        console.log('JwtStrategy validationPayload', validationPayload)

        const query = `
            query{
                getUserByUserName(username: "${validationPayload.username}") {
                    id
                    username
                }
            }
        `;

        const { data } = await firstValueFrom(
            this.httpService.post(process.env.API_GATEWAY_URL, { query } ).pipe(
              catchError((error) => {

                console.error(error);
                throw error

              }),
            ),
        );

        console.log('data', data)

        const user = data.data.getUserByUserName

        console.log('user', user)

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user
    }
}