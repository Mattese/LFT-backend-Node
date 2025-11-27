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
  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
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
}
