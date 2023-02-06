import express from 'express';
import statisticController from '../controllers/statistic-controller';

const router = express.Router();

router.get('/api/statistics', statisticController.getStatistics);
router.post('/api/statistic', statisticController.addStatistic);
router.get('/api/statistic/:id', statisticController.getStatistic);
router.put('/api/statistic/:id', statisticController.editStatistic);
router.delete('/api/statistic/:id', statisticController.deleteStatistic);

export default router;
