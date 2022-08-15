import {Injectable} from '@angular/core';
import {Item} from '../model/item';
import {BackendService, Method} from './backend.service';
import {Collection} from '../model/collection';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private backendService: BackendService) {}

  deleteItems(collectionId: string, itemIds: string[]): Promise<Item[]> {
    return this.backendService.sendBackendRequest(Method.DELETE, `collection/${collectionId}`, {
      items: itemIds
    });
  }

  addItem(collectionId: string, content: string) : Promise<Item[]> {
    return this.backendService.sendBackendRequest(Method.POST, `collection/${collectionId}`, {
      content: content
    });
  }

  getAllItems(collectionId: string): Promise<Item[]> {
    return this.backendService.sendBackendRequest(Method.GET, `collection/${collectionId}`);
  }

  createCollection(): Promise<Collection> {
    return this.backendService.sendBackendRequest(Method.POST, `collection`);
  }

  getAllCollections(): Promise<Collection[]> {
    return  this.backendService.sendBackendRequest(Method.GET, `collection`);
  }
}