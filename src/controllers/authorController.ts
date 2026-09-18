import {type Author} from '../models/author.js'

let authors: Author[] = []; //author array

let currentId = 1;

export const addAuthor = (name: string, bookTitle: string): Author => {
    const newAuthor: Author = {id: currentId++, name, bookTitle}
    authors.push(newAuthor)
    return newAuthor
}

