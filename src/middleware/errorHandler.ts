import {type Request, type Response, type NextFunction} from "express"
import {AppError} from '../errors/AppError.js'

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.method} ${req.originalUrl} not found`))
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        res.status(err.statusCode).json({error: err.message, details: err.details})
        return
    }
    if(err instanceof SyntaxError && 'body' in err) {
        res.status(400).json({error: 'Malformed JSON in request body'})
        return
    }
    console.error(err)
    res.status(500).json({error: 'Internal server error'})
}