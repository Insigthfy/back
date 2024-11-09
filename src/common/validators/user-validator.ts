import { Injectable, NotFoundException } from "@nestjs/common";
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationOptions,
    registerDecorator
} from "class-validator";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/models/users/entities/user.entity";

@ValidatorConstraint({ async: true })
@Injectable()
export class UserConstraint implements ValidatorConstraintInterface {
    constructor(
        @InjectModel(User.name)
        private readonly usersRepository: Model<User>
    ) {}

    async validate(id: string): Promise<boolean> {
        try {
            const user = await this.usersRepository.findOne({ _id: id });

            if (!user) {
                throw new NotFoundException("Usuário não encontrado");
            }

            return false;
        }
        catch (err) {
            return true;
        }
    }
}

export function UserExists(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: "UserExists",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: UserConstraint,
        });
    };
}