import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './services/user.services';
import { User } from './entities/user.entity';
import type CreateUserDto from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}
  @Post()
  @Header('Content-Type', 'application/json')
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log('Creating user:', createUserDto);
    return 'Creating user endpoint - to be implemented';
  }

  // TODO: Define POST, DELETE, PATCH
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): User | null {
    return this.usersService.findById(id);
  }
}
