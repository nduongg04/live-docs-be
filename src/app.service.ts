import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return `Go to /api-docs to see the API documentation`;
    }
}
