import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/api/words', (req: Request, res: Response, next: NextFunction) => {
  console.log('Read all words');
  res.status(200).send([
    { word: 'project', translate: 'проект', level: 57 },
    { word: 'deploy', translate: 'развертывать', level: 69 },
    { word: 'main', translate: 'главный', level: 80 },
  ]);
  next();
});

router.post('/api/word', (req: Request, res: Response, next: NextFunction) => {
  console.log('Create word');
  res.status(201).send({ word: 'approve', translate: 'одобрить', level: 0 });
  next();
});

router.get('/api/word/:id', (req: Request, res: Response, next: NextFunction) => {
  console.log('Read one word');
  res.status(200).send({ word: 'project', translate: 'проект', level: 57 });
  next();
});

router.put('/api/word/:id', (req: Request, res: Response, next: NextFunction) => {
  console.log('Update word');
  res.status(200).send({ word: 'deploy', translate: 'развертывать', level: 85 });
  next();
});

router.delete('/api/word/:id', (req: Request, res: Response, next: NextFunction) => {
  console.log('Delete word');
  res.status(200).send({ word: 'approve', translate: 'одобрить', level: 0 });
  next();
});

export default router;
