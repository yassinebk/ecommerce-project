import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class updateProductVariantQty {
  @Field(() => Int)
  @IsNumber()
  quantity: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNumber()
  @Field(() => Int)
  productVariantId: number;
}
