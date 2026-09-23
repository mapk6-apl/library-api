# Library API

A REST API for managing a library's authors and books, built with TypeScript and Express. Data is stored in memory and resets when the server restarts.

## Setup

1. Clone the repository and move into the project folder:

```
git clone https://github.com/mapk6-apl/library-api.git
cd library-api
```

2. Install all required dependencies:

```
npm install
```

3. Run the server (via `tsx`, automatically restarts on file changes):

```
npm run dev
```

4. The server starts on `http://localhost:3000` by default. To use a different port, set the `PORT` environment variable:

```
PORT=4000 npm run dev
```

5. Test the endpoints with Postman or `curl`, for example:

```
curl http://localhost:3000/authors
```

## Models

**Author**
```json
{ "id": 1, "name": "Chinua Achebe", "bio": "Nigerian novelist" }
```
`name` is required. `bio` is optional.

**Book**
```json
{ "id": 1, "title": "Things Fall Apart", "authorId": 1, "year": 1958 }
```
`title`, `authorId`, and `year` are all required. `authorId` must reference an existing author.

## Endpoints

### Authors

| Method | Endpoint | Description | Success |
|---|---|---|---|
| POST | `/authors` | Create an author | 201 |
| GET | `/authors` | List all authors | 200 |
| GET | `/authors/:id` | Get one author | 200 |
| PUT | `/authors/:id` | Update an author | 200 |
| DELETE | `/authors/:id` | Delete an author | 204 |
| GET | `/authors/:id/books` | List an author's books | 200 |

### Books

| Method | Endpoint | Description | Success |
|---|---|---|---|
| POST | `/books` | Create a book | 201 |
| GET | `/books` | List all books | 200 |
| GET | `/books/:id` | Get one book | 200 |
| PUT | `/books/:id` | Update a book | 200 |
| DELETE | `/books/:id` | Delete a book | 204 |

### Example requests

```
POST /authors
{ "name": "Chinua Achebe", "bio": "Nigerian novelist" }

POST /books
{ "title": "Things Fall Apart", "authorId": 1, "year": 1958 }

PUT /books/1
{ "title": "Things Fall Apart", "authorId": 1, "year": 1958 }
```

## Errors

All errors are returned as:

```json
{ "error": "message here" }
```

| Status | Meaning |
|---|---|
| 400 | Invalid or missing fields (e.g. missing `name`, `authorId` doesn't exist, bad `id` in URL) |
| 404 | Author or book not found |
| 409 | Duplicate book (same title + same author) / deleting an author who still has books |

## Testing

Tested manually with Postman:
- Created authors and books, confirmed 201 responses.
- Confirmed 400 on missing/invalid fields and unknown `authorId`.
- Confirmed 404 on unknown author/book ids.
- Confirmed 409 on duplicate book and on deleting an author with books.
- Confirmed `GET /authors/:id/books` returns only that author's books.
