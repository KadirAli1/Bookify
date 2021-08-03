import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as Express from 'express';

import admin, { ServiceAccount } from 'firebase-admin';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './common/nestjs/filters/all-exceptions.filter';
import { ValidationPipe } from './common/nestjs/pipes/validation.pipe';
import { AuthMiddleware } from './common/nestjs/middlewares/auth.middleware';

import * as moment from 'moment';

moment.locale('en');
moment.updateLocale('en', { week: { dow: 1 } }); //first day of week is Monday

const server = Express();
server.get('/', (req, res) => res.send('ok'));
server.get('/_ah/health', (req, res) => res.send('ok'));
server.get('/status', (req, res) => res.status(204).send());

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.DailyRotateFile({
          filename: 'logs/errors/errors-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '5m',
          maxFiles: '10',
          level: 'error',
          format: winston.format.json(),
        }),
        new winston.transports.DailyRotateFile({
          filename: 'logs/info/info-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '5m',
          maxFiles: '10',
          level: 'warn',
          format: winston.format.json(),
        }),
        new winston.transports.Console({ format: utilities.format.nestLike() }),
      ],
    }),
  });

  app.setGlobalPrefix('api');

  //  enable cors so that we can web and mobile can communicate with this API
  app.enableCors();

  //  setup custom Logger
  const customLogger = app.get<Logger>(Logger);

  //  register the authentication middleware
  app.use(AuthMiddleware);

  //  registers the default exceptions filter
  app.useGlobalFilters(new AllExceptionsFilter(customLogger));

  //  set validation for all DTO's
  app.useGlobalPipes(new ValidationPipe());

  //  initialize firebase admin
  initializeFirebase();

  const PORT = Number(process.env.PORT) || 3000;
  await app.listen(PORT);
}
bootstrap();

const initializeFirebase = () => {
  const firebaseConfig = {
    project_id: process.env.FIREBASE_PROJECT_ID,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    type: process.env.FIREBASE_TYPE,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_X509_CERT_URL,
  };

  const serviceAccount: ServiceAccount = {
    projectId: firebaseConfig.project_id,
    clientEmail: firebaseConfig.client_email,
    privateKey: firebaseConfig.private_key,
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
};
