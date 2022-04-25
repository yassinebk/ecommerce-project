import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadResolver } from './file-upload.resolver';

@Module({
  providers: [FileUploadResolver, FileUploadService],
})
export class FileUploadModule {}
