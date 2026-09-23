import express, {type Express} from "express"
import authorRoutes from './routes/authorRoute.js'
import {loggerMiddleware} from "./middleware/logger.js" 
import {errorHandler} from './middleware/errorHandlers.js'
import {notFoundHandler} from './middleware/errorHandlers.js'
import bookRoutes from './routes/bookRoute.js'

const app: Express = express()
const PORT = process.env.PORT || 3000 

app.use(express.json())
//app.use(bodyParser.json()) //same job as express.json

app.use(loggerMiddleware)
app.use('/authors', authorRoutes)
app.use(notFoundHandler)
app.use(errorHandler)
app.use('/books', bookRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
