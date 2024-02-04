import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => User)
    async validateToken(@Args('token') token: string) {
        console.log('token', token)
        const user = await this.authService.validateToken(token);

        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }

        return user;
    }

}
