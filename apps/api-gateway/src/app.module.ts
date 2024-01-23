import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { Module, UnauthorizedException } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { verify } from 'jsonwebtoken'

const getToken = (authToken: string) => {

  const match = authToken.match(/^Bearer (.*)$/)
  if(!match || match.length > 2) {
    throw new UnauthorizedException('Invalid token');
  }

  return match[1]

}

const decodeToken = (tokenString: string) => {

  const decoded = verify(tokenString, process.env.JWT_SECRET_KEY)

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
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // cors: true,
        context: handleAuth
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'system',
              url: process.env.SYSTEM_URL,
            },
            {
              name: 'warehouse',
              url: process.env.WAREHOUSE_URL,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
