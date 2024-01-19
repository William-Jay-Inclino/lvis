import { NestFactory } from '@nestjs/core';
import { WarehouseModule } from './warehouse.module';

async function bootstrap() {
  const app = await NestFactory.create(WarehouseModule);
  await app.listen(4002);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
