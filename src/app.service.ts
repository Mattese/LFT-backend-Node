import { Injectable } from '@nestjs/common';
import { MailService } from './mail/mail.service';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailService) {}

  async getHello(): Promise<string> {
    await this.mailService.sendWelcomeEmail('reichlm1@gmail.com', 'Martin');
    console.log('Welcome email sent');
    return 'Hello World!';
  }
}
