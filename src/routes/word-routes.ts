import express from 'express';
import { getWords, addWord, getWord, editWord, deleteWord } from '../controllers/word-controller';

const router = express.Router();

router.get('/api/words', getWords);
router.post('/api/word', addWord);
router.get('/api/word/:id', getWord);
router.put('/api/word/:id', editWord);
router.delete('/api/word/:id', deleteWord);

export default router;
