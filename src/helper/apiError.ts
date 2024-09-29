// @desc this class is responsible about operation errors (errors that i can predict)
class ApiError extends Error{
    statusCode: number;
    status: string;
    isOperational: boolean;
    constructor(message:string, statusCode:number) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
    }
}

export default ApiError;