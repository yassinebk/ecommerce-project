import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { Category } from 'src/category/entities';
import { GenericProduct } from './entities/genericProduct.entity';
import { GenericProductResolver } from './generic-product.resolver';
import { GenericProductService } from './generic-product.service';

@Module({
  providers: [GenericProductResolver, GenericProductService],
  exports: [GenericProductService],
  imports: [
    TypeOrmModule.forFeature([GenericProduct, Category]),
    CategoryModule,
  ],
})
export class GenericProductModule {}
