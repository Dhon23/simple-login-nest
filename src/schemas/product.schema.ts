import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: [true, 'Name required'] })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: [true, 'Image url required'] })
  imgUrl: string;

  @Prop()
  claimedBy: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
