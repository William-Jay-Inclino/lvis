import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { MODULES, RESOLVERS } from '../../__common__/types';
import { canAccess } from '../../__common__/helpers';
import { User } from '../../__common__/user.entity';

@Injectable()
export class AccessGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const access = this.reflector.get<{ module: MODULES; resolver: RESOLVERS }>('access', context.getHandler());

        if (!access) {
            return true;
        }

        const ctx = GqlExecutionContext.create(context);
        const authUser: User = ctx.getContext().req.user;

        if (!canAccess(authUser, access.module, access.resolver)) {
            throw new ForbiddenException('You do not have permission to perform this action');
        }

        return true;
    }
}
