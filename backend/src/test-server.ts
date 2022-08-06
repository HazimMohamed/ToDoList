import {Item} from './data-types';
import {json, Request, Response} from 'express';
import {getAllItems} from './db-access';

let express = require('express');
let cors = require('cors');
let itemsInterface = require('./db-access');

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

function validateNewItem(data: any): boolean {
    return "id" in data && "content" in data;
}

app.post('/todo', (req: Request, res: Response) => {
    console.log(`Received post:`);
    console.log(req.body);

    let requestJson = req.body;
    if (!validateNewItem(requestJson)) {
        res.status(400);
        res.send(`Got invalid content ${requestJson.toString()}.`);
        return;
    }

    itemsInterface.addItem(requestJson).then((items: Item[]) => {
        res.send(items);
    })
});

function validateDeleteRequest(data: any): boolean {
    let idToDelete: any = data['id'];
    let valid = idToDelete != undefined;
    valid = valid && idToDelete instanceof String;
    valid = valid && new RegExp('[0-9A-Za-z]+').test(idToDelete);
    return valid;
}

function assertIdIsPresent(id: string, items: Item[]) : void {
    if(!items.map((item) => item.id).includes(id)) {
        throw `Id ${id} not found in items. Found ${items.map((item) => item.id)}`;
    }
}

app.delete('/todo', (req: Request, res: Response) => {
    if (!validateDeleteRequest(req.body)) {
        res.status(400);
        res.send(`Got item invalid item ${req.body}`);
    }

    let idToDelete = req.body['id'];
    getAllItems().then((items) => {
            try {
                assertIdIsPresent(idToDelete, items);
            } catch (e) {
                res.status(404);
                res.send(e);
            }
            itemsInterface.removeItem(idToDelete).then((items: Item[]) => {
                res.send(JSON.stringify(items));
            });
        }
    );
});

app.listen(3000, () => {
    console.log(`Listening on port 3000`);
});
