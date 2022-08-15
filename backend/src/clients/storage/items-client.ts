import {Item, ItemCollection} from '../../model/data-types';
import {getCollection, updateCollection} from './collecitons-client';
import {ObjectId} from 'mongodb';

function getAllItems(collectionId: string): Promise<Item[]> {
  return getCollection(collectionId).then((collection: ItemCollection) => {
    return collection.items;
  });
}

function addItem(content: string, collectionId: string): Promise<Item[]> {
  return getCollection(collectionId).then((collection: ItemCollection) => {
    collection.items.push({
      id: new ObjectId().toString(),
      content: content
    });
    return updateCollection(collectionId, collection);
  }).then((updateCollection: ItemCollection) => {
    return updateCollection.items;
  });
}

function removeItems(itemIds: Set<string>, collectionId: string): Promise<Item[]> {
  return getCollection(collectionId).then((collection: ItemCollection) => {
    collection.items = collection.items.filter((item: Item) => {
      return !itemIds.has(item.id);
    });
    return updateCollection(collectionId, collection);
  }).then((updateCollection: ItemCollection) => {
    return updateCollection.items;
  });
}

export {getAllItems, removeItems, addItem}
