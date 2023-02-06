import { Request, Response } from 'express';
import Statistic from '../models/statistic-model';

class StatisticController {
  async getStatistics(req: Request, res: Response) {
    try {
      const searchedStatistics = await Statistic.find();
      if (searchedStatistics === null) throw new Error('Statistics not found');
      res.status(200).json(searchedStatistics);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }

  async getStatistic(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const searchedStatistic = await Statistic.findById(id);
      if (searchedStatistic === null) throw new Error('Statistic not found');
      res.status(200).json(searchedStatistic);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }

  async addStatistic(req: Request, res: Response) {
    try {
      const newStatistic = new Statistic(req.body);
      const savedStatistic = await newStatistic.save();
      res.status(201).json(savedStatistic);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }

  async editStatistic(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { score, level } = req.body;
      const editedStatistic = await Statistic.findByIdAndUpdate(id, { score, level }, { new: true });
      res.status(200).json(editedStatistic);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }

  async deleteStatistic(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedStatistic = await Statistic.findByIdAndDelete(id);
      res.status(200).json(deletedStatistic);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  }
}

export default new StatisticController();
