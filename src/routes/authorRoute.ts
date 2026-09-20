import {Router, type Request, type Response} from "express";
import {addAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor} from "../controllers/authorController.js"

const router = Router()

let authors = [
    {}
]

router.get('/', (req: Request, res: Response) => {
    res.status(200).json(authors)
})