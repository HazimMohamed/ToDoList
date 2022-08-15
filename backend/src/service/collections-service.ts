import express, {Request, Response} from 'express';

function registerCollectionsService(app: express.Express) {
  // Create
  app.post('/collection', (req: Request, res: Response) => {

  });

  // Read
  app.get('/collection/:collectionId', (req: Request, res: Response) => {

  });

  // Delete
  app.delete('/collection', (req: Request, res: Response) => {

  });
}