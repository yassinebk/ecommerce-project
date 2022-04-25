import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GenericProduct } from '../../product/generic-product/entities/genericProduct.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Category {
  constructor(title: string) {
    this.title = title;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Field()
  @Column({ unique: true })
  title: string;

  @Field(() => [GenericProduct], { nullable: true })
  @ManyToMany(() => GenericProduct, (product) => product.categories, {
    eager: true,
  })
  products: GenericProduct[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
