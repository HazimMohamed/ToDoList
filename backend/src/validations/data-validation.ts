import {getAllItems} from '../clients/db-access';
import {Item} from '../model/data-types';

function assertObjectContainsField(obj: any, field: string) {
  if (!(field in obj)) {
    throw `Request must contain field \"${field}\"`;
  }
}
function assertValueIsOfPrimitiveType(val: any, type: string, fieldName: string) {
  if (!(typeof val == type)) {
    throw `Request field ${fieldName} must be of type ${type}`;
  }
}
function validateItemNotMalformed(data: any) {
  assertObjectContainsField(data, 'id');
  assertObjectContainsField(data, 'content');
  assertValueIsOfPrimitiveType(data['id'], 'string', 'id');
  assertValueIsOfPrimitiveType(data['content'], 'string', 'content');
}

function doesIdExist(id: string): Promise<boolean> {
  return getAllItems().then((items: Item[]) => {
    return items.map((item: Item) => item.id).includes(id);
  });
}

function validateDeleteRequestIsNotMalformed(data: any): void {
  let idToDelete: any = data['id'];
  if (idToDelete == undefined) {
    throw 'Request must set the \'id\' field';
  }
  if (typeof idToDelete !== 'string') {
    throw '\'id\' field must be a String';
  }
  let validationRegex: RegExp =  new RegExp('[0-9a-fA-F-]+');
  if (!validationRegex.test(idToDelete)) {
    throw `\'id\' must match regex ${validationRegex.source}`;
  }
}

export {validateDeleteRequestIsNotMalformed, validateItemNotMalformed, doesIdExist};