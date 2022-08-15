import {PIMongoClient} from './mongo-client';
import {Collection, MongoClient} from 'mongodb';
import {Random} from 'random';
import {encrypt} from '../encryption/encryption-client';
//
// function usersHandle() : Promise<Collection<Document>> {
//   // return PIMongoClient.getInstance().execute((mongoClient: MongoClient) => {
//   //   return Promise.resolve(mongoClient.db('authentication').collection('users'));
//   // })
// }
//
// function getUser(userId: string) {
//   return usersHandle().then((handle) => {
//     return handle.insertOne({
//           user: userId
//        });
//   );
// }
//
// function createUser(username: string, passwordHash: string) {
//   let salt = new Random().next() + '';
//   let saltedHashedPassword = encrypt(Buffer.from(passwordHash), Buffer.from(salt));
//   return usersHandle().then((handle: Collection<Document>) => {
//     return handle
//         .insertOne({
//           username: username,
//           password: saltedHashedPassword,
//           salt: salt
//         });
//   });
// }
//
// export {getUser, createUser};