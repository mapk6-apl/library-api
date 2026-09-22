import {type Request, type Response, type NextFunction} from "express"
import {AppError} from '../errors/AppError.js'

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(404, `Route ${req.method} ${req.originalUrl} not found`))
}

