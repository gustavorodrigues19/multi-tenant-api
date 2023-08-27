// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'https://localhost:3333',
  })
  await app.listen(process.env.PORT || 8080)
}
bootstrap()
