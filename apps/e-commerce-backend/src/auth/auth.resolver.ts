import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateUserRefreshTokenInput, User } from 'src/user';
import { AuthService } from './auth.service';
import { CreateAuthInput, LoginInput } from './dto';
import { EmailConfirmationService } from './email-confirmation.service';
import { Auth } from './entities/auth.entity';
import { RtGuard } from './guards';
import { LoginResponse } from './types/login-response';
import { Tokens } from './types';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Query(() => LoginResponse)
  login(@Args('loginUserInput') loginUserInput: LoginInput) {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => User)
  async register(@Args('registerInput') registerInput: CreateAuthInput) {
    const user = await this.authService.register(registerInput);
    return user;
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
