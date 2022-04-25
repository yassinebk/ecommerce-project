import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { OrderProductService } from 'src/order-product/order-product.service';
import { ProductVariantModule } from 'src/product/product-variant/product-variant.module';
import { UserModule } from 'src/user';
import { Order } from './entities/order.entity';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';

@Module({
  providers: [OrderResolver, OrderService, OrderProductService],
  imports: [
    TypeOrmModule.forFeature([Order, OrderProduct]),
    ProductVariantModule,
    UserModule,
  ],
})
export class OrderModule {}
