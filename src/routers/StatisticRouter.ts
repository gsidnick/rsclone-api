import express from 'express';
import statisticController from '../controllers/StatisticController';

const StatisticRouter = express.Router();

StatisticRouter.get('/api/statistics', statisticController.getStatistics);
StatisticRouter.post('/api/statistic', statisticController.addStatistic);
StatisticRouter.get('/api/statistic/:id', statisticController.getStatistic);
StatisticRouter.put('/api/statistic/:id', statisticController.editStatistic);
StatisticRouter.delete('/api/statistic/:id', statisticController.deleteStatistic);

export default StatisticRouter;
