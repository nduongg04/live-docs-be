import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
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
}
