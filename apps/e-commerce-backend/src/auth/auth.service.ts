import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UpdateUserRefreshTokenInput } from 'src/user';
import { UserService } from 'src/user/user.service';
import { CreateAuthInput, LoginInput } from './dto';
import { EmailConfirmationService } from './email-confirmation.service';
import { JwtPayload, Tokens } from './types';
import { Role } from './types/Roles';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
    private emailConfirmationService: EmailConfirmationService,
  ) {}

  async login(loginInput: LoginInput) {
    const resUser = await this.validateUser(
      loginInput.email,
      loginInput.password,
    );
    const tokens = await this.getTokens(
      resUser.userId,
      resUser.email,
      resUser.role,
      resUser.isVerified,
    );
    const user = await this.updateRtToken({
      id: resUser.userId,
      refreshToken: tokens.refresh_token,
    });
    console.log(user);
    return {
      user,
      ...tokens,
    };
  }
  async updateRtToken(updateRefreshToken: UpdateUserRefreshTokenInput) {
    const hash = await bcrypt.hash(
      updateRefreshToken.refreshToken,
      parseInt(this.config.get<string>('SALT_ROUNDS')),
    );
    return this.userService.updateRefreshToken({
      ...updateRefreshToken,
      refreshToken: hash,
    });
  }

  async register(createAuthInput: CreateAuthInput) {
    if (createAuthInput.confirmPassword !== createAuthInput.password)
      throw new BadRequestException(
        'Password and confirm password should match',
      );
    const user = await this.userService.create(createAuthInput);

    this.emailConfirmationService.sendVerificationEmail(user.email);

    delete user.hashedPassword;
    delete user.role;

    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      if (bcrypt.compare(password, user.hashedPassword)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hashedPassword, ...resUser } = user;
        return resUser;
      } else throw new UnauthorizedException();
    }

    throw new UnauthorizedException();
  }

  async logout(userId: number): Promise<boolean> {
    return this.userService
      .updateRefreshToken({ id: userId, refreshToken: null })
      .then(() => true);
  }

  async refreshTokens(
    refreshTokenInput: UpdateUserRefreshTokenInput,
  ): Promise<Tokens> {
    const user = await this.userService.findOne(refreshTokenInput.id);
    if (!user || !user.refreshToken) throw new ForbiddenException();

    console.log(refreshTokenInput.refreshToken, user.refreshToken);
    // const rtMatches = await bcrypt.compare(
    //   refreshTokenInput.refreshToken,
    //   user.refreshToken,
    // );
    const rtMatches = this.jwtService.verify(refreshTokenInput.refreshToken, {
      publicKey: this.config.get('RT_SECRET'),
    });

    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(
      refreshTokenInput.id,
      user.email,
      user.role,
      user.isVerified,
    );
    await this.userService.updateRefreshToken({
      id: refreshTokenInput.id,
      refreshToken: tokens.refresh_token,
    });

    return tokens;
  }

  async getRtToken(jwtPayload: JwtPayload) {
    return await this.jwtService.signAsync(jwtPayload, {
      secret: this.config.get<string>('RT_SECRET'),
      expiresIn: '30m',
    });
  }

  async getAtToken(jwtPayload: JwtPayload) {
    return await this.jwtService.signAsync(jwtPayload, {
      secret: this.config.get<string>('AT_SECRET'),
      expiresIn: '15d',
    });
  }

  async getTokens(
    userId: number,
    email: string,
    role: Role,
    isVerified: boolean,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email,
      role,
      isVerified,
    };

    const [at, rt] = await Promise.all([
      this.getAtToken(jwtPayload),
      this.getRtToken(jwtPayload),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
