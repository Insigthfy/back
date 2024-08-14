import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./interfaces/user.entity";
import { Room } from "./entities/room.entity";
import { UsersService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ User, Room ])
    ],
    providers: [
        UsersService
    ],
    controllers: [],
    exports: [UsersService]
})
export class UserModule {}