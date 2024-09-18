import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Group } from "./entities/group.entity";
import { GroupsService } from "./group.service";
import { GroupParamsDto } from "./dto/params.dto";

@ApiTags("Groups")
@Controller("v1/groups")
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
  ) {}

  @Get(':id/surveys')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Get all surveys for a group',
  })
  @ApiResponse({
    status: 404,
    description: 'Group not found',
  })
  async getSurveys(@Param() { id }: GroupParamsDto): Promise<Group> {
    return this.groupsService.getById(id);
  }

  @Post(':group_id/surveys/:survey_id')
  @ApiParam({ name: 'group_id', type: String })
  @ApiParam({ name: 'survey_id', type: String })
  async addSurveyToGroup(@Param('group_id') groupId: string, @Param('survey_id') surveyId: string): Promise<Group> {
    return this.groupsService.addSurveyToGroup(groupId, surveyId);
  }

  @Delete(':id/surveys/:survey_id')
  @ApiParam({ name: 'group_id', type: String })
  @ApiParam({ name: 'survey_id', type: String })
  async removeSurveyFromGroup(@Param('group_id') groupId: string, @Param('survey_id') surveyId: string): Promise<Group> {
    return this.groupsService.removeSurveyFromGroup(groupId, surveyId);
  }

  @Delete('delete-all/:id')
  @ApiParam({ name: 'id', type: String })
  async deleteAllSurveys(@Param() { id }: GroupParamsDto): Promise<Group> {
    return this.groupsService.deleteAllSurveys(id);
  }
}