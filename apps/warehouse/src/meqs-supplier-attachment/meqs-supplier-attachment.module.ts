import { Module } from '@nestjs/common';
import { MeqsSupplierAttachmentService } from './meqs-supplier-attachment.service';
import { MeqsSupplierAttachmentResolver } from './meqs-supplier-attachment.resolver';

@Module({
  providers: [MeqsSupplierAttachmentResolver, MeqsSupplierAttachmentService],
})
export class MeqsSupplierAttachmentModule {}
