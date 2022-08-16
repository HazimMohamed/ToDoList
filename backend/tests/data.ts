import { v4 as uuid } from 'uuid';
import { Item } from '../src/model/data-types';

let item1: Item = {
  'id': uuid().toString(),
  'content': 'Long live the king!',
}

let item2: Item = {
  'id': uuid().toString(),
  'content': 'The old king is dead.',
}

let item3: Item = {
  'id': uuid().toString(),
  'content': 'long live the new king!',
}

export {item1, item2, item3}