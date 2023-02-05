import express from 'express';
import {
  getStatistics,
  addStatistic,
  getStatistic,
  editStatistic,
  deleteStatistic,
} from '../controllers/statistic-controller';

const router = express.Router();

router.get('/api/statistics', getStatistics);
router.post('/api/statistic', addStatistic);
router.get('/api/statistic/:id', getStatistic);
router.put('/api/statistic/:id', editStatistic);
router.delete('/api/statistic/:id', deleteStatistic);

export default router;
