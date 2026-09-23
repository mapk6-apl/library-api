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

export const getBooks = (): Book[] => {
    return books
}

export const getBookById = (id: number): Book => {
    const book = books.find((book) => book.id === id)
    if (!book) throw new AppError(404, `Book with id ${id} not found`)
    return book
}

export const updateBook = (id: number, title: string, authorId: number, year: number): Book => {
    const book = getBookById(id)
    assertValid(title, authorId, id)
    book.title = title
    book.authorId = authorId
    book.year = year
    return book
}

export const deleteBook = (id: number): void => {
    getBookById(id)
    books = books.filter((book) => book.id !== id)
}

export const getBooksByAuthorId = (authorId: number): Book[] => {
    return books.filter((book) => book.authorId === authorId)
}