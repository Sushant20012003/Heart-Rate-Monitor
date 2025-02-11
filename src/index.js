import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js';
import patientRoutes from './routes/patient.route.js';
import heartRateRoutes from './routes/heartRate.route.js';

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

app.use('/api/user', userRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/heart-rate', heartRateRoutes);


//runing server

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port:${PORT}`);
});