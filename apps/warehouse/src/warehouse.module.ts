import { Module } from '@nestjs/common';
import { BrandModule } from './brand/brand.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    BrandModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class WarehouseModule {}
