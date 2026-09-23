import {AppError} from '../errors/AppError.js'
import type {Book} from '../models/book.js'
import {authorExists} from './authorController.js'

let books: Book[] = []
let currentId = 1

const isDuplicate = (title: string, authorId: number, ignoreId?: number) => {
    return books.some((book) => 
        book.id !== ignoreId &&
        book.authorId === authorId &&
        book.title.toLowerCase() === title.toLowerCase())
}

const assertValid = (title: string, authorId: number, ignoreId?: number) => {
    if (!authorExists(authorId))
        throw new AppError(400, `authorId ${authorId} does not reference an existing author`)
    if (isDuplicate(title, authorId, ignoreId))
        throw new AppError(409, `This author already has a book titled "${title}"`)
}

export const addBook = (title: string, authorId: number, year: number): Book => {
    assertValid(title, authorId)
    const book: Book = {id: currentId++, title, authorId, year}
    books.push(book)
    return book
}