import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DepartmentModule } from './department/department.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { EmployeeModule } from './employee/employee.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './__auth__/auth.module';
import { PrismaModule } from './__prisma__/prisma.module';
import { SeederModule } from './__seeder__/seeder.module';
import { RvApproverSettingModule } from './rv-approver-setting/rv-approver-setting.module';
import { ClassificationModule } from './classification/classification.module';
import { MeqsApproverSettingModule } from './meqs-approver-setting/meqs-approver-setting.module';
import { PoApproverSettingModule } from './po-approver-setting/po-approver-setting.module';
import { RrApproverSettingModule } from './rr-approver-setting/rr-approver-setting.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    DepartmentModule,
    EmployeeModule,
    UserModule,
    AuthModule,
    PrismaModule,
    SeederModule,
    RvApproverSettingModule,
    ClassificationModule,
    MeqsApproverSettingModule,
    PoApproverSettingModule,
    RrApproverSettingModule
  ],
  controllers: [],
  providers: [],
})
export class SystemModule {}
