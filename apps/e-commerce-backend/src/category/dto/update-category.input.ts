import { CreateCategoryInput } from './create-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  id: number;

  @Optional()
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  title?: string;
}
