import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import wordRoutes from './routes/word-routes';

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

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(wordRoutes);

app.listen(PORT, 'localhost', () => {
  console.log(`Listening port ${PORT}...`);
});
