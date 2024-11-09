import { Types } from "mongoose";
import { User } from '../schema/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
    @ApiProperty({
        example: 'google',
        description: 'The provider of the account',
    })
    provider: string;

    @ApiProperty({
        example: '1234567890',
        description: 'The provider account ID',
    })
    providerAccountId: string;

    @ApiProperty({
        example: 'google',
        description: 'The type of the account',
    })
    type: string;

    @ApiProperty({
        type: User,
        description: 'The user object',
    })
    user: Omit<User, 'accountId'> & { _id: Types.ObjectId };
}
