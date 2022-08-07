import 'jest';
import {app} from '../src/test-server';
import {item1, item2, item3} from './data';
// @ts-ignore
import supertest from 'supertest';
import {Item} from '../src/data-types';

let testApp: supertest.SuperTest<any>;

// Used to clean up after tests.
let writtenIds: Array<string> = [];

beforeAll(() => {
  testApp = supertest(app);
});

beforeEach(() => {
  writtenIds = [];
});

afterEach(async () => {
  for (let id of writtenIds) {
    try {
      await deleteItem(id);
    } catch (e) {
      console.log(`Failed to clean up item with \"id\" ${id}. Error: ${e.toString()}`);
    }
  }
})

async function writeItem(item: any, expectedStatusCode: number = 200) {
  await testApp.post('/todo')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(item))
      .expect(expectedStatusCode);

  if (expectedStatusCode == 200) {
    writtenIds.push(item['id']);
  }
}

async function deleteItem(toDelete: string | object, expectedStatusCode: number = 200) {
  let deleteRequest = typeof toDelete === 'string' ? {'id': toDelete } : toDelete;

  await testApp.delete('/todo')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(deleteRequest))
      .expect(expectedStatusCode);

  if (expectedStatusCode == 200 && ('id' in deleteRequest)) {
    writtenIds = writtenIds.filter((writtenId: string) => writtenId != (deleteRequest as {'id' : string; }) ['id']);
  }
}

async function getAllItems() {
  return await testApp.get('/todo').expect(200);
}

test('can write items and read them back', async () => {
  await writeItem(item1);
  await writeItem(item2);
  await writeItem(item3);

  let response: supertest.Response = await getAllItems();

  expect(doesResponseContainItem(response.body, item1)).toBeTruthy();
  expect(doesResponseContainItem(response.body, item2)).toBeTruthy();
  expect(doesResponseContainItem(response.body, item3)).toBeTruthy();
});

test('can write items and delete', async () => {
  await writeItem(item1);
  await writeItem(item2);
  await deleteItem(item2.id);

  let response: supertest.Response = await getAllItems();

  expect(doesResponseContainItem(response.body, item1)).toBeTruthy();
  expect(doesResponseContainItem(response.body, item2)).toBeFalsy();
});

test('malformed create item returns 400', async () => {
  await writeItem({'id': 1234}, 400);
});

test('duplicate item return 409', async () => {
  await writeItem(item1);
  await writeItem(item1, 409);
});

test('malformed delete request returns 400', async () => {
  await deleteItem({'idd': '12345'}, 400);
});

test('delete for not existent item returns 404', async () => {
  await deleteItem(item1.id, 404);
});

// Ignores createTime
function areItemsEqual(expected: Item, actual: Item) {
  for (let field in expected) {
    if (field == 'createTime') {
      continue;
    }
    if (!(field in actual)) {
      return false;
    }
    return expected[field as keyof Item] === actual[field as keyof Item];
  }
}

function doesResponseContainItem(response: Item[], item: Item): boolean {
  return response.filter((responseItem: Item) => areItemsEqual(item, responseItem)).length > 0;
}
