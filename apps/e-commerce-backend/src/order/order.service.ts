import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProductService } from 'src/order-product/order-product.service';
import { UserService } from 'src/user';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order, OrderState } from './entities';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private orderProductService: OrderProductService,
    private userService: UserService,
  ) {}

  async create(createOrderInput: CreateOrderInput) {
    const user = await this.userService.findOne(createOrderInput.user);
    // TODO : id in the ids array passed from the createOrderInput
    const newOrder = this.orderRepository.create({
      state: OrderState.PENDING,
      user,
    });
    const createdOrder = await this.orderRepository.save(newOrder);

    const productOrdersPromises = createOrderInput.products.map((p) =>
      this.orderProductService.create({
        order: createdOrder,
        ...p,
      }),
    );

    const productOrders = await Promise.all(productOrdersPromises);

    createdOrder.orderProducts = productOrders;
    return this.orderRepository.save(createdOrder);
  }

  findAll() {
    return this.orderRepository.find();
  }

  findOne(id: number) {
    return this.orderRepository.findOneOrFail(id);
  }

  async findAllForOneUser(userId: number) {
    const ordersFound = await this.orderRepository.find({
      where: { user: { userId: userId } },
      relations: ['orderProducts', 'orderProducts.productVariant'],
    });
    console.log(ordersFound);
    return ordersFound;
  }

  async updateOrder(id: number, updateOrderInput: UpdateOrderInput) {
    const toUpdateOrder = await this.orderRepository.findOneOrFail(id);
    toUpdateOrder.state = updateOrderInput.state;
    return this.orderRepository.save(toUpdateOrder);
  }

  async removeOrder(id: number) {
    const toRemoveOrder = await this.orderRepository.findOneOrFail(id);
    return this.orderRepository.remove(toRemoveOrder);
  }

  async safeRemoveOrder(userId: number, orderId: number) {
    const toRemoveOrder = await this.orderRepository.findOneOrFail({
      where: {
        orderId,
        user: { userId },
      },
    });
    return this.orderRepository.remove(toRemoveOrder);
  }
}
