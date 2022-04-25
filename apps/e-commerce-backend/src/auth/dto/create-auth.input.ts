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
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  @Field(() => String)
  password: string;

  @Matches('password')
  @Field(() => String)
  confirmPassword: string;
}
