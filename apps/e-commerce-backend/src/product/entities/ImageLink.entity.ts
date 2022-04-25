import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductVariant } from '../product-variant/entities/productVariant.entity';

@Entity()
@ObjectType()
export class ImageLink {
  @PrimaryGeneratedColumn()
  @Field()
  imageLinkId: number;

  @Column()
  @Field()
  image: string;

  @Field(() => ProductVariant)
  @ManyToOne(
    () => ProductVariant,
    (productVariant) => productVariant.imageLinks,
  )
  productVariant: ProductVariant;
}
