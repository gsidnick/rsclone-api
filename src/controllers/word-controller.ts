import { Request, Response } from 'express';
import translate from 'google-translate-api-x';
import Word from '../models/word-model';

export function getWords(req: Request, res: Response) {
  Word.find()
    .then((words) => res.status(200).json(words))
    .catch((error) => res.status(500).send(error.message));
}

export function getWord(req: Request, res: Response) {
  Word.find()
    .then((word) => res.status(200).json(word))
    .catch((error) => res.status(500).send(error.message));
}

export async function addWord(req: Request, res: Response) {
  const { word } = req.body;
  let translation = '';
  const result = await translate(word, { to: 'ru' });
  if ('text' in result) {
    translation = String(result.text);
  }
  const newWord = new Word({ word, translation });
  newWord
    .save()
    .then((word) => res.status(201).json(word))
    .catch((error) => res.status(500).send(error.message));
}

export function editWord(req: Request, res: Response) {
  const { word, translation, learn } = req.body;
  const { id } = req.params;
  Word.findByIdAndUpdate(id, { word, translation, learn }, { new: true })
    .then((word) => res.status(200).json(word))
    .catch((error) => res.status(500).send(error.message));
}

export function deleteWord(req: Request, res: Response) {
  const { id } = req.params;
  Word.findByIdAndDelete(id)
    .then(() => res.status(200).json(id))
    .catch((error) => res.status(500).send(error.message));
}
