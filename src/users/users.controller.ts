import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Post('delete-all')
    deleteAll() {
        return this.usersService.deleteAll();
    }

    @HttpCode(HttpStatus.OK)
    @Post('ids')
    findByIds(@Body('ids') ids: string[]) {
        return this.usersService.findByIds(ids);
    }

    @HttpCode(HttpStatus.OK)
    @Post('find/emails')
    findByEmails(@Body('emails') emails: string[]) {
        return this.usersService.findByEmails(emails);
    }
}
