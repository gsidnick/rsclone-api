import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import wordRouter from './routers/WordRouter';
import statisticRouter from './routers/StatisticRouter';

dotenv.config();

const app: Application = express();
const DB: string = process.env.MONGO_URL || '';
const PORT: number = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(wordRouter);
app.use(statisticRouter);

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(DB);
    app.listen(PORT, () => console.log(`Server started on port ${process.env.PORT}`));
  } catch (err) {
    console.log(err);
  }
})();
