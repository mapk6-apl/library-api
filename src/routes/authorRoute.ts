import {Router, type Request, type Response} from "express";
import {addAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor} from "../controllers/authorController.js"

const router = Router()

let authors = [
    {}
]