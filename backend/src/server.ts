import express, {json} from 'express';
import cors from 'cors';
import {registerUsersService} from './service/users-service';
import {registerItemsService} from './service/items-service';

let app = express();

app.use(json())
app.use(cors())

registerUsersService(app);

registerItemsService(app);

registerUsersService(app);

// TODO: For some reason if I change this to a default export it doesn't work
// with tests it would be nice to find out why.
export { app };