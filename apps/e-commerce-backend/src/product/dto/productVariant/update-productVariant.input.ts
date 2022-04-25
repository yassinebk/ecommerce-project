import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateProductVariant {
  @Field(() => Int)
  id: number;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => [String], { nullable: true })
  categories?: string[];

  @Field(() => [String], { nullable: true })
  sizes?: string[];

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => Int, { nullable: true })
  genericProductId?: number;

  @Field(() => [String], { nullable: true })
  imageLinks: string[];

  @Field(() => Int, { nullable: true })
  qty: number;
}
