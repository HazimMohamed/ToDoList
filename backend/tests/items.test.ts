import 'jest';
import { app } from '../src/test-server';
import {item1, item2, item3} from './data';
// @ts-ignore
import supertest from 'supertest';
import {Item} from '../src/data-types';

async function writeItem(appInterface: supertest.SuperTest<any>, item: Item) {
  await appInterface.post('/todo').send(item).expect(200);
}

test('can write items and read them back', (done) => {
  supertest(app).get('/todo').then(res => {
    console.log('Tried to read back and got: ' + JSON.stringify(res));
    done();
  });
});

