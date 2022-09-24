import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(payload: object) {
    return new this.userModel(payload).save();
  }

  async findAll(filter: object) {
    return this.userModel.find(filter).select('-password');
  }

  async findOne(filter: object) {
    return this.userModel.findOne(filter);
  }

  async update(filter: object, update: object) {
    return this.userModel.updateOne(filter, update);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
