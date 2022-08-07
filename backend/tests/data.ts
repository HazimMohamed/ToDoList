import { v4 as uuid } from 'uuid';
import { Item } from '../src/data-types';

let item1: Item = {
  'id': uuid(),
  'content': 'Long live the king!',
  'createTime': undefined
}

let item2: Item = {
  'id': uuid(),
  'content': 'The old king is dead.',
  'createTime': undefined
}

let item3: Item = {
  'id': uuid(),
  'content': 'long live the new king!',
  'createTime': undefined
}

export {item1, item2, item3}