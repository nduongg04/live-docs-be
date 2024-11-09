import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export type UserWithId = User & { _id: Types.ObjectId };
export type UserJwtDto = Pick<UserWithId, 'email' | '_id'>;
export type UserWithoutPassword = Omit<UserWithId, 'password'>;

@Schema()
export class User {
    @ApiProperty({
        example: '507f1f77bcf86cd799439011',
        description: 'The unique identifier of the user',
        type: String,
    })
    _id: Types.ObjectId;

    @ApiProperty({
        example: 'user@example.com',
        description: 'The email address of the user'
    })
    @Prop({
        required: [true, 'Email is required'],
        unique: true,
    })
    email: string;

    @Prop({
        default: '',
    })
    password: string;

    @ApiProperty({
        example: 'John Doe',
        description: 'The display name of the user'
    })
    @Prop()
    displayName: string;

    @ApiProperty({
        example: 'https://example.com/avatar.jpg',
        description: 'The URL of the user\'s avatar'
    })
    @Prop()
    avatar: string;

    @ApiProperty({
        example: 'acc_123456',
        description: 'The account ID associated with the user'
    })
    @Prop()
    accountId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
