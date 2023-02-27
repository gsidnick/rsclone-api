import { Request, Response, NextFunction } from 'express';
import Statistic from '../models/StatisticModel';
import { Status } from '../constants/Status';
import NotFoundError from '../errors/NotFoundError';

class StatisticController {
  public async getStatistic(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.user.id;
      const searchedStatistics = await Statistic.findOne({ user: userID });
      if (searchedStatistics === null) throw new NotFoundError('Statistics not found');
      res.status(Status.OK).json(searchedStatistics);
    } catch (error) {
      next(error);
    }
  }

  public async createStatistic(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.user.id;
      const newStatistic = new Statistic({ user: userID });
      const savedStatistic = await newStatistic.save();
      res.status(Status.CREATED).json(savedStatistic);
    } catch (error) {
      next(error);
    }
  }

  public async editStatistic(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.user.id;
      const { score, level } = req.body;
      const editedStatistic = await Statistic.findOneAndUpdate({ user: userID }, { score, level });
      res.status(Status.OK).json(editedStatistic);
    } catch (error) {
      next(error);
    }
  }

  public async deleteStatistic(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = req.user.id;
      const deletedStatistic = await Statistic.findOneAndDelete({ user: userID });
      res.status(Status.OK).json(deletedStatistic);
    } catch (error) {
      next(error);
    }
  }
}

export default new StatisticController();
