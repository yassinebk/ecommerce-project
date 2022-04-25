import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from '../types';

// Check if username in field for query matches authenticated user's username
// or if the user is admin
@Injectable()
export class IsVerifiedGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    if (request.user) {
      const user = <JwtPayload>request.user;
      return user.isVerified;
    }
    throw new AuthenticationError(
      'Please verify your email. Check your inbox for the email verification email.',
    );
  }
}
