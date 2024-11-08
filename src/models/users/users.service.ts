import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) {}

    async find() {
        return this.userModel.find();
    }

    async findOne(id: string) {
        const user = await this.userModel
            .findById(id)
            .populate("company", "id name logo")
            .lean();

        if(!user) {
            throw new NotFoundException(`User with id ${id} not found!`);
        }

        return user;
    }

    async findByEmail(email: string) {
        const user = await this.userModel.findOne({ email });
        
        if(!user) {
            throw new NotFoundException(`User with email ${email} not found!`);
        }

        return user;
    }

    async changePassword(id: string, password: string) {
        const user = await this.findOne(id);

        const newUser = Object.assign(user, {
            password
        });

        await this.userModel.updateOne({ _id: id }, newUser);

        return newUser;
    }
}
