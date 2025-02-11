import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//middlewares

app.use(express.json());
app.use(cors({
    origin: '*',
    credentials:true
}));
app.use(cookieParser());


//routing

app.get('/', (req, res)=> {
    res.send('Hello World!');
});




//runing server

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});