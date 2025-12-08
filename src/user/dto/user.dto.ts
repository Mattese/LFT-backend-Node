import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Sex } from '@prisma/client';

export class CreateUserDto {
  @ApiPropertyOptional({
    description: 'First name of the user',
    example: 'John',
  })
  @IsString({ message: 'First name must be a string' })
  @IsOptional()
  firstName: string;

  @ApiPropertyOptional({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @IsString({ message: 'Last name must be a string' })
  @IsOptional()
  lastName: string;

  @ApiProperty({
    description: 'Date of birth in ISO format',
    example: '1990-01-15',
  })
  @IsDateString({}, { message: 'Date of birth must be a valid date' })
  @IsNotEmpty({ message: 'Date of birth is required' })
  dateOfBirth: string;

  @ApiPropertyOptional({
    description: 'Nickname or preferred name',
    example: 'johnd',
  })
  @IsString({ message: 'Nickname must be a string' })
  @IsOptional()
  nickName?: string;

  @ApiProperty({
    description: 'Gender of the user',
    enum: Sex,
    example: Sex.MALE,
  })
  @IsEnum(Sex, {
    message: 'Sex must be one of: ' + Object.values(Sex).join(', '),
  })
  @IsNotEmpty({ message: 'Sex is required' })
  sex: Sex;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'StrongP@ssw0rd!',
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
