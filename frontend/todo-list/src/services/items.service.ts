import {Injectable} from '@angular/core';
import * as uuid from 'uuid';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as request from 'superagent';
import {Response} from 'superagent';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  backendUrl = 'http://127.0.0.1:3000/todo';
  
  constructor(private http: HttpClient) {
  }

  items = [
    new Item('This is my first comment.', new Date('2022-08-04T03:54:48+0000')),
    new Item('Wow this is fun!', new Date('2022-08-04T03:54:48+0000'))
  ];

  private deleteItem(id: string): Promise<Item[]> {
    return new Promise((resolve, reject) => {
      request.delete(this.backendUrl)
          .set('Content-Type', 'application/json')
          .send(JSON.stringify({'id': id}))
          .then((res: Response) => {
            if (res.status != 200) {
              reject(`Received non 200 status code ${res.status} when deleting item ${id}. Error: ${res.body}`);
              return;
            }
            resolve(res.body);
          }).catch((reason) => {
            reject(`Failed to send delete request ${reason}`);
          });
    });
  }

  deleteItems(itemIds: string[]): Promise<Item[]> {
    let latestPromise: Promise<Item[]> = this.deleteItem(itemIds[0]);
    for (let itemId of itemIds.slice(1)) {
      latestPromise = latestPromise.then((res: any) => this.deleteItem(itemId));
    }
    return latestPromise;
  }

  addItem(content: string) : Promise<Item[]> {
    return new Promise((resolve, reject) => {
      request.post(this.backendUrl)
          .set('Content-Type', 'application/json')
          .send(JSON.stringify(new Item(content)))
          .then((res: Response) => {
            if (res.status != 200) {
              reject(`Received non 200 status code ${res.status}. Error: ${res.body}`);
              return;
            }
            resolve(res.body);
          }).catch((reason) => {
            reject(`Failed to send create request ${reason}`);
          });
    });
  }

  getAllItems(): Promise<Item[]> {
    return new Promise<Item[]>((resolve, reject) => {
      request.get(this.backendUrl)
          .then((res: Response) => {
            if (res.status != 200) {
              reject(`Received non 200 status code ${res.status}. Error: ${res.body}`);
              return;
            }
            resolve(res.body);
          }).catch((reason) => {
            reject(`Failed to send get request ${reason}`);
          });
    });
  }
}


export class Item {
  id: string;
  content: string;
  createTime: Date | undefined;


  constructor(content: string, createTime: Date | undefined = undefined) {
    this.id = uuid.v4()
    this.content = content;
    this.createTime = createTime;
  }
}