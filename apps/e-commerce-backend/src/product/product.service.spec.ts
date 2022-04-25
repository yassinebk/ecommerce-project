import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantService } from './product-variant/product-variant.service';

describe('ProductService', () => {
  let service: ProductVariantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductVariantService],
    }).compile();

    service = module.get<ProductVariantService>(ProductVariantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
