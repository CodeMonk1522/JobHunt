import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express';
import cors from 'cors'
const app = express();
const PORT = 8080

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
const corsOptions = {
    origin: 'http//localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions))
app.listen(PORT, ()=>{console.log(`App is listening on ${PORT}`)})