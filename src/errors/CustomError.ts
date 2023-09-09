export abstract class CustomError extends Error {
    abstract readonly statusCode: number;
    protected constructor(message:string) {
        super(message);
    }
}

