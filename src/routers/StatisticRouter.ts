import express from 'express';
import statisticController from '../controllers/StatisticController';
import authHandler from '../handlers/AuthHandler';

const StatisticRouter = express.Router();

StatisticRouter.get('/api/statistics', authHandler, statisticController.getStatistics);
StatisticRouter.post('/api/statistic', authHandler, statisticController.addStatistic);
StatisticRouter.get('/api/statistic/:id', authHandler, statisticController.getStatistic);
StatisticRouter.put('/api/statistic/:id', authHandler, statisticController.editStatistic);
StatisticRouter.delete('/api/statistic/:id', authHandler, statisticController.deleteStatistic);

export default StatisticRouter;
