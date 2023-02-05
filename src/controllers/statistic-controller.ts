import { Request, Response } from 'express';
import Statistic from '../models/statistic-model';

export function getStatistics(req: Request, res: Response) {
  Statistic.find()
    .then((statistic) => res.status(200).json(statistic))
    .catch((error) => res.status(500).send(error.message));
}

export function getStatistic(req: Request, res: Response) {
  const { id } = req.params;
  Statistic.findById(id)
    .then((statistic) => res.status(200).json(statistic))
    .catch((error) => res.status(500).send(error.message));
}

export function addStatistic(req: Request, res: Response) {
  const { score, level } = req.body;
  const newStatistic = new Statistic({ score, level });
  newStatistic
    .save()
    .then((statistic) => res.status(201).json(statistic))
    .catch((error) => res.status(500).send(error.message));
}

export function editStatistic(req: Request, res: Response) {
  const { score, level } = req.body;
  const { id } = req.params;
  Statistic.findByIdAndUpdate(id, { score, level }, { new: true })
    .then((statistic) => res.status(200).json(statistic))
    .catch((error) => res.status(500).send(error.message));
}

export function deleteStatistic(req: Request, res: Response) {
  const { id } = req.params;
  Statistic.findByIdAndDelete(id)
    .then(() => res.status(200).json(id))
    .catch((error) => res.status(500).send(error.message));
}
