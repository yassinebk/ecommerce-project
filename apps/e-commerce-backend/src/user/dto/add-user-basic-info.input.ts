import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddUserBasicInfoInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  branch: string;

  @Field(() => String)
  phoneNumber: string;

  @Field(() => String, { nullable: true })
  socialLinkProfile?: string;
}
