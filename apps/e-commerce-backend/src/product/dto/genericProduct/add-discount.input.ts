import { Float } from '@nestjs/graphql';
import { Field, InputType } from '@nestjs/graphql/dist/decorators';

@InputType()
export class AddDiscountInput {
  @Field(() => Float)
  discount: number;

  @Field()
  startDate: Date;

  @Field()
  duration: number;

  @Field({ nullable: false })
  involvedProdcuts: number[] | number;
}
