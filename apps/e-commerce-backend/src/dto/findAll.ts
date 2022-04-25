import { Field, InputType, registerEnumType } from '@nestjs/graphql';
enum ResultOrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(ResultOrderBy, {
  name: 'ResultOrderBy',
  description: 'How to order result',
});
@InputType()
export class FindAllInput {
  @Field(() => ResultOrderBy)
  order: ResultOrderBy;

  @Field(() => String)
  field: string;
}
