import { Module } from '@nestjs/common';
import { BrandModule } from './brand/brand.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    BrandModule
  ],
  controllers: [],
  providers: [],
})
export class WarehouseModule {}
