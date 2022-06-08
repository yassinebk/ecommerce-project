import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserRefreshTokenInput } from '../user';
import { AuthService } from './auth.service';
import { CreateAuthInput as RegisterInput, LoginInput } from './dto';
import { EmailConfirmationService } from './email-confirmation.service';
import { Auth } from './entities/auth.entity';
import { RtGuard } from './guards';
import { Tokens } from './types';
import { LoginResponse } from './types/login-response';
import { RegisterRespnse } from './types/registration.response';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Mutation(() => LoginResponse)
  login(@Args('loginUserInput') loginUserInput: LoginInput) {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => RegisterRespnse)
  async register(@Args('registerInput') registerInput: RegisterInput) {
    const user = await this.authService.register(registerInput);
    delete user.hashedPassword;
    return {
      user,
      message: 'Thank you for registering. Please confirm your email ! ',
    };
  }

  @Query(() => Tokens)
  @UseGuards(RtGuard)
  async refreshToken(
    @Args('refreshTokenInput') refreshTokenInput: UpdateUserRefreshTokenInput,
  ) {
    return this.authService.refreshTokens(refreshTokenInput);
  }

  @Mutation(() => Boolean)
  confirmEmail(@Args('confirmationToken') token: string) {
    return this.emailConfirmationService.confirmEmail(token);
  }
}
