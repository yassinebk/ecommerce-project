import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum OrderState {
  CONFIRMED = 'CONFIRMED',
  SETTLED = 'SETTLED',
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
}

registerEnumType(OrderState, {
  name: 'OrderState',
  description: 'The state of an orded',
});

@ObjectType()
@Entity()
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  orderId: number;

  // @Field(() => [ProductVariant], { nullable: false })
  // @ManyToMany(() => ProductVariant)
  // @JoinTable()
  // products: ProductVariant[];

  @Field(() => [OrderProduct])
  @OneToMany(() => OrderProduct, (o) => o.currentOrder)
  orderProducts: OrderProduct[];

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, (user) => user.orders, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @Field(() => OrderState)
  @Column({
    type: 'enum',
    enum: ['CONFIRMED', 'SETTLED', 'PENDING', 'CANCELED'],
    default: 'PENDING',
  })
  state: OrderState;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
