import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({
        example: 'John Doe',
        description: 'The display name of the user',
    })
    displayName?: string;

    @ApiProperty({
        example: 'password123',
        description: 'The password for the account',
    })
    password?: string;

    @ApiProperty({
        example: 'user@example.com',
        description: 'The email address of the user',
    })
    email?: string;
}
