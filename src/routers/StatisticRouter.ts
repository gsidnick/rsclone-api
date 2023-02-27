import express from 'express';
import statisticController from '../controllers/StatisticController';
import authHandler from '../handlers/AuthHandler';

const StatisticRouter = express.Router();

StatisticRouter.get('/api/statistic', authHandler, statisticController.getStatistic);
StatisticRouter.post('/api/statistic', authHandler, statisticController.createStatistic);
StatisticRouter.put('/api/statistic', authHandler, statisticController.editStatistic);
StatisticRouter.delete('/api/statistic', authHandler, statisticController.deleteStatistic);

export default StatisticRouter;
