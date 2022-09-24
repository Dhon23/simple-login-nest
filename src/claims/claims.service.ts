import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Claim, ClaimDocument } from 'src/schemas/claim.schema';

@Injectable()
export class ClaimsService {
  constructor(
    @InjectModel(Claim.name) private claimModel: Model<ClaimDocument>,
  ) {}

  async create(payload: object) {
    return new this.claimModel(payload).save();
  }

  async findAll() {
    return this.claimModel.find();
  }

  async update(filter: object, payload: object) {
    return this.claimModel.updateOne(filter, payload);
  }
}
