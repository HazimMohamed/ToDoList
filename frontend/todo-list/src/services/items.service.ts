import {Injectable} from '@angular/core';
import * as uuid from 'uuid';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {parseJson} from '@angular/cli/src/utilities/json-file';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) {
  }

  items = [
    new Item('This is my first comment.', new Date('2022-08-04T03:54:48+0000')),
    new Item('Wow this is fun!', new Date('2022-08-04T03:54:48+0000'))
  ];

  deleteItem(items: string[]): Promise<void> {
    return new Promise(resolve => {
      this.items = this.items.filter(it => !items.includes(it.id));
      resolve();
    });
  }

  addItem(content: string) : Promise<void> {
    return new Promise(resolve => {
      this.items.push(new Item(content, new Date(Date.now())));
      resolve();
    });
  }

  getAllItems(): Promise<Item[]> {
    return new Promise<Item[]>((resolve) => {
     let dataObservable: Observable<Item[]> = this.http.get<Item[]>('http://localhost:3000/todo', {
       responseType: 'json'
     });
     dataObservable.subscribe(response => resolve(response) );
    });
  }
}


export class Item {
  id: string;
  content: string;
  createTime: Date;


  constructor(content: string, createTime: Date) {
    this.id = uuid.v4()
    this.content = content;
    this.createTime = createTime;
  }
}