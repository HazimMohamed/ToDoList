import * as crypto from 'crypto';
import {Buffer} from 'buffer';
import fs from 'fs';

let key = readKey();

function readKey(): Buffer {
  let keyPassword = fs.readFileSync('./key.secret');
  return crypto.scryptSync(keyPassword, 'salt', 24);
}

function encrypt(data: Buffer, salt: Buffer): Buffer {
  let cipher: crypto.Cipher = crypto.createCipheriv('aes-192-gcm', key, '1');
  cipher.write(data);
  console.log(cipher.read(1_000_000));
  return Buffer.from('');
}

function decrypt(data: Buffer): Buffer {
  return Buffer.from('');
}

encrypt(Buffer.from('This is some data'));

export {encrypt, decrypt};