import express, {type Express} from "express"
import authorRoutes from './routes/authorRoute.js'
import {loggerMiddleware} from "./middleware/logger.js" 

const app: Express = express()
const PORT = process.env.PORT || 3000 

app.use(express.json())
//app.use(bodyParser.json()) //same job as express.json

app.use(loggerMiddleware)
app.use('/authors', authorRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
