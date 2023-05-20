import { HttpException, HttpStatus } from '@nestjs/common';

export class RecordNotFound extends HttpException {
    constructor(record: string) {
        super(`${record} not found!`, HttpStatus.NOT_FOUND);
    }
}

export class InvalidCredentials extends HttpException {
    constructor() {
        super('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
}
