import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SizeQty {
  @Field(() => Int)
  sizeId: number;

  @Field(() => Number)
  quantity: number;
}
@InputType()
export class CreateProductVariantInput {
  @Field(() => Int)
  genericProductId: number;

  @Field(() => String)
  color: string;

  // @Field(() => [SizeQty])
  // sizes: SizeQty[];

  @Field(() => [String])
  imageLinks: string[];

  @Field(() => Float, { nullable: true })
  price: number;
}
