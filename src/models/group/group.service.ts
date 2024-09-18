import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Group } from "./entities/group.entity";
import { Model } from "mongoose";

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name)
    private readonly groupRepository: Model<Group>,
  ) {}

  async getById(id: string): Promise<Group> {
    return this.groupRepository.findOne({ id }).select('-_id');
  }

  async addSurveyToGroup(groupId: string, surveyId: string): Promise<Group> {
    return this.groupRepository.findOneAndUpdate({ groupId }, { $push: { surveys: surveyId } }, { new: true });
  }

  async removeSurveyFromGroup(groupId: string, surveyId: string): Promise<Group> {
    return this.groupRepository.findOneAndUpdate({ groupId }, { $pull: { surveys: surveyId } }, { new: true });
  }

  async deleteAllSurveys(id: string): Promise<Group> {
    return this.groupRepository.findOneAndUpdate({ id }, { surveys: [] }, { new: true });
  }
}