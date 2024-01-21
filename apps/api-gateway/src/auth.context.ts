import { HttpService } from '@nestjs/axios';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'apps/system/src/user/entities/user.entity';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

export const authContext = async ({ req }, httpService: HttpService) => {
  const authorizationHeader = req.headers?.authorization;

  // Allow introspection queries without the Authorization header
  if (!authorizationHeader && req.body?.operationName === 'IntrospectionQuery') {
    return {};
  }

  if (authorizationHeader) {
    const [bearer, token] = authorizationHeader.split(' ');

    // Allow requests without a valid token to proceed (for unauthenticated routes)
    if (bearer.toLowerCase() === 'bearer' && token) {
      try {
        const user = await validateToken(httpService, token);

        if (user) {
          return { user };
        } else {
          throw new UnauthorizedException('Invalid token');
        }
      } catch (error) {
        console.error('Error validating token:', error);
        throw new UnauthorizedException('Invalid token');
      }
    }
  }

  // No Authorization header, return an empty object or handle differently based on your needs
  return {};
};

async function validateToken(httpService: HttpService, token: string): Promise<User | null> {
  const query = `
    mutation {
      validateToken(token: "${token}") {
        id
        username
        # Add other fields as needed
      }
    }
  `;

  console.log('query', query);

  if (!httpService.post) {
    console.error('HttpService.post is not defined');
    return null;
  }

  try {
    const response = await firstValueFrom(httpService.post('http://localhost:4001/graphql', { query }));
    return response.data.data.validateToken;
  } catch (error) {
    console.error('Error validating token:', error);
    return null;
  }
}
