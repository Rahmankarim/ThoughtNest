export class CustomError extends Error 
{

    private statusCode: number;
    private errorValidation: ErrorValidation[] | null;

    constructor(message:string, statusCode: number, errorValidation: ErrorValidation[] | null = null )
    {
        super(message);
        this.statusCode= statusCode || 500;
        this.errorValidation= errorValidation;
    }

    get HttpStatusCode()
    {
        return this.statusCode;
    }
    get JSON(): ErrorResponse
    {
        return {
            errorMessage: this.message,
            success: false,
            status: this.statusCode,
            errorValidation: this.errorValidation,
        };
    }
}

export type ErrorResponse = {

    status: number;
    errorMessage: string;
    success: boolean;
    errorValidation: ErrorValidation[] | null;
    stack?: string;
};

export type ErrorValidation = { [key:string]:string};