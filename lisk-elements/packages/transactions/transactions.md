# Lisk Elements Transactions

The Lisk Elements transactions module provides functions for creating transactions of every type, plus a set of utility functions.

- [Installation](#installation)
- [Upgrade](#upgrade)
- [Constants](#constants)
- [Methods for creating transactions](#methods-for-creating-transactions)
  - [Type 0: transfer](#type-0-transfer)
  - [Type 1: register second passphrase](#type-1-registersecondpassphrase)
  - [Type 2: register delegate](#type-2-registerdelegate)
  - [Type 3: cast votes](#type-3-castvotes)
  - [Type 4: registerMultisignature](#type-4-registermultisignature)
- [Methods for creating signature objects](#methods-for-creating-signature-objects)
  - [createSignatureObject](#createSignatureObject)
- [Utility Methods](#utility-methods)
  - [convertBeddowsToLSK](#convertBeddowsToLSK)
  - [convertLSKToBeddows](#convertLSKToBeddows)
  - [getTransactionBytes](#getTransactionBytes)
  - [getTransactionId](#getTransactionId)
  - [multiSignTransaction](#multiSignTransaction)
  - [signTransaction](#signTransaction)
  - [validateAddress](#validateAddress)
  - [validateKeysgroup](#validateKeysgroup)
  - [validatePublicKey](#validatePublicKey)
  - [validatePublicKeys](#validatePublicKeys)
  - [verifyTransaction](#verifyTransaction)

## Installation

```bash
$ npm install --save @liskhq/lisk-transactions
```

## Upgrade

```bash
npm update --save @liskhq/lisk-transactions
```

## Constants

Transactions-specific constants are available via the `transaction` key, and include relevant fees and byte allocations for transaction components.

#### Examples

```js
import transactions from '@liskhq/lisk-transactions';

transactions.constants.FIXED_POINT; // Number to use when converting between the smallest possible denomination and 1 LSK.

transactions.constants.TRANSFER_FEE; // Fee required for a transfer (type 0) transaction.
transactions.constants.SIGNATURE_FEE; // Fee required for a register second passphrase (type 1) transaction.
transactions.constants.DELEGATE_FEE; // Fee required for a register delegate (type 2) transaction.
transactions.constants.VOTE_FEE; // Fee required for a cast votes (type 3) transaction.
transactions.constants.MULTISIGNATURE_FEE; // Fee required per group member (plus one) for a register multisignature account (type 4) transaction.

transactions.constants.BYTESIZES; // Object containing the number of bytes to allocate for each component of a transaction.
```

## Methods for creating transactions

### Type 0: `transfer`

Creates a transfer (type 0) transaction.

#### Syntax

```js
transfer(options)
```

#### Parameters

`options`: Options to be used when creating the transaction:
- `amount`: The amount to transfer (as a `string` in Beddows, the lowest denomination possible).
- `recipientId`: The address of the recipient. Either `recipientId` or `recipientPublicKey` must be provided.
- `recipientPublicKey`: The public key of the recipient. Either `recipientId` or `recipientPublicKey` must be provided.
- `data`: Optional data to include in the transaction asset. (Must be a UTF8-encoded string of maximum 64 characters.)
- `passphrase`: Optional passphrase to use to sign the transaction. If not provided at creation the transaction can be signed later.
- `secondPassphrase`: Optional second passphrase to use to sign the transaction if the account has registered a second passphrase. If not provided at creation the transaction can be signed with the second passphrase later.

#### Return value

`object`: The created transaction object.

#### Examples

```js
import transactions from '@liskhq/lisk-transactions';

transactions.transfer({
    amount: '123000000',
    recipientId: '12668885769632475474L',
}); // Unsigned transaction
/* {
    amount: '123000000',
    recipientId: '12668885769632475474L',
    senderPublicKey: null,
    timestamp: 65309415,
    type: 0,
    fee: '10000000',
    recipientPublicKey: null,
    asset: {}
} */

transactions.transfer({
    amount: '123000000',
    recipientId: '12668885769632475474L',
    data: 'Hello Lisk!',
    passphrase: 'robust swift grocery peasant forget share enable convince deputy road keep cheap',
}); // Signed transaction with data
/* {
    amount: '123000000',
    recipientId: '12668885769632475474L',
    senderPublicKey: '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
    timestamp: 65309545,
    type: 0,
    fee: '10000000',
    recipientPublicKey: null,
    asset: { data: 'Hello Lisk!' },
    signature: 'ed4d9856db56ebe9a3a2f610cd0406b2db2f7639aebe85ea014366bf2188ac4c53f3e08b48cae52c46bb17bb218114126bdbc92f50d315cd2c4f90de4bc2090a',
    id: '7057643366947113201',
 } */
```

### Type 1: `registerSecondPassphrase`

Creates a register second passphrase (type 1) transaction.

#### Syntax

```js
registerSecondPassphrase(options)
```

#### Parameters

`options`: Options to be used when creating the transaction:
- `secondPassphrase`: The second passphrase to register.
- `passphrase`: Optional passphrase to use to sign the transaction. If not provided at creation the transaction can be signed later.

#### Return value

`object`: The created transaction object.

#### Examples

```js
transactions.registerSecondPassphrase({
    secondPassphrase: 'drastic spot aerobic web wave tourist library first scout fatal inherit arrange',
}); // Unsigned transaction
/* {
    amount: '0',
    recipientId: '',
    senderPublicKey: null,
    timestamp: 65309702,
    type: 1,
    fee: '500000000',
    asset: {
        signature: {
            publicKey: '44fc724f611d822fbb946e4084d27cc07197bb3ab4d0406a17ade813cd7aee15',
        },
    },
} */

transactions.registerSecondPassphrase({
    secondPassphrase: 'drastic spot aerobic web wave tourist library first scout fatal inherit arrange',
    passphrase: 'robust swift grocery peasant forget share enable convince deputy road keep cheap',
}); // Signed transaction
/* {
    amount: '0',
    recipientId: '',
    senderPublicKey: '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
    timestamp: 65309811,
    type: 1,
    fee: '500000000',
    asset: {
        signature: {
            publicKey: '44fc724f611d822fbb946e4084d27cc07197bb3ab4d0406a17ade813cd7aee15',
        },
    },
    signature: '6ca03f099e24a9e0ad99db728d1e60a242e64a124a591332c1adefab7b0d4a8334ac6f8a796f9da332ffe6c6f62c0c0af4fd72ec88129a2eb2892a7fc582360f',
    id: '2058392482756095027',
 } */
```

### Type 2: `registerDelegate`

Creates a register delegate (type 2) transaction.

#### Syntax

```js
registerDelegate(options)
```

#### Parameters

`options`: Options to be used when creating the transaction:
- `username`: The delegate username to register.
- `passphrase`: Optional passphrase to use to sign the transaction. If not provided at creation the transaction can be signed later.
- `secondPassphrase`: Optional second passphrase to use to sign the transaction if the account has registered a second passphrase. If not provided at creation the transaction can be signed with the second passphrase later.

#### Return value

`object`: The created transaction object.

#### Examples

```js
transactions.registerDelegate({
    username: 'my first delegate',
}); // Unsigned transaction
/* {
    amount: '0',
    recipientId: '',
    senderPublicKey: null,
    timestamp: 65310046,
    type: 2,
    fee: '2500000000',
    asset: {
        delegate: {
            username: 'my first delegate',
        },
    },
} */

transactions.registerDelegate({
    username: 'my first delegate',
    passphrase: 'robust swift grocery peasant forget share enable convince deputy road keep cheap',
}); // Signed transaction
/* {
    amount: '0',
    recipientId: '',
    senderPublicKey: '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
    timestamp: 65310098,
    type: 2,
    fee: '2500000000',
    asset: {
        delegate: {
            username: 'my first delegate',
        },
    },
    signature: '7e563f05627cb9e308e38835c10a6e198451a61953ea989c4af9e594bf72f024fad7743591fadd3a0abb09d0aae8432fcb64c858bf4f5650dd6a8cb7b9bcb102',
    id: '8421900798644594201',
 } */
```

### Type 3: `castVotes`

Creates a cast votes (type 3) transaction.

#### Syntax

```js
castVotes(options)
```

#### Parameters

`options`: Options to be used when creating the transaction:
- `votes`: The public keys of the delegates to vote for.
- `unvotes`: The public keys of the delegates from whom you want to remove your vote.
- `passphrase`: Optional passphrase to use to sign the transaction. If not provided at creation the transaction can be signed later.
- `secondPassphrase`: Optional second passphrase to use to sign the transaction if the account has registered a second passphrase. If not provided at creation the transaction can be signed with the second passphrase later.

#### Return value

`object`: The created transaction object.

#### Examples

```js
transactions.castVotes({
    votes: ['9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f'],
}); // Unsigned transaction
/* {
    amount: '0',
    recipientId: null,
    senderPublicKey: null,
    timestamp: 65310301,
    type: 3,
    fee: '100000000',
    asset: {
        votes: [ '+9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f' ],
    },
} */

transactions.castVotes({
    votes: ['9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f'],
    unvotes: [
        '141b16ac8d5bd150f16b1caa08f689057ca4c4434445e56661831f4e671b7c0a',
        '3ff32442bb6da7d60c1b7752b24e6467813c9b698e0f278d48c43580da972135',
    ],
    passphrase: 'robust swift grocery peasant forget share enable convince deputy road keep cheap',
}); // Signed transaction
/* {
    amount: '0',
    recipientId: '8273455169423958419L',
    senderPublicKey: '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
    timestamp: 65310424,
    type: 3,
    fee: '100000000',
    asset:
    { votes:
        [
            '+9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
            '-141b16ac8d5bd150f16b1caa08f689057ca4c4434445e56661831f4e671b7c0a',
            '-3ff32442bb6da7d60c1b7752b24e6467813c9b698e0f278d48c43580da972135',
        ],
    },
    signature: 'b6584c57fbfd79850b948a1f635a26aca93b4de4bb5c771c6a2d4c60d559e98abedff7daff923e6faf0195fceadca4201b29c3845a7f3bd644ccb47f26bb4800',
    id: '3341515364155323205',
 } */
```

### Type 4: `registerMultisignature`

Creates a register multisignature account (type 4) transaction.

#### Syntax

```js
registerMultisignature(options)
```

#### Parameters

`options`: Options to be used when creating the transaction:
- `keysgroup`: An array of public keys which should form part of the multisignature group.
- `lifetime`: The time to wait for enough signatures before a transaction becomes invalid.
- `minimum`: The minimum number of signatures required to authorise a transaction.
- `passphrase`: Optional passphrase to use to sign the transaction. If not provided at creation the transaction can be signed later.
- `secondPassphrase`: Optional second passphrase to use to sign the transaction if the account has registered a second passphrase. If not provided at creation the transaction can be signed with the second passphrase later.

#### Return value

`object`: The created transaction object.

#### Examples

```js
transactions.registerMultisignature({
    keysgroup: [
        '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
        '141b16ac8d5bd150f16b1caa08f689057ca4c4434445e56661831f4e671b7c0a',
        '3ff32442bb6da7d60c1b7752b24e6467813c9b698e0f278d48c43580da972135',
    ],
    lifetime: 34,
    minimum: 2,
}); // Unsigned transaction
/* {
    amount: '0',
    recipientId: '',
    senderPublicKey: null,
    timestamp: 65310891,
    type: 4,
    fee: '2000000000',
    asset: {
        multisignature: {
            min: 2,
            lifetime: 34,
            keysgroup: [
                '+9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
                '+141b16ac8d5bd150f16b1caa08f689057ca4c4434445e56661831f4e671b7c0a',
                '+3ff32442bb6da7d60c1b7752b24e6467813c9b698e0f278d48c43580da972135',
            ],
        },
    },
} */

transactions.registerMultisignature({
    keysgroup: [
        '9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
        '141b16ac8d5bd150f16b1caa08f689057ca4c4434445e56661831f4e671b7c0a',
        '3ff32442bb6da7d60c1b7752b24e6467813c9b698e0f278d48c43580da972135',
    ],
    lifetime: 34,
    minimum: 2,
    passphrase: 'robust swift grocery peasant forget share enable convince deputy road keep cheap',
}); // Signed transaction
/* {
    amount: '0',
    recipientId: '',
    senderPublicKey: null,
    timestamp: 65310891,
    type: 4,
    fee: '2000000000',
    asset: {
        multisignature: {
            min: 2,
            lifetime: 34,
            keysgroup: [
                '+9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f',
                '+141b16ac8d5bd150f16b1caa08f689057ca4c4434445e56661831f4e671b7c0a',
                '+3ff32442bb6da7d60c1b7752b24e6467813c9b698e0f278d48c43580da972135',
            ],
        },
    },
    signature: '74df8ac3d8c3de7ccc4cee021bc15b837800523b6dc81d46d6ec42e00a75ee6c72e7857f0a0efd7adf1e8e8ba42ccd08d3fb27042e28395426fb825823055207',
    id: '2588740215018444199',
 } */
```

## Methods for creating signature objects

### createSignatureObject

Creates a signature object for a transaction from a multisignature account.

#### Syntax

```js
createSignatureObject(transaction, passphrase)
```

#### Parameters

`transaction`: The multisignature transaction to sign.

`passphrase`: Passphrase to use to sign the transaction.

#### Return value

`object`: The signature object which can be broadcast to the network. Contains `transactionId`, `publicKey` and `signature` hex `string`s.

#### Examples

```js
transactions.createSignatureObject({
    amount: '100',
    recipientId: '123L',
    senderPublicKey: '0b68c5d745d47998768a14b92b221ded2292e21b62846f8f968fdbcd9b52ae4d',
    timestamp: 65568696,
    type: 0,
    fee: '10000000',
    recipientPublicKey: null,
    asset: {},
    signature: 'ae6a6f11527213a5eb9b7b673579f06ec94722fd07c9cbd5269e0ce34b659453712c0ff259454dbad9eb4d3f713cb6deb446a18cea067dafa8828bed219f8104',
    id: '7601088739759476607',
});
/* {
    transactionId: '7601088739759476607',
    publicKey: '21b574e0eb66b550bb20d4e8b07a9e4a02f7c52cbaad51753dc915c21f395644',
    signature: 'dde5372986f26a3b4f52ba40b25d7d363a97801db207346c7aa7bffa2779b74466cb9b960f120a19e2f920f688fd0fc60bdc04e54b0a67cbfffb75339a72600a',
} */
```

## Utility methods

### convertBeddowsToLSK

Converts amounts in Beddows (the smallest denomination) to amounts in whole LSK.

#### Syntax

```js
convertBeddowsToLSK(amount)
```

#### Parameters

`amount`: `string` decimal representation of amount to be converted.

#### Return value

`string`: Amount in LSK.

#### Examples

```js
transactions.utils.convertBeddowsToLSK('100000'); // '0.001'
```

### convertLSKToBeddows

Converts amounts in whole LSK to amounts in Beddows (the smallest denomination).

#### Syntax

```js
convertLSKToBeddows(amount)
```

#### Parameters

`amount`: `string` decimal representation of amount to be converted.

#### Return value

`string`: Amount in Beddows.

#### Examples

```js
transactions.utils.convertLSKToBeddows('0.001'); // '100000'
```

### getTransactionBytes

Returns a byte array representation of a transaction object.

#### Syntax

```js
getTransactionBytes(transaction)
```

#### Parameters

`transaction`: `object` representation of a transaction.

#### Return value

`buffer`: Byte array representation of the transaction

#### Examples

```js
transactions.utils.getTransactionBytes({
    amount: '100',
    recipientId: '123L',
    senderPublicKey: '0b68c5d745d47998768a14b92b221ded2292e21b62846f8f968fdbcd9b52ae4d',
    timestamp: 65568696,
    type: 0,
    fee: '10000000',
    recipientPublicKey: null,
    asset: {},
    signature: 'ae6a6f11527213a5eb9b7b673579f06ec94722fd07c9cbd5269e0ce34b659453712c0ff259454dbad9eb4d3f713cb6deb446a18cea067dafa8828bed219f8104',
    id: '7601088739759476607',
}); // <Buffer 00 b8 7f e8 03 0b 68 c5 d7 45 d4 79 98 76 8a 14 b9 2b 22 1d ed 22 92 e2 1b 62 84 6f 8f 96 8f db cd 9b 52 ae 4d 00 00 00 00 00 00 00 7b 64 00 00 00 00 ... >
```

### getTransactionId

Returns a transaction ID for a transaction.

#### Syntax

```js
getTransactionId(transaction)
```

#### Parameters

`transaction`: The transaction whose ID is required.

#### Return value

`string`: The transaction ID.

#### Examples

```js
transactions.utils.getTransactionId({
    amount: '100',
    recipientId: '123L',
    senderPublicKey: '0b68c5d745d47998768a14b92b221ded2292e21b62846f8f968fdbcd9b52ae4d',
    timestamp: 65568696,
    type: 0,
    fee: '10000000',
    recipientPublicKey: null,
    asset: {},
    signature: 'ae6a6f11527213a5eb9b7b673579f06ec94722fd07c9cbd5269e0ce34b659453712c0ff259454dbad9eb4d3f713cb6deb446a18cea067dafa8828bed219f8104',
}); // '7601088739759476607'
```

### multiSignTransaction

Signs a transaction from a multisignature account using a passphrase.

#### Syntax

```js
multiSignTransaction(transaction, passphrase)
```

#### Parameters

`transaction`: The multisignature transaction to sign.

`passphrase`: The passphrase to use to sign the transaction.

#### Return value

`string`: The signature.

#### Examples

```js
transactions.utils.multiSignTransaction(
    {
        amount: '100',
        recipientId: '123L',
        senderPublicKey: '0b68c5d745d47998768a14b92b221ded2292e21b62846f8f968fdbcd9b52ae4d',
        timestamp: 65568696,
        type: 0,
        fee: '10000000',
        recipientPublicKey: null,
        asset: {},
        signature: 'ae6a6f11527213a5eb9b7b673579f06ec94722fd07c9cbd5269e0ce34b659453712c0ff259454dbad9eb4d3f713cb6deb446a18cea067dafa8828bed219f8104',
    },
    'robust swift grocery peasant forget share enable convince deputy road keep cheap'
); // '27072c5eb4861792280bf3fc09f3bc7b0f81694cfd728cb810bf9fc4b18127d2885cf5235aa8e01d632092030e62f94b9b53394297cdd6a79b180f5e169dc80b'
```

### signTransaction

Signs a transaction using a passphrase.

#### Syntax

```js
signTransaction(transaction, passphrase)
```

#### Parameters

`transaction`: The transaction to sign.

`passphrase`: The passphrase to use to sign the transaction.

#### Return value

`string`: The signature.

#### Examples

```js
transactions.utils.signTransaction(
    {
        amount: '100',
        recipientId: '123L',
        senderPublicKey: '0b68c5d745d47998768a14b92b221ded2292e21b62846f8f968fdbcd9b52ae4d',
        timestamp: 65568696,
        type: 0,
        fee: '10000000',
        recipientPublicKey: null,
        asset: {},
    },
    'robust swift grocery peasant forget share enable convince deputy road keep cheap'
); // '27072c5eb4861792280bf3fc09f3bc7b0f81694cfd728cb810bf9fc4b18127d2885cf5235aa8e01d632092030e62f94b9b53394297cdd6a79b180f5e169dc80b'
```

### validateAddress

Validates a Lisk address.

#### Syntax

```js
validateAddress(address)
```

#### Parameters

`address`: The Lisk address to validate.

#### Return value

`boolean`: `true` if the address is valid, otherwise an error will be thrown.

#### Examples

```js
transactions.utils.validateAddress('12981844261447786907L'); // true
```

### validateKeysgroup

Validates a keysgroup for a multisignature account.

#### Syntax

```js
validateKeysgroup(keysgroup)
```

#### Parameters

`keysgroup`: The keysgroup to validate.

#### Return value

`boolean`: `true` if the keysgroup is an array of public keys which are all valid and which contains no duplicates and which is of a valid length. Otherwise an error will be thrown.

#### Examples

```js
transactions.utils.validateKeysgroup([]); // Throws 'Expected between 1 and 16 public keys in the keysgroup.'
```

### validatePublicKey

Validates a public key.

#### Syntax

```js
validatePublicKey(publicKey)
```

#### Parameters

`publicKey`: The public key to validate.

#### Return value

`boolean`: `true` if the public key is valid, otherwise an error will be thrown.

#### Examples

```js
transactions.utils.validatePublicKey('0b68c5d745d47998768a14b92b221ded2292e21b62846f8f968fdbcd9b52ae4d'); // true
```

### validatePublicKeys

Validates an array of public keys.

#### Syntax

```js
validatePublicKeys(publicKeys)
```

#### Parameters

`publicKeys`: The public keys to validate.

#### Return value

`boolean`: `true` if the public keys are all valid and there are no duplicates, otherwise an error will be thrown.

#### Examples

```js
transactions.utils.validatePublicKeys([
    '0b68c5d745d47998768a14b92b221ded2292e21b62846f8f968fdbcd9b52ae4d',
    '0b68c5d745d47998768a14b92b221ded2292e21b62846f8f968fdbcd9b52ae4d'
]); // Throws 'Error: Duplicated public key: 0b68c5d745d47998768a14b92b221ded2292e21b62846f8f968fdbcd9b52ae4d.'
```

### `validateTransaction`

Checks whether the input transaction object has valid schema or not.

#### Syntax

```js
validateTransaction(transaction)
```

#### Parameters

`transaction`: The transaction to validate.

#### Return value

```
{
  valid: boolean,
  errors: [{
    dataPath: string,
    message: string
  }]
}
```

where `boolean`: `true` if the transaction object (without signature) is valid, `false` if not.


#### Examples

```js
transactions.utils.validateTransaction({
    amount: '100',
    recipientId: '123L',
    senderPublicKey: '0b68c5d745d47998768a14b92b221ded2292e21b62846f8f968fdbcd9b52ae4d',
    timestamp: 65568696,
    type: 0,
    fee: '10000000',
    recipientPublicKey: null,
    asset: {},
}); // true
```

### verifyTransaction

Verifies the signature (and optionally the second signature) for a passphrase.

#### Syntax

```js
verifyTransaction(transaction, [secondPublicKey])
```

#### Parameters

`transaction`: The transaction to verify.

`secondPublicKey`: The second public key to check if the transaction has a second signature which should be verified.

#### Return value

`boolean`: `true` if the signature is valid, `false` if not.

#### Examples

```js
transactions.utils.verifyTransaction({
    amount: '100',
    recipientId: '123L',
    senderPublicKey: '0b68c5d745d47998768a14b92b221ded2292e21b62846f8f968fdbcd9b52ae4d',
    timestamp: 65568696,
    type: 0,
    fee: '10000000',
    recipientPublicKey: null,
    asset: {},
    signature: 'ae6a6f11527213a5eb9b7b673579f06ec94722fd07c9cbd5269e0ce34b659453712c0ff259454dbad9eb4d3f713cb6deb446a18cea067dafa8828bed219f8104',
}); // true
```
