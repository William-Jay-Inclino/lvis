import { Module } from '@nestjs/common';
import { ClassificationService } from './classification.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ClassificationService],
  exports: [ClassificationService]
})
export class ClassificationModule {}
