import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsDateString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Sex } from '../enums/sex.enum';
import { User } from '../entities/user.entity';

export class UserDto {
  @IsNotEmpty({ message: 'First name is required' })
  @IsString()
  @MinLength(1, { message: 'First name must be between 1 and 50 characters' })
  @MaxLength(50, { message: 'First name must be between 1 and 50 characters' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString()
  @MinLength(1, { message: 'Last name must be between 1 and 50 characters' })
  @MaxLength(50, { message: 'Last name must be between 1 and 50 characters' })
  lastName: string;

  @IsNotEmpty({ message: 'Date of birth is required' })
  @IsDateString({}, { message: 'Date of birth must be a valid date' })
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  @MaxLength(30, { message: 'Nickname cannot exceed 30 characters' })
  nickName?: string;

  @IsNotEmpty({ message: 'Sex is required' })
  @IsEnum(Sex, { message: 'Sex must be either MALE or FEMALE' })
  sex: Sex;

  constructor(
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    nickName: string | null | undefined,
    sex: Sex,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.nickName = nickName ?? undefined;
    this.sex = sex;
  }

  // Static factory method: Entity → DTO
  static from(user: User): UserDto | null {
    if (!user) return null;

    const dateOfBirth =
      user.dateOfBirth instanceof Date
        ? user.dateOfBirth.toISOString().split('T')[0]
        : user.dateOfBirth;

    return new UserDto(
      user.firstName,
      user.lastName,
      dateOfBirth,
      user.nickName,
      user.sex,
    );
  }

  // Convert DTO → Entity
  toEntity(): User {
    const user = new User();
    user.firstName = this.firstName;
    user.lastName = this.lastName;
    user.dateOfBirth = new Date(this.dateOfBirth);
    user.nickName = this.nickName ?? null;
    user.sex = this.sex;
    return user;
  }
}
