import { Injectable } from '@nestjs/common';
import { Group, MembershipRole, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { CreateGroupDto } from '../dto/group.dto';

type UserId = Prisma.UserGetPayload<{ select: { id: true } }>['id'];

// copilot:disable
@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async findAllGroups(): Promise<Group[]> {
    return this.prisma.group.findMany();
  }

  async findGroupById(id: string): Promise<Group | null> {
    return this.prisma.group.findUnique({ where: { id } });
  }

  async createGroup(
    createGroupDto: CreateGroupDto,
    creatorUserId: UserId,
  ): Promise<Group> {
    return this.prisma.group.create({
      data: {
        name: createGroupDto.name,
        description: createGroupDto.description,
        type: createGroupDto.type,
        status: createGroupDto.status,
        visibility: createGroupDto.visibility,
        membershipApproval: createGroupDto.membershipApproval,
        memberships: {
          create: {
            userId: creatorUserId,
            role: MembershipRole.OWNER,
          },
        },
      },
      include: {
        memberships: true,
      },
    });
  }
}
