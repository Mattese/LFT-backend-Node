import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GroupService } from '../services/group.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateGroupDto } from '../dto/group.dto';
import { Group } from '@prisma/client';
import {
  ApiCommonResponses,
  ApiCreatedResponse,
} from '../../common/decorators/api-responses.decorator';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new group' })
  @ApiBody({ type: CreateGroupDto })
  @ApiCreatedResponse('Group successfully created')
  @ApiCommonResponses()
  async createGroup(
    @Body() createGroupDto: CreateGroupDto,
    // TODO: Replace with @CurrentUser() decorator when auth is implemented
  ): Promise<Group> {
    // TEMPORARY: Hardcoded user ID - replace with authenticated user
    const creatorUserId = 'cmiozm5km00004wh57hpwij6h'; // Get existing user ID from your DB
    return this.groupService.createGroup(createGroupDto, creatorUserId);
  }
}
