import {type Author} from '../models/author.js'
import {AppError} from '../errors/AppError.js'

let authors: Author[] = []; //author array

let currentId = 1;

export const addAuthor = (name: string, bio: string): Author => {
    const newAuthor: Author = {id: currentId++, name, bio}
    authors.push(newAuthor)
    return newAuthor
}

export const getAuthors = (): Author[] => {
    return authors
}

export const getAuthorById = (id: number): Author | undefined => {
    const author = authors.find((author) => author.id === id)
    if(!author) throw new AppError(404, `Author with id ${id} not found`)
    return author
}

export const updateAuthor = (id: number, updatedFields: Partial<Omit<Author, 'id'>>): Author | undefined => {
    const author = authors.find((author) => author.id === id)
    if(!author) 
        return undefined

    Object.assign(author, updatedFields)
    return author
}

export const deleteAuthor = (id: number): boolean => {
    const initialLength = authors.length
    authors = authors.filter((author) => author.id !== id)
    return authors.length < initialLength
}

export const authorExists = (id: number): boolean => authors.some((author) => author.id === id)