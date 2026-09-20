import {Router, type Request, type Response} from "express";
import {addAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor} from "../controllers/authorController.js"
import {body, param, validationResult} from "express-validator"

const router = Router()

let authors: Array<{id?: number}> = [
    {}
]

router.get('/', (req: Request, res: Response) => {
    res.status(200).json(authors)
})

router.get('/:id', [param('id').isInt().withMessage('Id must be an integer')], (req: Request, res: Response) => {
    const errors = validationResult(req)

    console.log(errors, "errors from express validator middleware")

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {id} = req.params
    const author = authors.find((author) => author.id === id)

    if(!author){
        return res.status(404).send('Author not found')
    }
})

router.post('/', [
    body('name').notEmpty().withMessage('Author name required')
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    console.log(req, 'request');

    const [name, bookTitle] = req.body;
    const newAuthor = {id: authors.length + 1, name, bookTitle};

    authors.push(newAuthor)

    res.status(201).json(newAuthor);
})

export default router