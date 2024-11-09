import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'The email address of the user',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password123',
        description: 'The password for the account',
    })
    @IsString()
    password: string;

    @ApiProperty({
        example: 'John Doe',
        description: 'The display name of the user',
    })
    @IsString()
    displayName: string;
}
