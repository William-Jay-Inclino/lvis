import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'apps/system/src/user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async validateUser(username: string, password: string) {
        // TODO 
        const user = await this.userService.findByUserName(username)

        if(user && user.password === password){

            const { password, ...result } = user 
            return result
        }

        return null

    }

    async login(user: User): Promise<{ user: User, access_token: string }> {
        const payload = { username: user.username, sub: user.id };
        console.log('login user', user)
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }

    async validateToken(token: string): Promise<User | null> {
        if (!token) {
            return null; // No token provided, return null or handle differently based on your needs
        }

        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.userService.findOne(decoded.sub);
            return user;
        } catch (error) {
            // Token is invalid or expired
            return null;
        }
    }

}
