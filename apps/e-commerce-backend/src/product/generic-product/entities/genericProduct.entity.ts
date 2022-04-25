import { ObjectType, Int, Float, Field } from '@nestjs/graphql';
import { Category } from '../../../category/entities';
import { Discount } from '../../entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { ProductVariant } from '../../product-variant/entities';

@ObjectType()
@Entity()
export class GenericProduct {
  constructor(name, description, basePrice) {
    this.name = name;
    this.description = description;
    this.basePrice = basePrice;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  genericProductId: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Float)
  @Column()
  basePrice: number;

  @Field(() => Discount, { nullable: true })
  @ManyToOne(() => Discount, (discount) => discount.discountedProducts)
  discount: Discount;

  @Field(() => [Category], { nullable: true })
  @ManyToMany(() => Category, (category) => category.products, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[];

  @Field(() => [ProductVariant], { nullable: true })
  @OneToMany(
    () => ProductVariant,
    (productVariant) => productVariant.genericProduct,
    { nullable: true, cascade: true, onDelete: 'CASCADE' },
  )
  productVariants: ProductVariant[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
