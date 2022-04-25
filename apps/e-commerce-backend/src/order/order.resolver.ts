import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AtGuard } from 'src/auth/guards';
import { AdminGuard } from 'src/auth/guards/admin-guard';
import { IsVerifiedGuard } from 'src/auth/guards/is-verified.guard';
import { JwtPayload } from 'src/auth/types';
import { GetUser } from 'src/common/decorators/User.decorator';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AtGuard)
  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput);
  }

  @UseGuards(AtGuard, AdminGuard)
  @Query(() => [Order])
  findAllOrders() {
    return this.orderService.findAll();
  }

  @UseGuards(AtGuard)
  @Query(() => Order)
  findOneOrderAdmin(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.findOne(id);
  }

  @UseGuards(AtGuard, IsVerifiedGuard)
  @Query(() => Order)
  findOneOrderUser(@GetUser() user: JwtPayload) {
    return this.orderService.findOne(user.sub);
  }

  @UseGuards(AtGuard, IsVerifiedGuard)
  @Query(() => [Order])
  findAllOrdersForOneUser(@GetUser() user: JwtPayload) {
    return this.orderService.findAllForOneUser(user.sub);
  }

  @UseGuards(AtGuard, AdminGuard)
  @Query(() => [Order])
  findAllOrdersForOneUserAdmin(
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return this.orderService.findAllForOneUser(userId);
  }

  @UseGuards(AtGuard, IsVerifiedGuard)
  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.orderService.updateOrder(updateOrderInput.id, updateOrderInput);
  }

  @UseGuards(AtGuard, AdminGuard)
  @Mutation(() => Order)
  removeOrderAdmin(@Args('id', { type: () => Int }) id: number) {
    return this.orderService.removeOrder(id);
  }

  @UseGuards(AtGuard, IsVerifiedGuard)
  @Mutation(() => Order)
  removeOrderUser(
    @GetUser() user: JwtPayload,
    @Args('id', { type: () => Int }) orderId: number,
  ) {
    return this.orderService.safeRemoveOrder(user.sub, orderId);
  }
}
