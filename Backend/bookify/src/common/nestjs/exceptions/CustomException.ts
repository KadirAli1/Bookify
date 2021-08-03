import { NotFoundException } from '@nestjs/common';

export class CustomException extends NotFoundException {
  constructor(error?: string | object | any, description?: string) {
    super(error, description);
  }
}
