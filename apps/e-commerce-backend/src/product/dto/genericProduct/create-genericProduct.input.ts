import { Field, Float, InputType, Int } from '@nestjs/graphql';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateGenericProductInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(40)
  @Field()
  description: string;

  @Field(() => Float)
  basePrice: number;

  @Field(() => [Int])
  @ArrayNotEmpty()
  categories: number[];
}
