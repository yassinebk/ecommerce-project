import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserEmailInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;
}

@InputType()
export class UpdateUserPasswordInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  password: string;
}

@InputType()
export class UpdateUserRefreshTokenInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  refreshToken: string;
}

export class UpdateUserGeneral extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  refreshToken: string;

  @Field(() => String)
  accessToken: string;
}
