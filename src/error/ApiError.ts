import {Response} from 'express';

import {
    AuthFailureResponse,
    NotFoundResponse,
    InternalErrorResponse  
} from './ApiResponse';

export enum ErrorType {
    BAD_TOKEN = 'BadTokenError',
    TOKEN_EXPIRED = 'TokenExpiredError',
    UNAUTHORIZED = 'AuthFailureError',
    ACCESS_TOKEN =  'AccessTokenError',
    INTERNAL = 'InternalError',
    NOT_FOUND = 'NotFoundError', 
    NO_ENTRY = 'NoEntryError',
    NO_DATA = 'NoDataError',
    BAD_REQUEST = 'BadRequestError',
    FORBIDDEN = 'ForBiddenError'
}

export abstract class ApiError extends Error {
    constructor(public type: ErrorType, public message: string = 'error') {
        super(type);
    }

    public static handle(err: ApiError, res: Response): Response {
        switch (err.type) {
            case ErrorType.BAD_TOKEN:
            case ErrorType.TOKEN_EXPIRED:
            case ErrorType.UNAUTHORIZED:
                return new AuthFailureResponse(err.message).send(res);
            
            case ErrorType.NOT_FOUND:
                return new NotFoundResponse(err.message).send(res);
                
            default: {
                let message = err.message;
                return new InternalErrorResponse(message).send(res)
            }    
        }
    }
}

export class NotFoundError extends ApiError {
    constructor(message = 'Not Found') {
        super(ErrorType.NOT_FOUND, message);
    }
}

export class BadRequestError extends ApiError {
    constructor(message = 'Bad Request') {
        super(ErrorType.BAD_REQUEST, message);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message = 'Unauthorized') {
        super(ErrorType.UNAUTHORIZED, message);
    }
}

export class TokenExpiredError extends ApiError {
    constructor(message = "Token is expired!") {
        super(ErrorType.TOKEN_EXPIRED, message);
    }
}

export class BadTokenError extends ApiError {
    constructor(message = 'Token is not invalid' ) {
        super(ErrorType.BAD_TOKEN, message);
    }
}