import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'apps/system/src/user/entities/user.entity';
import { UserService } from 'apps/system/src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async validateUser(username: string, password: string): Promise<User | null> {
        // TODO 
        const user = await this.userService.findByUserName(username)

        if(!user){
            return null
        }

        const passwordIsValid = password === user.password
        return passwordIsValid ? user : null

    }

    login(user: User): { user: User, access_token: string } {
        // TODO 
        const payload = {
            username: user.username,
            sub: user.id
        }

        return {
            user: user,
            access_token: this.jwtService.sign(payload),
        }
    }

    async verify(token: string): Promise<User> {
        const decoded = this.jwtService.verify(token, {
            secret: 'secret'
        })

        const user = this.userService.findByUserName(decoded.username);

        if (!user) {
            throw new Error('Unable to get the user from decoded token.');
        }

        return user;
    }

}
