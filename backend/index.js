// npm i express jsonwebtoken bcryptjs cors mongoose nodemon cookie-parser dotenv
import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser'; // used to access the stored cookie in backend
import cors from 'cors';
import dotenv from 'dotenv'
import connectDb from './utils/dbConnection.js';
const app = express()

//middleware
dotenv.config();
app.use(express.json());
app.use(urlencoded({ extended: true }))
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:8032',
    credentials: true
}
app.use(cors(corsOptions))

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    connectDb()
    console.log(`Server is running at port: ${PORT}`)
})