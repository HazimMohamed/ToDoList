import express, {Request, Response} from 'express';
import {createCollection, getAllCollections, removeCollections, updateCollection} from '../clients/storage/collections-client';
import {ItemCollection} from '../model/data-types';

function registerCollectionsService(app: express.Express) {
  // Create
  app.post('/collection', (req: Request, res: Response) => {
    createCollection(req.body['name']).then((itemCollection: ItemCollection) => {
      res.status(200);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(itemCollection));
    });
  });

  // Read
  app.get('/collection', (req: Request, res: Response) => {
    getAllCollections().then((allCollections: ItemCollection[]) => {
      res.status(200);
      res.set('Content-Type', 'application/json');
      res.send(JSON.stringify(allCollections));
    });
  });

  // Update
  app.patch('/collection', (req: Request, res: Response) => {
    updateCollection(req.body).then((updatedCollection: ItemCollection) => {
      res.status(200);
      res.set('Content-Type', 'application/json');
      res.send(updatedCollection);
    });
  });

  // Delete
  app.delete('/collection', (req: Request, res: Response) => {
    removeCollections(req.body['ids']).then(() => {
      res.status(200);
      res.set('Content-Type', 'application/json');
      res.send();
    });
  });
}

export {registerCollectionsService};