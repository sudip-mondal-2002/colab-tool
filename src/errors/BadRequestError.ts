import {CustomError} from './CustomError';

export class BadRequestError extends CustomError {
    readonly statusCode = 400;
    constructor(message: string) {
        super(message);
    }
}

