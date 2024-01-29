import { Module } from '@nestjs/common';
import { BrandModule } from './brand/brand.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './__seeder__/seeder.module';
import { PrismaModule } from './__prisma__/prisma.module';
import { CanvassModule } from './canvass/canvass.module';
import { CanvassItemModule } from './canvass-item/canvass-item.module';
import { EmployeeModule } from './employee/employee.module';
import { RvService } from './rv/rv.service';
import { RvModule } from './rv/rv.module';
import { ClassificationModule } from './classification/classification.module';


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
    SeederModule,
    PrismaModule,
    CanvassModule,
    CanvassItemModule,
    EmployeeModule,
    RvModule,
    ClassificationModule,
  ],
  controllers: [],
  providers: [RvService],
})
export class WarehouseModule {}
