import { Request, Response } from 'express';
import Word from '../models/word';

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

export function addWord(req: Request, res: Response) {
  const { word, translation, knowledgeLevel } = req.body;
  const newWord = new Word({ word, translation, knowledgeLevel });
  newWord
    .save()
    .then((word) => res.status(201).json(word))
    .catch((error) => res.status(500).send(error.message));
}

export function editWord(req: Request, res: Response) {
  const { word, translation, knowledgeLevel } = req.body;
  const { id } = req.params;
  Word.findByIdAndUpdate(id, { word, translation, knowledgeLevel }, { new: true })
    .then((word) => res.status(200).json(word))
    .catch((error) => res.status(500).send(error.message));
}

export function deleteWord(req: Request, res: Response) {
  const { id } = req.params;
  Word.findByIdAndDelete(id)
    .then(() => res.status(200).json(id))
    .catch((error) => res.status(500).send(error.message));
}