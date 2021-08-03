import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  LoggerService,
  Inject,
} from '@nestjs/common';
import { CustomException } from '../exceptions/CustomException';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'An error occurred!';

    if (exception instanceof CustomException) {
      const errorResponse: any = exception.getResponse();
      status = errorResponse.statusCode;
      message = {
        code: errorResponse.code,
        message: errorResponse.message,
      };
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }

    const responseObject = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    };

    //  log the error
    this.logger.error(responseObject);

    //  send error as response to the request.
    response.status(status).json(responseObject);
  }
}
