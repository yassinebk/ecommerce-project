import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Size } from 'src/product/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductVariant } from '.';

@ObjectType()
@Entity()
export class ProductVariantSize {
  constructor(sizeEnt: Size, productVariant: ProductVariant) {
    this.sizeEnt = sizeEnt;
    this.productVariant = productVariant;
  }

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  sizeQtyId: number;

  @ManyToOne(() => Size)
  sizeEnt: Size;

  @Field(() => String)
  @Column()
  size: string;

  @Field(() => Int)
  @Column()
  productVariantId: number;

  @ManyToOne(() => ProductVariant)
  productVariant: ProductVariant;

  @Field(() => Int)
  @Column()
  quantity: number;
}
