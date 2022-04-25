import { Module } from '@nestjs/common';
import { GenericProductModule } from './generic-product/generic-product.module';
import { ProductVariantModule } from './product-variant/product-variant.module';

@Module({
  providers: [],
  exports: [ProductVariantModule, GenericProductModule],
  imports: [ProductVariantModule, GenericProductModule],
})
export class ProductModule {}
