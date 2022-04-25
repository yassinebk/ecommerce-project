import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user';
import { VerificationTokenPayload } from './dto/VerificationTokenPayload';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private userService: UserService,
  ) {}

  public sendVerificationEmail(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('VERIFICATION_TOKEN_SECRET'),
      expiresIn: 60 * 60 * 2,
    });
    const url = `${this.configService.get('CONFIRMATION_URL')}?token=${token}`;

    const text = `Welcome to E-Commerce By Yassine Belkhadem. To confirm your email click on the following link below
        ${url}
        `;
    return this.emailService.sendEmail({
      to: email,
      subject: 'E-Commerce full: Email Verification',
      text,
    });
  }

  async confirmEmail(token: string) {
    const verificationRes = await this.jwtService.verify(token, {
      secret: this.configService.get('VERIFICATION_TOKEN_SECRET'),
    });
    if (verificationRes) {
      const res = (await this.jwtService.decode(
        token,
      )) as VerificationTokenPayload;
      return this.userService.verifyUser(res.email);
    }
  }
}
