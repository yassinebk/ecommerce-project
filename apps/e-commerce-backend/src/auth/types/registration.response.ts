import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user';

@ObjectType()
export class RegisterRespnse {
  @Field(() => User)
  user: Omit<User, 'hashedPassword'>;

  @Field()
  message: string;
}
