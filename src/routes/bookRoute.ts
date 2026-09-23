import {Router, type Request, type Response} from "express";
import {addBook} from "../controllers/bookController.js"
import {body, param, validationResult} from "express-validator"
import {validate} from '../middleware/validate.js'

const router = Router()

const idRule = param('id').isInt({min: 1}).withMessage('id must be a positive integer')
const bookRules = [
    body('title').isString().trim().notEmpty().withMessage('title is required'),
    body('authorId').isInt({min: 1}).withMessage('authorId must be a positive integer').toInt(),
    body('year').isInt({min: 1, max: new Date().getFullYear()}).withMessage('year is invalid').toInt(),
]

router.post('/', bookRules, validate, (req: Request, res: Response) => {
    const {title, authorId, year} = req.body
    res.status(201).json(addBook(title, authorId, year))
})

