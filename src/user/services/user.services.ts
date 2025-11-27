import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  findAll(): User[] {
    // Dummy implementation, replace with actual database call
    return [];
  }

  findById(id: number): User | null {
    // Dummy implementation, replace with actual database call
    if (id === 1) {
      const user = new User();
      user.id = 1;
      user.firstName = 'Jmeno';
      user.lastName = 'Prijmeni';
      user.dateOfBirth = new Date('1990-01-01');
      user.nickName = 'testovaci user';
      return user;
    }
    return null;
  }
}
