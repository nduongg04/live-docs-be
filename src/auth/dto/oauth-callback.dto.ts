import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OAuthCallbackDto {
    @ApiProperty({
        example: 'ya29.a0AfB_byC...',
        description: 'OAuth access token'
    })
    @IsString()
    @IsNotEmpty()
    accessToken: string;

    @ApiProperty({
        example: 'eyJhbGciOiJSUzI1...',
        description: 'OAuth ID token',
        required: false
    })
    @IsString()
    idToken?: string;

    @ApiProperty({
        example: 'google',
        description: 'OAuth provider name'
    })
    @IsString()
    @IsNotEmpty()
    provider: string;

    @ApiProperty({
        example: {
            id: '12345',
            displayName: 'John Doe',
            emails: [{ value: 'john@example.com' }],
            photos: [{ value: 'https://example.com/photo.jpg' }]
        },
        description: 'OAuth provider profile data'
    })
    @IsObject()
    @IsNotEmpty()
    profile: any;
}
