import {Router, type Request, type Response} from "express";
import {addAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor} from "../controllers/authorController.js"
import {body, param, validationResult} from "express-validator"
import {validate} from '../middleware/validate.js'

const router = Router()

const idRule = param('id').isInt().withMessage('Id must be an integer')
const authourRules = [body('name').isString().trim().notEmpty().withMessage('Author name required')]

router.get('/', (req: Request, res: Response) => {
    res.status(200).json(getAuthors())
})

router.get('/:id', idRule, validate, (req: Request, res: Response) => {
    const errors = validationResult(req)

    //console.log(errors, "errors from express validator middleware")

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {id} = req.params
    const author = getAuthorById(Number(req.params.id)) //converts the string to a number

    if(!author){
        return res.status(404).send('Author not found')
    }

    res.status(200).json(author)
    return res.status(400).json({errors: errors.array()})
})

router.post('/', [
    body('name').notEmpty().withMessage('Author name required')
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    //console.log(req, 'request');

    const {name} = req.body;
    const newAuthor = addAuthor(name);

    res.status(201).json(newAuthor);
})

export default router