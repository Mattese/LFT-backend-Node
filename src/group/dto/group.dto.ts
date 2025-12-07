import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  GroupStatus,
  GroupType,
  GroupVisibility,
  MembershipApprovalType,
} from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ description: 'Group name', example: 'My lovely group' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @ApiPropertyOptional({
    description: 'Group description',
    example: 'This is a description about the group',
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional({
    message: 'Description can be omitted, but if provided, must be a string',
  })
  description: string;

  @ApiProperty({
    description: 'Group type',
    enum: GroupType,
    example: GroupType.PRIVATE,
  })
  @IsEnum(GroupType, {
    message: 'Type must be one of: ' + Object.values(GroupType).join(', '),
  })
  @IsNotEmpty({ message: 'Type is required' })
  type: GroupType;

  @ApiProperty({
    description: 'Group status',
    enum: GroupStatus,
    example: GroupStatus.ACTIVE,
  })
  @IsEnum(GroupStatus, {
    message: 'Status must be one of: ' + Object.values(GroupStatus).join(', '),
  })
  @IsNotEmpty({ message: 'Status is required' })
  status: GroupStatus;

  @ApiProperty({
    description: 'Group visibility',
    enum: GroupVisibility,
    example: GroupVisibility.VISIBLE,
  })
  @IsEnum(GroupVisibility, {
    message:
      'Group visibility must be one of: ' +
      Object.values(GroupVisibility).join(', '),
  })
  @IsNotEmpty({ message: 'Visibility is required' })
  visibility: GroupVisibility;

  @ApiProperty({
    description: 'Membership approval type',
    enum: MembershipApprovalType,
    example: MembershipApprovalType.MANUAL,
  })
  @IsEnum(MembershipApprovalType, {
    message: 'Membership approval type must be one of: ' + Object.values(MembershipApprovalType).join(', '),
  })
  @IsNotEmpty({ message: 'Membership approval type is required' })
  membershipApproval: MembershipApprovalType;
}
