import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import wordRoutes from './routes/word-routes';
import statisticRoutes from './routes/statistic-routes';

dotenv.config();

const app: Application = express();
const DB: string = process.env.MONGO_URL || '';
const PORT: number = Number(process.env.PORT) || 5000;

(async () => {
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(DB).then(() => console.log('Connected to DB'));
    app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
  } catch (err) {
    console.log(err);
  }
})();

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(wordRoutes);
app.use(statisticRoutes);

app.listen(PORT, 'localhost', () => {
  console.log(`Listening port ${PORT}...`);
});
