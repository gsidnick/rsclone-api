import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
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
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(
  cookieSession({
    secret: process.env.COOKIE_SECRET_KEY,
    sameSite: 'none',
    secure: false,
    httpOnly: true,
  }),
);
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
