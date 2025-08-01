import crypto from 'crypto';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();

const rootDir = process.cwd();

function genKeyPair() {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });

  fs.writeFileSync(path.join(rootDir, 'id_rsa_pub.pem'), keyPair.publicKey);
  fs.writeFileSync(path.join(rootDir, 'id_rsa_priv.pem'), keyPair.privateKey);

  console.log('genKeyPair called');
}

if (!fs.existsSync(path.join(rootDir, 'id_rsa_pub.pem'))) {
  genKeyPair();
}
