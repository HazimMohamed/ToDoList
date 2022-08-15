import express, {Request, Response} from 'express';

function registerUsersService(app: express.Express) {
  // Create
  app.post('/users', (req: Request, res: Response) => {
    // createUser();
  });

  // Read
  app.get('/me', (req: Request, res: Response) => {
    // let sessionId = req.cookies['SESSION_ID']
    // if (!sessionId) {
    //   res.status(403);
    //   res.send({message: 'Session ID not found.'});
    // }
  });
}

export {registerUsersService}