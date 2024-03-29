import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Order } from 'src/order/entities';
import { ProductVariant } from 'src/product/product-variant/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class OrderProduct {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @PrimaryGeneratedColumn()
  orderProductId: number;

  @Field(() => ProductVariant)
  @ManyToOne(() => ProductVariant, {
    cascade: true,
    onDelete: 'NO ACTION',
    nullable: false,
  })
  productVariant: ProductVariant;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  sizeId: string;

  @Field(() => Int)
  @Column({ nullable: false })
  quantity: number;

  @Field(() => Order, { nullable: false })
  @ManyToOne(() => Order, (o) => o.orderProducts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  currentOrder: Order;
}
