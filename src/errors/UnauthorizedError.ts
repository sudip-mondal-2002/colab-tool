import {CustomError} from "@/errors/CustomError";

export class UnauthorizedError extends CustomError {
    readonly statusCode = 401;
    constructor(message:string) {
        super(message);
    }
}
