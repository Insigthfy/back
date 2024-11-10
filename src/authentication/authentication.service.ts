import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { SignInDto, SignUpDto } from './dto/login.dto';
import { User } from 'src/models/users/entities/user.entity';
import { hashPassword } from 'src/common/utils/hash';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDto) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      access_token: await this.jwtService.signAsync({
        id: user._id,
        company: user.company
      }),
    };
  }

  async signUp({ name, email, password, company }: SignUpDto) {
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new UnauthorizedException('email already taken');
    }

    const hashedPassword = await hashPassword(password);

    if (hashedPassword) {
      const newUser = new this.userModel({
        name,
        email,
        password: hashedPassword,
        company,
      });

      await newUser.save();

      return {
        access_token: await this.jwtService.signAsync({
          id: newUser._id,
          company: newUser.company
        }),
      };
    }
  }
}
