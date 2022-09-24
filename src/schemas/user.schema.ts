import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hashPass } from 'src/helpers/bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: [true, 'Email required'],
    unique: true,
  })
  email: string;

  @Prop({
    required: [true, 'Password required'],
    set: (v: any) => hashPass(v),
  })
  password: string;

  @Prop({
    required: [true, 'Role required'],
    enum: { values: ['staff', 'customer'], message: 'Invalid role input' },
  })
  role: string;

  @Prop({
    required: [true, 'Status required'],
    enum: {
      values: ['pending', 'approved', 'rejected'],
      message: 'Invalid status input',
    },
  })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
