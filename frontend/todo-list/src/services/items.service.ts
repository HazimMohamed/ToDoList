import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() { }

  getAllItems(): Promise<Item[]> {
    return Promise.resolve([
      {
        content: 'Hello world!',
        createTime: 1231243134
      },
      {
        content: 'This is my first todo list item',
        createTime: 1231243134
      }
    ]);
  }
}

export interface Item {
  content: string;
  createTime: number;
}