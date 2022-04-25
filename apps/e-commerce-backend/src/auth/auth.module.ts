import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from 'src/email/email.module';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { EmailConfirmationService } from './email-confirmation.service';
import { AtStrategy, RtStrategy } from './strategies';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    AtStrategy,
    RtStrategy,
    EmailConfirmationService,
  ],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({}),
    EmailModule,
    ConfigModule,
  ],
  exports: [AuthService, EmailConfirmationService, EmailModule, ConfigModule],
})
export class AuthModule {}
