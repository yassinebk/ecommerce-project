import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindOneCategoryInput {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  title?: string;
}
