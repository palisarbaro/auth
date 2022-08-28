import { Request, Response, NextFunction } from 'express'

export class ApiError extends Error {
    status: number
    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }
}

export class UserAlreadyExists extends ApiError {
    constructor() {
        super(409, 'User already exists')
    }
}

export class Unauthorized extends ApiError {
    constructor(message = 'Unauthorized') {
        super(401, message)
    }
}

export class BadRequest extends ApiError {
    constructor(message = 'Bad request') {
        super(400, message)
    }
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if(err instanceof ApiError){
        res.status(err.status).json({ status: 'error', error: err.message })
    }
    else{
        console.log(err.stack)
        console.log(err)
        res.sendStatus(500)
    }
}