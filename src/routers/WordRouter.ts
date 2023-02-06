import express from 'express';
import wordController from '../controllers/WordController';

const WordRouter = express.Router();

WordRouter.get('/api/words', wordController.getWords);
WordRouter.post('/api/word', wordController.addWord);
WordRouter.get('/api/word/:id', wordController.getWord);
WordRouter.put('/api/word/:id', wordController.editWord);
WordRouter.delete('/api/word/:id', wordController.deleteWord);

export default WordRouter;
