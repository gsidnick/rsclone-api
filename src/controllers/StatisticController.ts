import { Request, Response, NextFunction } from 'express';
import Statistic from '../models/StatisticModel';
import { Status } from '../constants/Status';
import NotFoundError from '../errors/NotFoundError';

class StatisticController {
  public async getStatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.user.id;
      const searchedStatistics = await Statistic.find({ user: userID });
      if (searchedStatistics === null) throw new NotFoundError('Statistics not found');
      res.status(Status.OK).json(searchedStatistics);
    } catch (error) {
      next(error);
    }
  }

  public async getStatistic(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const searchedStatistic = await Statistic.findById(id);
      if (searchedStatistic === null) throw new NotFoundError('Statistic not found');
      res.status(Status.OK).json(searchedStatistic);
    } catch (error) {
      next(error);
    }
  }

  public async addStatistic(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.user.id;
      const data = { user: userID, ...req.body };
      const newStatistic = new Statistic(data);
      const savedStatistic = await newStatistic.save();
      res.status(Status.CREATED).json(savedStatistic);
    } catch (error) {
      next(error);
    }
  }

  public async editStatistic(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { score, level } = req.body;
      const editedStatistic = await Statistic.findByIdAndUpdate(id, { score, level }, { new: true });
      res.status(Status.OK).json(editedStatistic);
    } catch (error) {
      next(error);
    }
  }

  public async deleteStatistic(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedStatistic = await Statistic.findByIdAndDelete(id);
      res.status(Status.OK).json(deletedStatistic);
    } catch (error) {
      next(error);
    }
  }
}

export default new StatisticController();
