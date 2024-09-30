import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
dotenv.config({});
const app = express();
const PORT = process.env.PORT || 6969

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
const corsOptions = {
    origin: 'http//localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions))



app.get("/", (req, res) => {
    return res.status(200).json({
        message: 'Hi from backend',
        success : true
    })
})
app.listen(PORT, () => {
    connectDB();
    console.log(`App is listening on ${PORT}`)
})
// mongodb+srv://admin:admin@cluster0.bpou4.mongodb.net/