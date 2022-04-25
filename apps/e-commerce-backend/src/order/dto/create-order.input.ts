import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
class ProductInOrder {
  @Field(() => Int)
  productVariantId: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => String)
  size: string;
}
@InputType()
export class CreateOrderInput {
  @Field(() => [ProductInOrder])
  products: ProductInOrder[];

  @Field(() => Int)
  user: number;
}
