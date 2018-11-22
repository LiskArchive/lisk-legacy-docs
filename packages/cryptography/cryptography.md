# Lisk Elements Cryptography

The Lisk Elements cryptography module provides all the cryptographic functionality necessary when interacting with the Lisk ecosystem.

- [Installation](#installation)
- [Upgrade](#upgrade)
- [Usage](#usage)
- [Methods for converting between formats](#methods-for-converting-between-formats)
  - [bufferToHex](#buffertohex)
  - [getAddressFromPublicKey](#getAddressFromPublicKey)
  - [HexToBuffer](#hextobuffer)
  - [parseEncryptedPassphrase](#parseEncryptedPassphrase)
  - [stringifyEncryptedPassphrase](#stringifyEncryptedPassphrase)
- [Methods for encrypting and decrypting](#methods-for-encrypting-and-decrypting)
  - [decryptMessageWithPassphrase](#decryptMessageWithPassphrase)
  - [decryptPassphraseWithPassword](#decryptPassphraseWithPassword)
  - [encryptMessageWithPassphrase](#encryptMessageWithPassphrase)
  - [encryptPassphraseWithPassword](#encryptPassphraseWithPassword)
- [Methods for hashing](#methods-for-hashing)
  - [hash](#hash)
- [Methods for managing keys](#methods-for-managing-keys)
  - [getAddressAndPublicKeyFromPassphrase](#getAddressAndPublicKeyFromPassphrase)
  - [getAddressFromPassphrase](#getAddressFromPassphrase)
  - [getKeys](#getKeys)
  - [getPrivateAndPublicKeyFromPassphrase](#getPrivateAndPublicKeyFromPassphrase)
  - [printSignedMessage](#printSignedMessage)
- [Methods for signing and verifying](#methods-for-signing-and-verifying)
  - [printSignedMessage](#printSignedMessage)
  - [signAndPrintMessage](#signAndPrintMessage)
  - [signMessageWithPassphrase](#signMessageWithPassphrase)
  - [signMessageWithTwoPassphrases](#signMessageWithTwoPassphrases)
  - [verifyMessageWithPublicKey](#verifyMessageWithPublicKey)
  - [verifyMessageWithTwoPublicKeys](#verifyMessageWithTwoPublicKeys)

## Installation

Add Lisk Client as a dependency of your project:

```bash
npm install --save @liskhq/lisk-cryptography
```

## Upgrade

```bash
npm update --save @liskhq/lisk-cryptography
```

## Usage

The `lisk-cryptography` package can be used on server-side as well as client-side code.

In case `lisk-cryptography` is used server-side, you may want to speed up the application by using the [sodium-native](https://github.com/sodium-friends/sodium-native) library.

To do this, expose `NACL_FAST=enable` as environment variable:

```bash
export NACL_FAST=enable
```

To switch back to [TweetNaCl.js](https://github.com/dchest/tweetnacl-js) library, which is slower but can also be executed on client-side, set it to `disable`:

```bash
export NACL_FAST=disable
```

... or unset it completely:

```bash
unset NACL_FAST
```

## Methods for converting between formats

Methods for converting between different formats.

### bufferToHex

Converts a buffer or byte array to a hex string.

#### Syntax

```js
bufferToHex(buffer)
```

#### Parameters

`buffer`: The buffer to convert into hex string format.

#### Return value

`string`: The hex string representation of the buffer.

#### Examples

```js
import cryptography from '@liskhq/lisk-cryptography';

const buffer = Buffer.from([0xab, 0xcd, 0x12, 0x34]);
cryptography.bufferToHex(buffer); // 'abcd1234'
```

### getAddressFromPublicKey

Converts a public key into a Lisk address.

#### Syntax

```js
getAddressFromPublicKey(publicKey)
```

#### Parameters

`publicKey`: The public key (as a buffer or hex string) to convert.

#### Return value

`string`: The Lisk address for the public key.

#### Examples

```js
const publicKey = '968ba2fa993ea9dc27ed740da0daf49eddd740dbd7cb1cb4fc5db3a20baf341b';
cryptography.getAddressFromPublicKey(publicKey); // '12668885769632475474L'
```

### hexToBuffer

Converts a hex string to a buffer.

#### Syntax

```js
hexToBuffer(hexString)
```

#### Parameters

`hexString`: The string to convert to a buffer.

#### Return value

`buffer`: The created buffer.

#### Examples

```js
const hex = 'abcd1234';
cryptography.hexToBuffer(hex); // <Buffer ab cd 12 34>
```

### parseEncryptedPassphrase

Parses an encrypted passphrase string as an object.

#### Syntax

```js
parseEncryptedPassphrase(encryptedPassphrase)
```

#### Parameters

`encryptedPassphrase`: The stringified encrypted passphrase to parse.

#### Return value

`object`: The parsed encrypted passphrase.

#### Examples

```js
const encryptedPassphrase = 'iterations=1000000&salt=bce40d3176e31998ec435ffc2993b280&cipherText=99bb7eff6755ecfe1dfa0368328c2d10589d7b85a23f75043497d7bdf7f14fb84e8caee1f9bc4b9543ba320e7f10801b0ff2065427d55c3139cf15e3b626b54f73b72a5b993323a6d60ec4aa407472ae&iv=51bcc76bbd0ab97b2292e305&tag=12e8fcfe7ad735fa9957baa48442e205&version=1';
cryptography.parseEncryptedPassphrase(encryptedPassphrase);
/* {
    iterations: 1000000,
    salt: 'bce40d3176e31998ec435ffc2993b280',
    cipherText: '99bb7eff6755ecfe1dfa0368328c2d10589d7b85a23f75043497d7bdf7f14fb84e8caee1f9bc4b9543ba320e7f10801b0ff2065427d55c3139cf15e3b626b54f73b72a5b993323a6d60ec4aa407472ae',
    iv: '51bcc76bbd0ab97b2292e305',
    tag: '12e8fcfe7ad735fa9957baa48442e205',
    version: '1',
} */
```

### stringifyEncryptedPassphrase

Converts an encrypted passphrase object to a string for convenient storage.

#### Syntax

```js
stringifyEncryptedPassphrase(encryptedPassphrase)
```

#### Parameters

`encryptedPassphrase`: The encrypted passphrase object to convert into a string.

#### Return value

`string`: The encrypted passphrase as a string.

#### Examples

```js
const encryptedPassphrase = cryptography.encryptPassphraseWithPassword(
    'robust swift grocery peasant forget share enable convince deputy road keep cheap',
    'some secure password'
);
cryptography.stringifyEncryptedPassphrase(encryptedPassphrase); // 'iterations=1000000&salt=bce40d3176e31998ec435ffc2993b280&cipherText=99bb7eff6755ecfe1dfa0368328c2d10589d7b85a23f75043497d7bdf7f14fb84e8caee1f9bc4b9543ba320e7f10801b0ff2065427d55c3139cf15e3b626b54f73b72a5b993323a6d60ec4aa407472ae&iv=51bcc76bbd0ab97b2292e305&tag=12e8fcfe7ad735fa9957baa48442e205&version=1'
```

## Methods for encrypting and decrypting

### decryptMessageWithPassphrase

Decrypts a message that has been encrypted for a given public key using the
corresponding passphrase.

#### Syntax

```js
decryptMessageWithPassphrase(encryptedMessage, nonce, passphrase, senderPublicKey)
```

#### Parameters

`encryptedMessage`: The hex string representation of the encrypted message.

`nonce`: The hex string representation of the nonce used during encryption.

`passphrase`: The passphrase to be used in decryption.

`senderPublicKey`: The public key of the message sender (used to ensure the message was signed by the correct person).

#### Return value

`string`: The decrypted message.

#### Examples

```js
const decryptedMessage = cryptography.decryptMessageWithPassphrase(
    '7bef28e1ddb34902d2e006a36062805e597924c9885c142444bafb',
    '5c29c9df3f041529a5f9ba07c444a86cbafbfd21413ec3a7',
    'robust swift grocery peasant forget share enable convince deputy road keep cheap',
    '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f'
); // 'Hello Lisk!'
```

### decryptPassphraseWithPassword

Decrypts a passphrase that has been encrypted using a password.

#### Syntax

```js
decryptPassphraseWithPassword(encryptedPassphraseObject, password)
```

#### Parameters

`encryptedPassphraseObject`: The output of `encryptPassphraseWithPassword`. Contains `iterations`, `cipherText`, `iv`, `salt`, `tag`, and `version`.

`password`: The password to be used in decryption.

#### Return value

`string`: The decrypted passphrase.

#### Examples

```js
const encryptedPassphrase = {
    iterations: 1000000,
    salt: 'bce40d3176e31998ec435ffc2993b280',
    cipherText: '99bb7eff6755ecfe1dfa0368328c2d10589d7b85a23f75043497d7bdf7f14fb84e8caee1f9bc4b9543ba320e7f10801b0ff2065427d55c3139cf15e3b626b54f73b72a5b993323a6d60ec4aa407472ae',
    iv: '51bcc76bbd0ab97b2292e305',
    tag: '12e8fcfe7ad735fa9957baa48442e205',
    version: '1',
};
const decryptedPassphrase = cryptography.decryptPassphraseWithPassword(
    encryptedPassphrase,
    'some secure password'
); // 'robust swift grocery peasant forget share enable convince deputy road keep cheap'
```

### encryptMessageWithPassphrase

Encrypts a message under a recipient’s public key, using a passphrase to create a signature.

#### Syntax

```js
encryptMessageWithPassphrase(message, passphrase, recipientPublicKey)
```

#### Parameters

`message`: The plaintext message to encrypt.

`passphrase`: The passphrase used to sign the encryption and ensure message integrity.

`recipientPublicKey`: The public key to be used in encryption.

#### Return value

`object`: The result of encryption. Contains `nonce` and `encryptedMessage`, both in hex string format.

#### Examples

```js
const encryptedMessage = cryptography.encryptMessageWithPassphrase(
    'Hello Lisk!',
    'robust swift grocery peasant forget share enable convince deputy road keep cheap',
    '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f'
);
/* {
    encryptedMessage: '7bef28e1ddb34902d2e006a36062805e597924c9885c142444bafb',
    nonce: '5c29c9df3f041529a5f9ba07c444a86cbafbfd21413ec3a7',
} */
```

### encryptPassphraseWithPassword

Encrypts a passphrase under a password for secure storage.

#### Syntax

```js
encryptPassphraseWithPassword(passphrase, password, [iterations])
```

#### Parameters

`passphrase`: The passphrase to encrypt.

`password`: The password to be used in encryption.

`iterations`: The number of iterations to use when deriving a key from the password using PBKDF2. (Default if not provided is 1,000,000.)

#### Return value

`object`: The result of encryption. Contains `iterations`, `cipherText`, `iv`, `salt`, `tag` and `version`.

#### Examples

```js
const encryptedPassphrase = cryptography.encryptPassphraseWithPassword(
    'robust swift grocery peasant forget share enable convince deputy road keep cheap',
    'some secure password',
);
/* {
    iterations: 1000000,
    salt: 'bce40d3176e31998ec435ffc2993b280',
    cipherText: '99bb7eff6755ecfe1dfa0368328c2d10589d7b85a23f75043497d7bdf7f14fb84e8caee1f9bc4b9543ba320e7f10801b0ff2065427d55c3139cf15e3b626b54f73b72a5b993323a6d60ec4aa407472ae',
    iv: '51bcc76bbd0ab97b2292e305',
    tag: '12e8fcfe7ad735fa9957baa48442e205',
    version: '1',
} */
```

## Methods for hashing

### hash

Hashes an input using the SHA256 algorithm.

#### Syntax

```js
hash(data, [format])
```

#### Parameters

`data`: The data to hash provided as a buffer, or a string.

`format`: The format of the input data if provided as a string. Must be one of `hex` or `utf8`.

#### Return value

`buffer`: The result of hashing.

#### Examples

```js
cryptography.hash(Buffer.from([0xab, 0xcd, 0x12, 0x34])); // <Buffer 77 79 07 d5 4b 6a 45 02 bd 65 4c b4 ae 81 c5 f7 27 01 3b 5e 3b 93 cd 8b 53 d7 21 34 42 69 d3 b0>
cryptography.hash('abcd1234', 'hex'); // <Buffer 77 79 07 d5 4b 6a 45 02 bd 65 4c b4 ae 81 c5 f7 27 01 3b 5e 3b 93 cd 8b 53 d7 21 34 42 69 d3 b0>
cryptography.hash('abcd1234', 'utf8'); // <Buffer e9 ce e7 1a b9 32 fd e8 63 33 8d 08 be 4d e9 df e3 9e a0 49 bd af b3 42 ce 65 9e c5 45 0b 69 ae>
```

## Methods for managing keys

### getAddressAndPublicKeyFromPassphrase

Returns an object containing the address and public key for a provided passphrase.

#### Syntax

```js
getAddressAndPublicKeyFromPassphrase(passphrase)
```

#### Parameters

`passphrase`: The secret passphrase to process.

#### Return value

`object`: Contains `address` as a `string`, and `publicKey` as a hex `string`.

#### Examples

```js
cryptography.getAddressAndPublicKeyFromPassphrase(
    'robust swift grocery peasant forget share enable convince deputy road keep cheap'
);
/* {
    address: '8273455169423958419L',
    publicKey: '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
} */
```

### getAddressFromPassphrase

Returns the Lisk address for a provided passphrase.

#### Syntax

```js
getAddressFromPassphrase(passphrase)
```

#### Parameters

`passphrase`: The secret passphrase to process.

#### Return value

`string`: The address associated with the provided passphrase.

#### Examples

```js
cryptography.getAddressFromPassphrase(
    'robust swift grocery peasant forget share enable convince deputy road keep cheap'
); //'8273455169423958419L'
```

### getKeys

An alias for `getPrivateAndPublicKeyFromPassphrase`.

### `getPrivateAndPublicKeyBytesFromPassphrase`

Returns an object containing the private and public keys as `Uint8Array`s for a provided passphrase.

#### Syntax

```js
getPrivateAndPublicKeyBytesFromPassphrase(passphrase)
```

#### Parameters

`passphrase`: The secret passphrase to process.

#### Return value

`object`: Contains `privateKey` and `publicKey` as `Uint8Array`s.

#### Examples

```js
cryptography.getPrivateAndPublicKeyBytesFromPassphrase(
    'robust swift grocery peasant forget share enable convince deputy road keep cheap'
);
/* {
    privateKey: [Uint8Array],
    publicKey: [Uint8Array],
} */
```

### getPrivateAndPublicKeyFromPassphrase

Returns an object containing the private and public keys as hex `string`s for a provided passphrase.

#### Syntax

```js
getPrivateAndPublicKeyFromPassphrase(passphrase)
```

#### Parameters

`passphrase`: The secret passphrase to process.

#### Return value

`object`: Contains `privateKey` and `publicKey` as hex `string`s.

#### Examples

```js
cryptography.getPrivateAndPublicKeyFromPassphrase(
    'robust swift grocery peasant forget share enable convince deputy road keep cheap'
);
/* {
    privateKey: 'b092a6664e9eed658ff50fe796ee695b9fe5617e311e9e8a34eb340eb5b831549d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
    publicKey: '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
} */
```

## Methods for signing and verifying

### printSignedMessage

Outputs a string representation of a signed message object which is suitable for printing.

#### Syntax

```js
printSignedMessage(signedMessageObject)
```

#### Parameters

`signedMessageObject`: The result of calling `signMessageWithPassphrase` or `signMessageWithTwoPassphrases`.

#### Return value

`string`: The string representation of the signed message object.

#### Examples

```js
const stringToPrint = cryptography.printSignedMessage({
    message: 'Hello Lisk!',
    publicKey: '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
    signature: '125febe625b2d62381ff836c020de0b00297f7d2493fe6404bc6109fd70a55348555b7a66a35ac657d338d7fe329efd203da1602f4c88cc21934605676558401',
});
console.log(stringToPrint);
//-----BEGIN LISK SIGNED MESSAGE-----
//-----MESSAGE-----
//Hello Lisk!
//-----PUBLIC KEY-----
//9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f
//-----SIGNATURE-----
//125febe625b2d62381ff836c020de0b00297f7d2493fe6404bc6109fd70a55348555b7a66a35ac657d338d7fe329efd203da1602f4c88cc21934605676558401
//-----END LISK SIGNED MESSAGE-----
```

### signAndPrintMessage

Signs a message with one or two passphrases and outputs a string representation which is suitable for printing.

#### Syntax

```js
signAndPrintMessage(message, passphrase, [secondPassphrase])
```

#### Parameters

`message`:  The string message to sign.

`passphrase`: The secret passphrase to use to sign the message.

`secondPassphrase`: Optional second secret passphrase to use to sign the message.

#### Return value

`string`: The string representation of the signed message object.

#### Examples

```js
const stringToPrint = cryptography.signAndPrintMessage('Hello Lisk!',  'robust swift grocery peasant forget share enable convince deputy road keep cheap');
console.log(stringToPrint);
\-----BEGIN LISK SIGNED MESSAGE-----
\-----MESSAGE-----
Hello Lisk!
\-----PUBLIC KEY-----
9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f
\-----SIGNATURE-----
125febe625b2d62381ff836c020de0b00297f7d2493fe6404bc6109fd70a55348555b7a66a35ac657d338d7fe329efd203da1602f4c88cc21934605676558401
\-----END LISK SIGNED MESSAGE-----
```

### signMessageWithPassphrase

Signs a message with a passphrase.

#### Syntax

```js
signMessageWithPassphrase(message, passphrase)
```

#### Parameters

`message`:  The string message to sign.

`passphrase`: The secret passphrase to use to sign the message.

#### Return value

`object`: Contains `message`, `publicKey` corresponding to the passphrase and `signature` as a hex `string`.

#### Examples

```js
cryptography.signMessageWithPassphrase('Hello Lisk!',  'robust swift grocery peasant forget share enable convince deputy road keep cheap');
/* {
    message: 'Hello Lisk!',
    publicKey: '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
    signature: '125febe625b2d62381ff836c020de0b00297f7d2493fe6404bc6109fd70a55348555b7a66a35ac657d338d7fe329efd203da1602f4c88cc21934605676558401',
} */
```

### signMessageWithTwoPassphrases

Signs a message using a secret passphrase and a second secret passphrase.

#### Syntax

```js
signMessageWithTwoPassphrases(message, passphrase, secondPassphrase)
```

#### Parameters

`message`: The message to sign as a UTF8-encoded string or a buffer.

`passphrase`: The secret passphrase to be used in signing.

`secondPassphrase`: The second secret passphrase to be used in signing.

#### Return value

`object`: Contains `message` (the original input), `publicKey` (for the
passphrase as a hex `string`), `secondPublicKey` (for the second passphrase as a
hex `string`), `signature` (as a hex `string`) and `secondSignature` (as a hex
`string`).

#### Examples

```js
cryptography.signMessageWithTwoPassphrases(
    'Hello Lisk!',
    'robust swift grocery peasant forget share enable convince deputy road keep cheap',
    'weapon van trap again sustain write useless great pottery urge month nominee',
);
/* {
    message: 'Hello Lisk!',
    publicKey: '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
    secondPublicKey: '141b16ac8d5bd150f16b1caa08f689057ca4c4434445e56661831f4e671b7c0a',
    signature: '125febe625b2d62381ff836c020de0b00297f7d2493fe6404bc6109fd70a55348555b7a66a35ac657d338d7fe329efd203da1602f4c88cc21934605676558401',
    secondSignature: '97196d262823166ec9ae5145238479effe00204e763d43cc9539cc711277a6652e8266aace3622f9e8a08cd5de08115c06db15fee71a44a98172cfab58f91c01',
 } */
```

### verifyMessageWithPublicKey

Verifies that a signature for a given message matches the provided public key.

#### Syntax

```js
verifyMessageWithPublicKey(signedMessageObject)
```

#### Parameters

`signedMessageObject`: The result of calling `signMessageWithPassphrase`.

#### Return value

`boolean`: Returns `true` if the signature is valid, and `false` if not.

#### Examples

```js
cryptography.verifyMessageWithPublicKey({
    message: 'Hello Lisk!',
    publicKey: '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
    signature: '125febe625b2d62381ff836c020de0b00297f7d2493fe6404bc6109fd70a55348555b7a66a35ac657d338d7fe329efd203da1602f4c88cc21934605676558401',
}); // true
```

### verifyMessageWithTwoPublicKeys

Verifies that a signature and second signature for a given message match the provided public keys.

#### Syntax

```js
verifyMessageWithTwoPublicKeys(signedMessageObject)
```

#### Parameters

`signedMessageObject`: The result of calling `signMessageWithTwoPassphrases`.

#### Return value

`boolean`: Returns `true` if the signatures are valid, and `false` if not.

#### Examples

```js
cryptography.verifyMessageWithTwoPublicKeys({
    message: 'Hello Lisk!',
    publicKey: '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
    secondPublicKey: '141b16ac8d5bd150f16b1caa08f689057ca4c4434445e56661831f4e671b7c0a',
    signature: '125febe625b2d62381ff836c020de0b00297f7d2493fe6404bc6109fd70a55348555b7a66a35ac657d338d7fe329efd203da1602f4c88cc21934605676558401',
    secondSignature: '97196d262823166ec9ae5145238479effe00204e763d43cc9539cc711277a6652e8266aace3622f9e8a08cd5de08115c06db15fee71a44a98172cfab58f91c01',
}); // true
```
