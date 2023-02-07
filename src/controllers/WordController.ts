import { Request, Response, NextFunction } from 'express';
import translate from 'google-translate-api-x';
import Word from '../models/WordModel';
import { Status } from '../constants/Status';
import NotFoundError from '../errors/NotFoundError';

class WordController {
  async getWords(req: Request, res: Response, next: NextFunction) {
    try {
      const searchedWords = await Word.find();
      if (searchedWords === null) throw new NotFoundError('Words not found');
      res.status(Status.OK).json(searchedWords);
    } catch (error) {
      next(error);
    }
  }

  async getWord(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const searchedWord = await Word.findById(id);
      if (searchedWord === null) throw new NotFoundError('Word not found');
      res.status(Status.OK).json(searchedWord);
    } catch (error) {
      next(error);
    }
  }

  async addWord(req: Request, res: Response, next: NextFunction) {
    try {
      let translation = '';
      const { word } = req.body;
      if (word.trim() === '') throw new NotFoundError('Nothing to translate');
      const result = await translate(word, { to: 'en' });
      if ('text' in result) {
        translation = String(result.text);
      }
      const newWord = new Word({ word, translation });
      const savedWord = await newWord.save();
      res.status(Status.CREATED).json(savedWord);
    } catch (error) {
      next(error);
    }
  }

  async editWord(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { word, translation, learn } = req.body;
      const editedWord = await Word.findByIdAndUpdate(id, { word, translation, learn }, { new: true });
      res.status(Status.OK).json(editedWord);
    } catch (error) {
      next(error);
    }
  }

  async deleteWord(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedWord = await Word.findByIdAndDelete(id);
      res.status(Status.OK).json(deletedWord);
    } catch (error) {
      if (error instanceof Error) {
        res.status(Status.INTERNAL_SERVER_ERROR).send(error.message);
      }
    }
  }
}

export default new WordController();
