import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from './group.service';
import { PrismaService } from '../../prisma';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import {
  GroupType,
  GroupStatus,
  GroupVisibility,
  MembershipApprovalType,
  MembershipRole,
} from '@prisma/client';
import { CreateGroupDto } from '../dto/group.dto';

describe('GroupService', () => {
  let service: GroupService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaClient>(),
        },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllGroups', () => {
    it('should return an array of groups', async () => {
      const mockGroups = [
        {
          id: 'group-1',
          name: 'Test School',
          description: 'A test school group',
          type: GroupType.PRIVATE,
          status: GroupStatus.ACTIVE,
          visibility: GroupVisibility.HIDDEN,
          membershipApproval: MembershipApprovalType.AUTOMATIC,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'group-2',
          name: 'Test Club',
          description: 'A test club group',
          type: GroupType.PRIVATE,
          status: GroupStatus.ACTIVE,
          visibility: GroupVisibility.HIDDEN,
          membershipApproval: MembershipApprovalType.MANUAL,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      prisma.group.findMany.mockResolvedValue(mockGroups);

      const result = await service.findAllGroups();

      expect(result).toEqual(mockGroups);
      expect(prisma.group.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no groups exist', async () => {
      prisma.group.findMany.mockResolvedValue([]);

      const result = await service.findAllGroups();

      expect(result).toEqual([]);
      expect(prisma.group.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findGroupById', () => {
    it('should return a group by id', async () => {
      const mockGroup = {
        id: 'group-1',
        name: 'Test School',
        description: 'A test school group',
        type: GroupType.PRIVATE,
        status: GroupStatus.ACTIVE,
        visibility: GroupVisibility.HIDDEN,
        membershipApproval: MembershipApprovalType.AUTOMATIC,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.group.findUnique.mockResolvedValue(mockGroup);

      const result = await service.findGroupById(mockGroup.id);

      expect(result).toEqual(mockGroup);
      expect(prisma.group.findUnique).toHaveBeenCalledWith({
        where: { id: mockGroup.id },
      });
    });

    it('should return null when group is not found', async () => {
      const nonExistentId = 'non-existent-id';
      prisma.group.findUnique.mockResolvedValue(null);

      const result = await service.findGroupById(nonExistentId);

      expect(result).toBeNull();
      expect(prisma.group.findUnique).toHaveBeenCalledWith({
        where: { id: nonExistentId },
      });
    });
  });

  describe('createGroup', () => {
    it('should create a group with creator as OWNER member', async () => {
      const createGroupDto: CreateGroupDto = {
        name: 'New School',
        description: 'A new school group',
        type: GroupType.PRIVATE,
        status: GroupStatus.ACTIVE,
        visibility: GroupVisibility.HIDDEN,
        membershipApproval: MembershipApprovalType.AUTOMATIC,
      };

      const creatorUserId = 'user-1';

      const mockCreatedGroup = {
        id: 'group-1',
        ...createGroupDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        memberships: [
          {
            userId: creatorUserId,
            groupId: 'group-1',
            role: MembershipRole.OWNER,
            status: 'ACTIVE',
            visibility: 'PUBLIC',
            invitationStatus: 'ACCEPTED',
            joinedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      };

      prisma.group.create.mockResolvedValue(mockCreatedGroup);

      const result = await service.createGroup(createGroupDto, creatorUserId);

      expect(result).toEqual(mockCreatedGroup);
      expect(prisma.group.create).toHaveBeenCalledWith({
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
    });

    it('should handle different group types', async () => {
      const groupTypes = [GroupType.PRIVATE, GroupType.PUBLIC];

      for (const type of groupTypes) {
        const createGroupDto: CreateGroupDto = {
          name: 'Test Group',
          description: 'A test group',
          type,
          status: GroupStatus.ACTIVE,
          visibility: GroupVisibility.HIDDEN,
          membershipApproval: MembershipApprovalType.AUTOMATIC,
        };

        const creatorUserId = 'user-1';

        const mockCreatedGroup = {
          id: `group-${type}`,
          ...createGroupDto,
          createdAt: new Date(),
          updatedAt: new Date(),
          memberships: [],
        };

        prisma.group.create.mockResolvedValue(mockCreatedGroup);

        const result = await service.createGroup(createGroupDto, creatorUserId);

        expect(result.type).toEqual(type);
      }
    });
  });
});
