import {Router, type Request, type Response} from "express";
import {addBook, getBooks, getBookById, updateBook, deleteBook} from "../controllers/bookController.js"
import {body, param, validationResult} from "express-validator"
import {validate} from '../middleware/validate.js'

const router = Router()

const idRule = param('id').isInt({min: 1}).withMessage('id must be a positive integer')
const bookRules = [
    body('title').isString().trim().notEmpty().withMessage('title is required'),
    body('authorId').isInt({min: 1}).withMessage('authorId must be a positive integer').toInt(),
    body('year').isInt({min: 1, max: new Date().getFullYear()}).withMessage('year is invalid').toInt(),
]

//add new book
router.post('/', bookRules, validate, (req: Request, res: Response) => {
    const {title, authorId, year} = req.body
    res.status(201).json(addBook(title, authorId, year))
})

//get all books
router.get('/', (req: Request, res: Response) => {
    res.status(200).json(getBooks())
})

//get book by id
router.get('/:id', idRule, validate, (req: Request, res: Response) => {
    res.status(200).json(getBookById(Number(req.params.id)))
})

//update book details
router.put('/:id', idRule, bookRules, validate, (req: Request, res: Response) => {
    const {title, authorId, year} = req.body
    res.status(200).json(updateBook(Number(req.params.id), title, authorId, year))
})

//delete books
router.delete('/:id', idRule, validate, (req: Request, res: Response) => {
    deleteBook(Number(req.params.id))
    res.status(204).send()
})

