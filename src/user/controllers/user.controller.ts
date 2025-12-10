import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';
import {
  ApiCommonResponses,
  ApiOkResponse,
  ApiNoContentResponse,
} from '../../common/decorators/api-responses.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse('List of all users')
  @ApiCommonResponses()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiOkResponse('User found')
  @ApiCommonResponses()
  async findById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse('User updated')
  @ApiCommonResponses()
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateUserDto>,
  ): Promise<User | null> {
    return this.usersService.update(id, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', type: String })
  @ApiNoContentResponse('User deleted successfully')
  @ApiCommonResponses()
  async delete(@Param('id') id: string): Promise<void> {
    await this.usersService.delete(id);
  }
}
