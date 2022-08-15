import express, {Request, Response} from 'express';

function registerItemsService(app: express.Express) {
  // Create
  app.post('/collection/:collectionId', (req: Request, res: Response) => {

  });

  // Read
  app.get('/collection/:collectionId/item/:itemId', (req: Request, res: Response) => {

  });

  // Delete
  app.delete('/collection/:collectionId', (req: Request, res: Response) => {

  });
}

export {registerItemsService}