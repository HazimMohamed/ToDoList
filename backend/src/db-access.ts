import fs from 'fs';
import { Item } from './data-types'
import {MongoClient, WithId, Document, Collection} from 'mongodb';

const TEST_DATA_PATH = './test-db/v1.json'
const MONGO_URI = `mongodb+srv://todo-list-user:${process.env['MONGO_PASSWORD']}@startgazerv2.hojhz.mongodb.net`

function shouldUseRealDatabase() : boolean {
	let environmentFlag = process.env['CONNECT_TO_DB'];
	return environmentFlag && environmentFlag.toLowerCase() === 'true';
}



function readTestData() : Promise<Item[]> {
	return new Promise<Item[]>((resolve, reject) => {
		fs.exists(TEST_DATA_PATH, (exists: boolean) => {
			if (exists) {
				fs.readFile(TEST_DATA_PATH, {}, (err: any, buffer: Buffer) => {
					if (err) {
						reject(err);
						return;
					}
					resolve(buffer.length == 0 ? [] : JSON.parse(buffer.toString()));
				});
			} else {
				resolve([]);
			}
		});
	});
}

function writeTestData(items: Item[]) : Promise<void> {
	return new Promise<void>((resolve) => {
		fs.rm(TEST_DATA_PATH, () => {
			fs.writeFile(TEST_DATA_PATH, JSON.stringify(items), {}, () => {
				resolve();
			});
		});
	});
}

function connectToMongoDb(): Promise<Collection> {
	const mongoClient = new MongoClient(MONGO_URI);
	return mongoClient.connect().then((mongoClient) => {
		return mongoClient.db('todo-list').collection('items');
	});
}

let connection = shouldUseRealDatabase() ? connectToMongoDb() : undefined;

function mongoDbRecordToItem(record: WithId<Document>): Item {
	return {
		id: record['id'],
		content: record['content'],
		createTime: undefined
	}
}

function getAllItems(): Promise<Item[]> {
		if (!shouldUseRealDatabase()) {
			return readTestData();
		}

		return connection.then((collection) => {
			return collection.find().toArray();
		}).then((arrayOfResults) => {
			return arrayOfResults.map((record) => mongoDbRecordToItem(record));
		});
}

function addItem(item: Item): Promise<Item[]> {
	if (!shouldUseRealDatabase()) {
		return readTestData()
				.then((items: Item[]) => {
					items.push(item);
					return writeTestData(items).then(() => {
						return items;
					});
				});
	}

	return connection.then((collection: Collection<Document>) => {
		return collection.insertOne(item)
	}).then(() => {
		return getAllItems();
	});
}

function removeItem(itemId: string): Promise<Item[]> {
	if (!shouldUseRealDatabase()) {
		return getAllItems().then((items) => {
			let filteredItems = items.filter(item => item.id != itemId);
			return writeTestData(filteredItems).then(() => {
				return filteredItems;
			});
		});
	}

	return connection.then((collection: Collection<Document>) => {
		return collection.deleteOne({
			'id': itemId
		});
	}).then(() => {
		return getAllItems();
	});
}

export { getAllItems, addItem, removeItem }
