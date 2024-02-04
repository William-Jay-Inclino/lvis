import { Module } from '@nestjs/common';
import { BrandModule } from './brand/brand.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { AuthModule } from './__auth__/auth.module';
import { SeederModule } from './__seeder__/seeder.module';
import { PrismaModule } from './__prisma__/prisma.module';
import { CanvassModule } from './canvass/canvass.module';
import { CanvassItemModule } from './canvass-item/canvass-item.module';
import { EmployeeModule } from './__employee__/employee.module';
import { RvService } from './rv/rv.service';
import { RvModule } from './rv/rv.module';
import { ClassificationModule } from './__classification__/classification.module';
import { HttpModule } from '@nestjs/axios';
import { RvApproverModule } from './rv-approver/rv-approver.module';
import { MeqsApproverModule } from './meqs-approver/meqs-approver.module';
import { MeqsSupplierModule } from './meqs-supplier/meqs-supplier.module';
import { MeqsSupplierItemModule } from './meqs-supplier-item/meqs-supplier-item.module';
import { MeqsSupplierAttachmentModule } from './meqs-supplier-attachment/meqs-supplier-attachment.module';
import { MeqsService } from './meqs/meqs.service';
import { MeqsResolver } from './meqs/meqs.resolver';
import { MeqsModule } from './meqs/meqs.module';
import { UnitModule } from './unit/unit.module';
import { SupplierModule } from './supplier/supplier.module';
import { PoService } from './po/po.service';
import { PoResolver } from './po/po.resolver';
import { PoModule } from './po/po.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    HttpModule,
    BrandModule,
    AuthModule,
    SeederModule,
    PrismaModule,
    CanvassModule,
    CanvassItemModule,
    EmployeeModule,
    RvModule,
    ClassificationModule,
    RvApproverModule,
    MeqsApproverModule,
    MeqsSupplierModule,
    MeqsSupplierItemModule,
    MeqsSupplierAttachmentModule,
    MeqsModule,
    UnitModule,
    SupplierModule,
    PoModule
  ],
  controllers: [],
  providers: [RvService, MeqsService, MeqsResolver, PoService, PoResolver],
})
export class WarehouseModule {}
