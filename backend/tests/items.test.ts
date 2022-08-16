import 'jest';
import {app} from '../src/server';
// @ts-ignore
import supertest from 'supertest';
import {Item, ItemCollection} from '../src/model/data-types';
import {item1, item2} from './data';

let testApp: supertest.SuperTest<any>;
let collectionCreationRegistry: string[];

function errorMessage(methodName: string, response: supertest.Response) {
  return `Failed to ${methodName}. Status: ${response.status}. Message ${response.body}`;
}

async function createCollection(items: Item[] = []): Promise<ItemCollection> {
  let response: supertest.Response = await testApp.post('/collection')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({name: 'Test Collection', items: items}));

  if (response.status == 200) {
    let collection: ItemCollection = response.body;
    collectionCreationRegistry.push(collection.id);
    return collection;
  } else {
    throw errorMessage('create test collection', response);
  }
}

async function deleteCollections(ids: string[]): Promise<void> {
  let response: supertest.Response = await testApp.delete('/collection')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ids: ids}));

  if (response.status == 200) {
    collectionCreationRegistry.filter((collectionId: string) => { return ids.indexOf(collectionId) != -1 });
  } else {
    throw errorMessage('delete test collection', response);
  }
}

async function getAllCollection(): Promise<ItemCollection[]> {
  let response: supertest.Response = await testApp.get('/collection')
      .set('Content-Type', 'application/json')
      .send();

  if (response.status == 200) {
    return response.body;
  } else {
    throw errorMessage('get all collections', response);
  }
}

async function updateCollection(updatedCollection: ItemCollection): Promise<ItemCollection> {
  let response: supertest.Response = await testApp.patch('/collection')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(updatedCollection));

  if (response.status == 200) {
    return response.body;
  } else {
    throw errorMessage('update collection', response);
  }
}

async function cleanUp(): Promise<void> {
  await deleteCollections(collectionCreationRegistry);
}

beforeAll(() => {
  testApp = supertest('127.0.0.1:3000');
  collectionCreationRegistry = [];
});

afterAll(async () => {
  await cleanUp();
});

test('can create collection and read them back', async () => {
  let createdCollection = await createCollection();

  let response: ItemCollection[] = await getAllCollection();

  expect(doesResponseContainItem(response, createdCollection)).toBeTruthy();
});

test('can write collection and delete them', async () => {
  let createdCollection = await createCollection();
  await deleteCollections([createdCollection.id]);

  let response: ItemCollection[] = await getAllCollection();

  expect(doesResponseContainItem(response, createdCollection)).toBeFalsy();
});

test('can update collection to include more items', async () => {
  let createdCollection = await createCollection();
  createdCollection.items.push({
    id: 'foo bar',
    content: 'Some new content'
  });
  let updatedCollection = createdCollection;

  await updateCollection(updatedCollection);
  let response = await getAllCollection();

  expect(doesResponseContainItem(response, updatedCollection)).toBeTruthy();
});

test('can update collection to include less items', async () => {
  let createdCollection = await createCollection([item1, item2]);
  createdCollection.items = [item2]
  let updatedCollection = createdCollection;

  await updateCollection(updatedCollection);
  let response = await getAllCollection();

  expect(doesResponseContainItem(response, updatedCollection)).toBeTruthy();
});

// Ignores createTime
function areCollectionsEqual(expected: ItemCollection, actual: ItemCollection) {
  for (let field in expected) {
    if (!(field in actual)) {
      return false;
    }
    return expected[field as keyof ItemCollection] === actual[field as keyof ItemCollection];
  }
}

function doesResponseContainItem(response: ItemCollection[], item: ItemCollection): boolean {
  return response.filter((responseItem: ItemCollection) => areCollectionsEqual(responseItem, item)).length > 0;
}
