import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AddProductToCategory {
  @IsString()
  @Field()
  productId: string;

  @IsString()
  @Field()
  @IsNotEmpty()
  categoryTitle: string;
}
