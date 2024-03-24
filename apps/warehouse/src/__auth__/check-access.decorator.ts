import { SetMetadata } from '@nestjs/common';
import { MODULES, RESOLVERS } from '../__common__/types';

export const CheckAccess = (module: MODULES, resolver: RESOLVERS) =>
    SetMetadata('access', { module, resolver });
