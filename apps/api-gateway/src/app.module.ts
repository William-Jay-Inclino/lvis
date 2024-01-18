import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { authContext } from './auth.context';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // cors: true,
        // context: authContext,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'system',
              url: 'http://localhost:4000/graphql',
            },
            {
              name: 'warehouse',
              url: 'http://localhost:4001/graphql',
            },
          ],
        }),
        // buildService({ url }) {
        //   return new RemoteGraphQLDataSource({
        //     url,
        //     willSendRequest({ request, context }) {
        //       request.http.headers.set(
        //         'user',
        //         context.user ? JSON.stringify(context.user) : null,
        //       );
        //     },
        //   });
        // },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
