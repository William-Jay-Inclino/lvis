import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly httpService: HttpService
    ) { }

    async validateUser(username: string, password: string): Promise<User> {

        console.log('AuthService: validateUser()', username, password)

        const user = await this.findByUserName(username)

        console.log('user', user)

        if (user && user.password === password) {
            return user
        }

        throw new UnauthorizedException('Invalid credentials');

    }

    async login(user: User): Promise<{ user: User, access_token: string }> {
        const payload = { username: user.username, sub: user.id };
        console.log('login user', user)
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }

    private async findByUserName(username): Promise<User> {
        const query = `
            query{
                getUserByUserName(username: "${username}") {
                    id
                    username
                    password
                    status
                    role
                    user_employee {
                        employee {
                            id
                        }
                    }
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

        if (!data || !data.data || !data.data.getUserByUserName) {
            throw new UnauthorizedException("Unauthorized User")
        }

        console.log('data.data.getUserByUserName', data.data.getUserByUserName)

        return data.data.getUserByUserName

    }


}
