import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { HttpExceptionFilter } from "./shared/http-exception.filter";

async function sardor() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Users example")
    .setDescription("The users API description")
    .addBearerAuth()
    .setVersion("1.4.1")
    .addTag("users")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("sardor", app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

<<<<<<< HEAD
  app.useGlobalFilters(new HttpExceptionFilter());
=======
  // app.useGlobalFilters(new HttpExceptionFilter());
>>>>>>> 44051d48b0af79751ebf9b2d2082fde7ba78b24c
  app.use(helmet());
  await app.listen(3000);
}
void sardor();
