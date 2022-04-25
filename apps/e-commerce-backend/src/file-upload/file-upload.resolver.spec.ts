import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadResolver } from './file-upload.resolver';
import { FileUploadService } from './file-upload.service';

describe('FileUploadResolver', () => {
  let resolver: FileUploadResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUploadResolver, FileUploadService],
    }).compile();

    resolver = module.get<FileUploadResolver>(FileUploadResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
