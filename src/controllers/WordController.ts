import { Request, Response } from 'express';
import translate from 'google-translate-api-x';
import Word from '../models/WordModel';

class WordController {
  async getWords(req: Request, res: Response) {
    try {
      const searchedWords = await Word.find();
      if (searchedWords === null) throw new Error('Words not found');
      res.status(200).json(searchedWords);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }

  async getWord(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const searchedWord = await Word.findById(id);
      if (searchedWord === null) throw new Error('Word not found');
      res.status(200).json(searchedWord);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }

  async addWord(req: Request, res: Response) {
    try {
      let translation = '';
      const { word } = req.body;
      const result = await translate(word, { to: 'en' });
      if ('text' in result) {
        translation = String(result.text);
      } else {
        throw new Error('Unable to translate');
      }
      const newWord = new Word({ word, translation });
      const savedWord = await newWord.save();
      res.status(201).json(savedWord);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }

  async editWord(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { word, translation, learn } = req.body;
      const editedWord = await Word.findByIdAndUpdate(id, { word, translation, learn }, { new: true });
      res.status(200).json(editedWord);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }

  async deleteWord(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedWord = await Word.findByIdAndDelete(id);
      res.status(200).json(deletedWord);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }
}

export default new WordController();
