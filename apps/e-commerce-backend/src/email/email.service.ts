import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sg from '@sendgrid/mail';

type EmailOptions = {
  text: string;
  subject: string;
  to: string;
  from?: string;
  html?: string;
};

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {
    sg.setApiKey(this.configService.get('SENDGRID_API_KEY'));
  }

  sendEmail(options: EmailOptions) {
    return (
      sg
        // .send({ from: this.configService.get('VERIFIED_SENDER'), ...options })
        .send({
          to: 'test@example.com', // Change to your recipient
          from: this.configService.get('VERIFIED_SENDER'), // Change to your verified sender
          subject: 'Sending with SendGrid is Fun',
          text: 'and easy to do anywhere, even with Node.js',
          html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        })
        .then(() => {
          console.log('Email sent');
        })
        .catch((error) => {
          console.error(error.response.body);
        })
    );
  }
}
