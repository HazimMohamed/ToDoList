import * as uuid from 'uuid';

export class Item {
  id: string;
  content: string;
  createTime: Date | undefined;


  constructor(content: string, createTime: Date | undefined = undefined) {
    this.id = uuid.v4()
    this.content = content;
    this.createTime = createTime;
  }
}