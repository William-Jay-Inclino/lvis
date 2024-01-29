import { Module } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { ClassificationResolver } from './classification.resolver';

@Module({
  providers: [ClassificationResolver, ClassificationService],
})
export class ClassificationModule {}
