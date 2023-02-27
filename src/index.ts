import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import wordRouter from './routers/WordRouter';
import statisticRouter from './routers/StatisticRouter';
import userRouter from './routers/UserRouter';
import errorHandler from './handlers/ErrorHandler';

dotenv.config();
const DB: string = process.env.MONGO_URL || '';
const PORT: number = Number(process.env.PORT) || 5000;
const app: Application = express();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://rsclone-reactors.netlify.app',
      'https://translate.google.com',
    ],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(wordRouter);
app.use(statisticRouter);
app.use(userRouter);
app.use(errorHandler);

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(DB);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
})();
