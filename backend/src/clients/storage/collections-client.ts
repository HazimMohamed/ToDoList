import {PIMongoClient} from './mongo-client';
import {ItemCollection} from '../../model/data-types';
import {MongoClient, Collection, Document, InsertOneResult, ObjectId} from 'mongodb';

function collectionHandle(): Promise<Collection<Document>> {
  return PIMongoClient.getInstance().execute((mongoClient: MongoClient) => {
    return mongoClient.db('todo_list')
        .collection('collections');
  });
}

function toCollection(data: any): ItemCollection {
  return {
    id: data._id,
    name: data.name,
    items: data.items ?? []
  }
}

function getCollection(id: string) {
  return collectionHandle().then((handle: Collection<Document>) => {
    return handle.findOne({
      _id: new ObjectId(id)
    });
  }).then(toCollection);
}

function createCollection(name: string): Promise<ItemCollection> {
  return collectionHandle().then((handle: Collection<Document>) => {
    return handle.insertOne({
      name: name
    });
  }).then((insertOneResult: InsertOneResult<Document>) => {
    return getCollection(insertOneResult.insertedId.toString());
  });
}

function updateCollection(updated: ItemCollection): Promise<ItemCollection> {
  return collectionHandle().then((handle: Collection<Document>) => {
    return handle.replaceOne({ _id: new ObjectId(updated.id) }, updated)
  }).then(() => getCollection(updated.id));
}

function getAllCollections(): Promise<ItemCollection[]> {
  return collectionHandle().then((handle: Collection<Document>) => {
    return handle.find().toArray()
  }).then(values => {
    return values.map(toCollection);
  });
}

function removeCollections(ids: string[]): Promise<void> {
  let mongoTypeIds: ObjectId[] = ids.map((idStr: string) => new ObjectId(idStr));
  return collectionHandle().then((handle: Collection<Document>) => {
    return handle.deleteMany({
      _id: { $in: mongoTypeIds }
    }).then(()=>{});
  });
}

export {getCollection, getAllCollections, createCollection, updateCollection, removeCollections}