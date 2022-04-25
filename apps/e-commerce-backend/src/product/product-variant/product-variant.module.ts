import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { ImageLink, Size } from '../entities';
import { GenericProductModule } from '../generic-product/generic-product.module';
import { ProductVariant } from './entities/productVariant.entity';
import { ProductVariantSize } from './entities/productVariantSize.entity';
import { ProductVariantResolver } from './product-variant.resolver';
import { ProductVariantService } from './product-variant.service';

@Module({
  providers: [ProductVariantService, ProductVariantResolver],
  exports: [ProductVariantService],
  imports: [
    CategoryModule,
    GenericProductModule,
    TypeOrmModule.forFeature([
      Size,
      ImageLink,
      ProductVariant,
      ProductVariantSize,
    ]),
  ],
})
export class ProductVariantModule {}
