import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Sex } from '@prisma/client';

export class CreateUserDto {
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @IsDateString({}, { message: 'Date of birth must be a valid date' })
  @IsNotEmpty({ message: 'Date of birth is required' })
  dateOfBirth: string;

  @IsString({ message: 'Nickname must be a string' })
  @IsOptional()
  nickName?: string;

  @IsEnum(Sex, {
    message: 'Sex must be one of: ' + Object.values(Sex).join(', '),
  })
  @IsNotEmpty({ message: 'Sex is required' })
  sex: Sex;
}
