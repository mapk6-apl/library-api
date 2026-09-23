import {type Request, type Response, type NextFunction} from "express"
import {validationResult} from "express-validator"
import {AppError} from '../errors/AppError.js'

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        next(new AppError(400, 'Validation failed'))
        return
    }
    next()
}