import { Module } from '@nestjs/common';
import { DepartmentModule } from './department/department.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { EmployeeModule } from './employee/employee.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    DepartmentModule,
    EmployeeModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class SystemModule {}
