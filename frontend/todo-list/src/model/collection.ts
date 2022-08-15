import {Item} from './item';

export interface Collection {
  id: string;

  title: string;

  items: Item[];
}