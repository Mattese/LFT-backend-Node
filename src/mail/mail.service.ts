import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(): Promise<void> {
    await this.mailerService.sendMail({
      to: 'reichlm1@gmail.com',
      from: 'test@mailinator.com',
      subject: 'testing Nest mailerModule',

      template: `${__dirname}/index`,
    });
  }

  async sendWelcomeEmail(email: string, firstName: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to LFT App!',
      template: 'welcome',
      context: {
        firstName,
        year: new Date().getFullYear(),
      },
    });
  }
}
