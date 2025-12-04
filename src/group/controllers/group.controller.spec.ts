import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from './group.controller';
import { GroupService } from '../services/group.service';
import {
  GroupType,
  GroupStatus,
  GroupVisibility,
  MembershipApprovalType,
} from '@prisma/client';
import { CreateGroupDto } from '../dto/group.dto';

describe('GroupController', () => {
  let controller: GroupController;

  const mockGroupService = {
    createGroup: jest.fn(),
    findAllGroups: jest.fn(),
    findGroupById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [
        {
          provide: GroupService,
          useValue: mockGroupService,
        },
      ],
    }).compile();

    controller = module.get<GroupController>(GroupController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createGroup', () => {
    it('should create a new group', async () => {
      const createGroupDto: CreateGroupDto = {
        name: 'New School',
        description: 'A new school group',
        type: GroupType.PUBLIC,
        status: GroupStatus.ACTIVE,
        visibility: GroupVisibility.HIDDEN,
        membershipApproval: MembershipApprovalType.AUTOMATIC,
      };

      const mockCreatedGroup = {
        id: 'group-1',
        ...createGroupDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockGroupService.createGroup.mockResolvedValue(mockCreatedGroup);

      const result = await controller.createGroup(createGroupDto);

      expect(result).toEqual(mockCreatedGroup);
      expect(mockGroupService.createGroup).toHaveBeenCalledWith(
        createGroupDto,
        expect.any(String), // creatorUserId - currently hardcoded
      );
    });
  });
});
