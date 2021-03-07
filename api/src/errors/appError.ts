export class appError {
    public readonly message: string
    public readonly errorStatus: number

    constructor(message?: string, errorStatus = 400) {
        this.message = message;
        this.errorStatus = errorStatus;
    }
}