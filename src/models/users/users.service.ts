import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        // @InjectModel(User.name)
        // private readonly userModel: Model<User>
    ) {}

    async find() {
        // return this.userModel.find();
    }
}
