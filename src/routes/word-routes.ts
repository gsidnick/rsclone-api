import express from 'express';
import wordController from '../controllers/word-controller';

const router = express.Router();

router.get('/api/words', wordController.getWords);
router.post('/api/word', wordController.addWord);
router.get('/api/word/:id', wordController.getWord);
router.put('/api/word/:id', wordController.editWord);
router.delete('/api/word/:id', wordController.deleteWord);

export default router;
