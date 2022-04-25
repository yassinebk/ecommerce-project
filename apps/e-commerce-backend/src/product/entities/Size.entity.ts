import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { ProductVariant } from '../product-variant/entities/productVariant.entity';

@ObjectType()
@Entity()
export class Size {
  @Field()
  @PrimaryColumn()
  size: string;

  @ManyToMany(() => ProductVariant, (productVariant) => productVariant.sizeQty)
  products: ProductVariant[];
}
