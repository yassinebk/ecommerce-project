import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ImageLink } from '../../entities/ImageLink.entity';
import { GenericProduct } from '../../generic-product/entities';
import { ProductVariantSize } from './productVariantSize.entity';

@ObjectType()
@Entity()
export class ProductVariant {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { nullable: true })
  productVariantId: number;

  @Column()
  @Field()
  color: string;

  @Field(() => [ImageLink])
  @OneToMany(() => ImageLink, (imageLink) => imageLink.productVariant, {
    onDelete: 'CASCADE',
    eager: true,
    cascade: true,
  })
  imageLinks: ImageLink[];

  @Field(() => GenericProduct)
  @ManyToOne(
    () => GenericProduct,
    (genericProduct) => genericProduct.productVariants,
    { nullable: false, eager: true },
  )
  genericProduct: GenericProduct;

  @Field(() => Float)
  @Column({ nullable: true })
  price: number;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => OrderProduct, (o) => o.productVariant, { nullable: true })
  orderProducts: OrderProduct[];

  @Field(() => [ProductVariantSize], { defaultValue: [] })
  @OneToMany(() => ProductVariantSize, (p) => p.productVariant, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  sizeQty: ProductVariantSize[];
}
