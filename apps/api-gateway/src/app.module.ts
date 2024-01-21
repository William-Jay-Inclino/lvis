import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { HttpException, Module, UnauthorizedException } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { authContext } from './auth.context';
import { HttpModule } from '@nestjs/axios';
import { verify } from 'jsonwebtoken'
import { JwtService } from '@nestjs/jwt';


const getToken = (authToken: string) => {

  const match = authToken.match(/^Bearer (.*)$/)
  if(!match || match.length > 2) {
    throw new UnauthorizedException('Invalid token');
  }

  return match[1]

}

const decodeToken = (tokenString: string) => {
  const decoded = verify(tokenString, 'secret')

  if(!decoded) {
    throw new UnauthorizedException('Invalid token');
  }

  return decoded

}


function handleAuth({ req }) {

  try {

    if(req.headers.authorization) {
      const token = getToken(req.headers.authorization)
      const decoded = decodeToken(token)
      console.log('decode', decoded)

      return {
        user: decoded,
        authorization: req.headers.authorization
      }
    }

  } catch (error) {
    throw new UnauthorizedException('Invalid token');
  }

}



@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // cors: true,
        // context: authContext,
        context: handleAuth
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'system',
              url: 'http://localhost:4001/graphql',
            },
            {
              name: 'warehouse',
              url: 'http://localhost:4002/graphql',
            },
          ],
        }),
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              // console.log('context', context)
              request.http.headers.set('user', context.user ? context.user : null);
              request.http.headers.set('authorization', context.authorization ? context.authorization : null);
            },
          });
        },
      },
    }),
    HttpModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
