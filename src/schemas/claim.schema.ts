import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClaimDocument = Claim & Document;

@Schema()
export class Claim {
  @Prop({ required: [true, 'Name required'] })
  userEmail: string;

  @Prop({ required: [true, 'Name required'] })
  productId: string;

  @Prop({
    required: [true, 'Status required'],
    enum: {
      values: ['pending', 'approved', 'rejected'],
      message: 'Invalid status input',
    },
  })
  status: string;
}

export const ClaimSchema = SchemaFactory.createForClass(Claim);
