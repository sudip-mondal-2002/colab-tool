import {CustomError} from "@/errors/CustomError";

export class NotFoundError extends CustomError {
    readonly statusCode = 404;
    constructor(message:string) {
        super(message);
    }
}
