import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllInput } from 'src/dto/findAll';
import { ProductVariantService } from 'src/product/product-variant/product-variant.service';
import { Repository } from 'typeorm';
import { CreateOrderProductInput } from './dto/create-order-product.input';
import { OrderProduct } from './entities/order-product.entity';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>,
    private productVariantService: ProductVariantService,
  ) {}

  async create(createOrderProductInput: CreateOrderProductInput) {
    const productVariant = await this.productVariantService.findOne(
      createOrderProductInput.productVariantId,
    );

    console.log(productVariant);
    const PVSize = productVariant.sizeQty.filter(
      (p) => createOrderProductInput.size === p.size,
    )[0];

    if (PVSize.quantity - createOrderProductInput.quantity < 0)
      throw new BadRequestException('The stock of this product is depleted');

    const newProductOrder = this.orderProductRepository.create({
      currentOrder: createOrderProductInput.order,
      productVariant: productVariant,
      quantity: createOrderProductInput.quantity,
      sizeId: createOrderProductInput.size,
    });
    PVSize.quantity -= createOrderProductInput.quantity;
    await this.productVariantService.updateProductVariantQty({
      size: PVSize.size,
      quantity: PVSize.quantity,
      productVariantId: productVariant.productVariantId,
    });

    return this.orderProductRepository.save(newProductOrder);
  }

  findAll(findAllInput: FindAllInput) {
    if (findAllInput)
      return this.orderProductRepository.find({
        order: { [findAllInput.field]: findAllInput.order },
        relations: ['order', 'productVariatn'],
      });
  }

  findOne(id: number) {
    return this.orderProductRepository.findOneOrFail(id);
  }

  // async update(id: number, updateOrderProductInput: UpdateOrderProductInput) {
  //   const toUpdateOrder = await this.orderProductRepository.findOneOrFail(id);
  //   toUpdateOrder.currentOrder = updateOrderProductInput.order;
  //   toUpdateOrder.quantity = updateOrderProductInput.quantity;
  //   return this.orderProductRepository.save(toUpdateOrder);
  // }

  async remove(id: number) {
    const toRemoveOrder = await this.orderProductRepository.findOneOrFail(id);
    return this.orderProductRepository.remove(toRemoveOrder);
  }
}
