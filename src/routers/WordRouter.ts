import express from 'express';
import wordController from '../controllers/WordController';
import authHandler from '../handlers/AuthHandler';

const WordRouter = express.Router();

WordRouter.get('/api/words', authHandler, wordController.getWords);
WordRouter.post('/api/word', authHandler, wordController.addWord);
WordRouter.get('/api/word/:id', authHandler, wordController.getWord);
WordRouter.put('/api/word/:id', authHandler, wordController.editWord);
WordRouter.delete('/api/word/:id', authHandler, wordController.deleteWord);

export default WordRouter;
