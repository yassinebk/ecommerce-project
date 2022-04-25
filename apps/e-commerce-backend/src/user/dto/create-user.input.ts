import { Field, InputType } from '@nestjs/graphql';
import { Contains } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  @Contains('[A-Z][a-z][1-9]')
  password: string;

  @Field(() => String)
  confirmPassword: string;
}
