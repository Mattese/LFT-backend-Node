import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(userId: User['id'], pass: string): Promise<any> {
    const user = await this.userService.findById(userId);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }
}
