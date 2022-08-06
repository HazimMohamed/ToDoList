let uuid = require('uuid');

class Item {
  id: string;
  createTime: Date;
  content: string | undefined;

  constructor(content: string, createTime: Date = undefined) {
    this.id = uuid.uuidv4();
    this.content = content;
    this.createTime = createTime;
  }
}

export { Item }