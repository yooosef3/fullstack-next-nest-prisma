import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { dirname, join } from 'path';

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(UsersModule);
    app.enableCors({
      origin: 'http://localhost:3000',
    })
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'servers/email-templates'))
    app.setViewEngine('ejs')
    
    const port = Number(process.env.PORT) || 4001;
    
    try {
      await app.listen(port);
      console.log(`Application is running on: http://localhost:${port}`);
    } catch (error) {
      if (error.code === 'EADDRINUSE') {
        // Try next available port
        const nextPort = port + 1;
        await app.listen(nextPort);
        console.log(`Port ${port} was in use, using port ${nextPort} instead`);
        console.log(`Application is running on: http://localhost:${nextPort}`);
      } else {
        throw error;
      }
    }

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (error) {
    console.error('Error starting the application:', error);
    process.exit(1);
  }
}

bootstrap();