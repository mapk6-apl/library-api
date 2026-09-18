import {type Request, type Response, type NextFunction} from "express"

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next() //tells express to move on to the next middleware
}