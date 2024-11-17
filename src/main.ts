import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { setupSwagger } from './swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
    app.enableCors({});
    
    // Setup Swagger
    setupSwagger(app);
    const port = process.env.PORT || 4000;
    await app.listen(port);
    console.log(`Server is running on port ${port}`);
}
bootstrap();
