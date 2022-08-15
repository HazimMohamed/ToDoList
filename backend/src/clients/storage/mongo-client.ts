import {MongoClient} from 'mongodb';

type MongoCallback<T> = (MongoClient) => Promise<T> | T;

export class PIMongoClient {
  private static MONGO_URI = `mongodb+srv://todo-list-user:${process.env['MONGO_PASSWORD']}@startgazerv2.hojhz.mongodb.net`;

  connection: Promise<MongoClient>;
  private static instance: PIMongoClient;

  private constructor() {
    this.connection = MongoClient.connect(PIMongoClient.MONGO_URI);
  }

  static getInstance(): PIMongoClient {
    if (PIMongoClient.instance == undefined) {
      return new PIMongoClient();
    }
    return PIMongoClient.instance;
  }

  execute<T>(method: MongoCallback<T>): Promise<T> {
    return this.connection.then(method);
  }
}