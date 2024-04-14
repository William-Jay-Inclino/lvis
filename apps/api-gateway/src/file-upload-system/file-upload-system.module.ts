import { Module } from '@nestjs/common';
import { FileUploadSystemService } from './file-upload-system.service';
import { FileUploadSystemController } from './file-upload-system.controller';

@Module({
  providers: [FileUploadSystemService],
  controllers: [FileUploadSystemController]
})
export class FileUploadSystemModule {}
