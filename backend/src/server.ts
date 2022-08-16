import express, {json} from 'express';
import cors from 'cors';
import {registerCollectionsService} from './service/collections-service';
import {logging} from './middleware/logging';

let app = express();

app.use(json())
app.use(cors())
app.use(logging())

registerCollectionsService(app);

// TODO: For some reason if I change this to a default export it doesn't work
// with tests it would be nice to find out why.
export { app };