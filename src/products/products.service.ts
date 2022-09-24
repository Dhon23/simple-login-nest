import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(payload: object) {
    return new this.productModel(payload).save();
  }

  async findAll() {
    return this.productModel.find();
  }

  async findOne(filter: object) {
    return this.productModel.findOne(filter);
  }

  async update(filter: object, payload: object) {
    return this.productModel.updateOne(filter, payload);
  }

  async remove(filter: object) {
    return this.productModel.deleteOne(filter);
  }
}
