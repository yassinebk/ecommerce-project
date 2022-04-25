import { Field, Float, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GenericProduct } from '../generic-product/entities/genericProduct.entity';

@ObjectType()
@Entity()
export class Discount {
  @PrimaryGeneratedColumn()
  @Field()
  discountId: number;

  @Field(() => Float)
  @Column()
  discountValue: number;

  @Field()
  @Column()
  startDate: Date;

  @Field()
  @Column()
  endDate: Date;

  @OneToMany(() => GenericProduct, (genericProduct) => genericProduct.discount)
  @Field(() => [GenericProduct])
  discountedProducts: GenericProduct[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
