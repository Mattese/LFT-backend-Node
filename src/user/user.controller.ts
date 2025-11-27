import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { Sex } from './enums/sex.enum';

@Controller('user')
export class UserController {
  // TODO: Define POST, DELETE, PATCH
  @Get(':id')
  getById(
    @Param('id', ParseIntPipe)
    _id: number,
  ): UserDto | null {
    // Calculate a date 20 years ago
    const date = new Date();
    date.setFullYear(date.getFullYear() - 20);
    const dateOfBirth = date.toISOString().split('T')[0];

    // TODO: change to provide real data
    const userDto = new UserDto(
      'Jmeno',
      'Prijmeni',
      dateOfBirth,
      'testovaci user',
      Sex.MALE,
    );

    const user = userDto.toEntity();
    return UserDto.from(user);
  }
}
