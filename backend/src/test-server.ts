import {Item} from './data-types';
import {json, Request, Response} from 'express';
import {getAllItems} from './db-access';
import {validateItemNotMalformed, doesIdExist, validateDeleteRequestIsNotMalformed} from './data-validation';
import express from 'express';
import cors from 'cors';
import * as itemsInterface from './db-access';

let app = express();

app.use(json())
app.use(cors())

app.get('/todo', (req: Request, res: Response) => {
    itemsInterface.getAllItems().then(
        (items: Item[]) => res.send(JSON.stringify(items))
    ).catch((err: any) => {
        res.status(500);
        res.send(err);
    });
});


app.post('/todo', (req: Request, res: Response) => {
    console.log(`Received post:`);
    console.log(req.body);

    let requestJson = req.body;
    try {
        validateItemNotMalformed(req.body);
    } catch (e) {
        res.status(400);
        res.send(`Got invalid content ${requestJson.toString()}: ${e.toString()}`);
        return;
    }

    doesIdExist(req.body.id).then((exists: boolean) => {
        if (exists) {
            res.status(409);
            res.send(`\"id\" ${req.body.id} already exists. \"id\" values must be unique.`);
            return;
        }

        itemsInterface.addItem(requestJson).then((items: Item[]) => {
            res.send(items);
        });
    });
});

app.delete('/todo', (req: Request, res: Response) => {
    try {
        validateDeleteRequestIsNotMalformed(req.body);
    } catch (e) {
        res.status(400);
        res.send(`Got item invalid item ${req.body.toString()}: ${e.toString()}`);
        return;
    }

    let idToDelete = req.body['id'];
    doesIdExist(idToDelete).then((exists: boolean) => {
        if (!exists) {
            res.status(404);
            res.send(`\"id\" ${idToDelete} not found.`);
        }

        getAllItems().then((items) => {
            itemsInterface.removeItem(idToDelete).then((items: Item[]) => {
                res.setHeader('Content-Type', 'application/json')
                res.send(JSON.stringify(items));
            });
        });
    });
});

// TODO: For some reason if I change this to a default export it doesn't work
// with tests it would be nice to find out why.
export { app };