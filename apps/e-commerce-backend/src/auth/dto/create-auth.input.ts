import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateAuthInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString()
  @MaxLength(50)
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g, {
    message: 'Password shoul contain number , uppercase and lowercase letters',
  })
  @Field(() => String)
  password: string;

  @Matches('password')
  @Field(() => String)
  confirmPassword: string;
}
