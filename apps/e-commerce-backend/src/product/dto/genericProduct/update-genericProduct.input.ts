import { Field, Float, InputType } from '@nestjs/graphql';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateGenericProductInput {
  @Field({ nullable: false })
  id: number;

  @Field()
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(40)
  @Field({ nullable: true })
  description?: string;

  @Field(() => Float, { nullable: true })
  basePrice?: number;

  @Field(() => [String], { nullable: true })
  @ArrayNotEmpty()
  categories?: string[];
}
