let fs = require('fs')
import { Item } from './data-types'
const TEST_DATA_PATH = './test-data/v1.json'

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


function getAllItems(): Promise<Item[]> {
		if (!shouldUseRealDatabase()) {
			return readTestData();
		}
}

function addItem(item: Item): Promise<Item[]> {
	if (!shouldUseRealDatabase()) {
		return getAllItems()
				.then((items: Item[]) => {
					items.push(item);
					return writeTestData(items).then(() => {
						return items;
					});
				});
	}
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
}

export { getAllItems, addItem, removeItem }
