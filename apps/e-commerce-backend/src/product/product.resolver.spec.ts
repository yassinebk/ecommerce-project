import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantResolver } from './product-variant/product-variant.resolver';
import { ProductVariantService } from './product-variant/product-variant.service';

describe('ProductResolver', () => {
  let resolver: ProductVariantResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductVariantResolver, ProductVariantService],
    }).compile();

    resolver = module.get<ProductVariantResolver>(ProductVariantResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
