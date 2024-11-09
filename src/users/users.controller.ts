import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Request,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiConsumes,
    ApiBody,
} from '@nestjs/swagger';
import { User } from './schema/user.schema';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({
        status: 200,
        description: 'Returns all users',
        type: [User],
    })
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @ApiOperation({ summary: 'Delete all users' })
    @ApiResponse({ status: 200, description: 'All users deleted' })
    @Post('delete-all')
    deleteAll() {
        return this.usersService.deleteAll();
    }

    @ApiOperation({ summary: 'Find users by IDs' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                ids: {
                    type: 'array',
                    items: { type: 'string' },
                    example: [
                        '507f1f77bcf86cd799439011',
                        '507f1f77bcf86cd799439012',
                    ],
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Returns users matching the provided IDs',
        type: [User],
    })
    @HttpCode(HttpStatus.OK)
    @Post('ids')
    findByIds(@Body('ids') ids: string[]) {
        return this.usersService.findByIds(ids);
    }

    @ApiOperation({ summary: 'Find users by emails' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                emails: {
                    type: 'array',
                    items: { type: 'string' },
                    example: ['user1@example.com', 'user2@example.com'],
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Returns users matching the provided emails',
        type: [User],
    })
    @HttpCode(HttpStatus.OK)
    @Post('find/emails')
    findByEmails(@Body('emails') emails: string[]) {
        return this.usersService.findByEmails(emails);
    }

    @ApiOperation({ summary: 'Update user profile' })
    @ApiBearerAuth('JWT-auth')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: UpdateUserDto,
        schema: {
            type: 'object',
            properties: {
                displayName: { type: 'string', example: 'John Doe' },
                password: { type: 'string', example: 'newpassword123' },
                email: { type: 'string', example: 'newemail@example.com' },
                avatar: {
                    type: 'string',
                    format: 'binary',
                    description: 'User avatar image',
                },
            },
        },
    })
    @ApiResponse({
        status: 200,
        description: 'User profile updated successfully',
        type: User,
    })
    @HttpCode(HttpStatus.OK)
    @Patch('update')
    @UseInterceptors(FileInterceptor('avatar'))
    async update(
        @Request() req: any,
        @Body() body: any,
        @UploadedFile() avatar?: Express.Multer.File,
    ) {
        const updateUserDto: UpdateUserDto = {
            displayName: body.displayName,
            password: body.password,
            email: body.email,
        };

        return this.usersService.update(req.user._id, updateUserDto, avatar);
    }
}
