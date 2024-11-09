import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Request,
    UploadedFile,
    UseFilters,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOperation,
    ApiResponse,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { DuplicateExceptionFilter } from 'src/exception_filters/email-mongo-exception.filter';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from '../decorators/public-auth.decorator';
import { AuthService } from './auth.service';
import { OAuthCallbackDto } from './dto/oauth-callback.dto';
import { GoogleAuthGuard } from './guards/google.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ summary: 'User login' })
    @ApiResponse({
        status: 200,
        description: 'Returns JWT tokens and user info',
        content: {
            'application/json': {
                schema: {
                    properties: {
                        access_token: { type: 'string' },
                        refresh_token: { type: 'string' },
                        user: {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                email: { type: 'string' },
                                displayName: { type: 'string' },
                                avatar: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Post('login')
    @Public()
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @ApiOperation({ summary: 'Register new user' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', example: 'user@example.com' },
                password: { type: 'string', example: 'password123' },
                displayName: { type: 'string', example: 'John Doe' },
                avatar: {
                    type: 'string',
                    format: 'binary',
                    description: 'User avatar image',
                },
            },
            required: ['email', 'password', 'displayName'],
        },
    })
    @ApiResponse({
        status: 201,
        description: 'User successfully registered',
        schema: {
            example: {
                user: {
                    _id: '507f1f77bcf86cd799439011',
                    email: 'user@example.com',
                    displayName: 'John Doe',
                    avatar: 'https://example.com/avatar.jpg',
                },
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @Post('register')
    @Public()
    @UseFilters(DuplicateExceptionFilter)
    @UseInterceptors(FileInterceptor('avatar'))
    async register(@Body() body, @UploadedFile() avatar?: Express.Multer.File) {
        const createUserDto: CreateUserDto = {
            email: body.email,
            displayName: body.displayName,
            password: body.password,
        };
        if (
            !createUserDto.email ||
            !createUserDto.password ||
            !createUserDto.displayName
        ) {
            throw new BadRequestException(
                'Email, password and displayName are required',
            );
        }
        return this.authService.register(createUserDto, avatar);
    }

    @ApiOperation({ summary: 'Get user profile' })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({
        status: 200,
        description: 'Returns user profile',
        schema: {
            example: {
                _id: '507f1f77bcf86cd799439011',
                email: 'user@example.com',
                displayName: 'John Doe',
                avatar: 'https://example.com/avatar.jpg',
            },
        },
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Get('profile')
    async profile(@Request() req) {
        return req.user;
    }

    @ApiOperation({ summary: 'Initiate Google OAuth login' })
    @ApiResponse({
        status: 302,
        description: 'Redirects to Google login page',
    })
    @Get('google/login')
    @Public()
    @UseGuards(GoogleAuthGuard)
    async googleLogin() {}

    @ApiOperation({ summary: 'Handle Google OAuth callback' })
    @ApiBody({ type: OAuthCallbackDto })
    @ApiResponse({
        status: 200,
        description: 'Returns JWT tokens and user info',
        schema: {
            example: {
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                user: {
                    _id: '507f1f77bcf86cd799439011',
                    email: 'user@example.com',
                    displayName: 'John Doe',
                    avatar: 'https://example.com/avatar.jpg',
                },
            },
        },
    })
    @Post('google/callback')
    @Public()
    async googleCallback(@Body() oauthCallbackDto: OAuthCallbackDto) {
        const returnedValue = await this.authService.validateOAuthLogin(
            oauthCallbackDto.profile,
            oauthCallbackDto.provider,
        );
        return returnedValue;
    }

    @ApiOperation({ summary: 'Refresh access token' })
    @ApiBearerAuth('JWT-auth')
    @ApiResponse({
        status: 200,
        description: 'Returns new access token',
        schema: {
            example: {
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
        },
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Post('refresh')
    @Public()
    @UseGuards(JwtRefreshAuthGuard)
    async refresh(@Request() req) {
        return {
            access_token: await this.authService.generateAccessToken(req.user),
        };
    }
}
