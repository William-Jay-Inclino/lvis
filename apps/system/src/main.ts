import { NestFactory } from '@nestjs/core';
import { SystemModule } from './system.module';
import { config } from 'dotenv';


async function bootstrap() {

  try {
    config();
  } catch (error) {
    console.error('Error loading .env file');
    console.error(error);
    process.exit(1);
  }

  const app = await NestFactory.create(SystemModule);

  const port = process.env.SYSTEM_PORT || 3000;

  await app.listen(port, async () => {
    console.log(`Running API in NODE ${process.env.NODE_ENV} on ${await app.getUrl()}`);
  });
}

bootstrap();
