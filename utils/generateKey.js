const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

fs.writeFileSync(path.resolve(__dirname, '../private.key'), privateKey);
fs.writeFileSync(path.resolve(__dirname, '../public.key'), publicKey);
