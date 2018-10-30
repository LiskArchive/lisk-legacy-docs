# Lisk Elements Packages

## Table of contents

- [Lisk Elements](#lisk-elements)
  - [Node.js](#nodejs)
  - [Browser](#browser)
- [Packages](#lisk-elemments-packages)
  - [lisk-api-client](api-client/api-client.md)
  - [lisk-client](client/client.md)
  - [lisk-constants](constants/constants.md)
  - [lisk-cryptography](cryptography/cryptography.md)
  - [lisk-passphrase](passphrase/passphrase.md)
  - [lisk-transactions](transactions/transactions.md)
## Packages

| Package                                                 |                                                      Version                                                      | Description                                                        |
| ------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------ |
| [lisk-elements](packages/lisk-elements)                 | [![](https://img.shields.io/badge/npm-v1.0.0-green.svg)](https://www.npmjs.com/package/lisk-elements)             | Package contains everything                                        |
| [@liskhq/lisk-client](/client/api)         | [![](https://img.shields.io/badge/npm-v1.0.0-green.svg)](https://www.npmjs.com/package/@liskhq/lisk-client)       | A default set of Elements for use by clients of the Lisk network   |
| [@liskhq/lisk-api-client](/api-client/api) | [![](https://img.shields.io/badge/npm-v1.0.0-green.svg)](https://www.npmjs.com/package/@liskhq/lisk-api-client)   | An API client for the Lisk network                                 |
| [@liskhq/lisk-constants](/constants)       | [![](https://img.shields.io/badge/npm-v1.0.0-green.svg)](https://www.npmjs.com/package/@liskhq/lisk-constants)    | General constants for use with Lisk-related software               |
| [@liskhq/lisk-cryptography](/cryptography) | [![](https://img.shields.io/badge/npm-v1.0.0-green.svg)](https://www.npmjs.com/package/@liskhq/lisk-cryptography) | General cryptographic functions for use with Lisk-related software |
| [@liskhq/lisk-passphrase](/mnemonic)       | [![](https://img.shields.io/badge/npm-v1.0.0-green.svg)](https://www.npmjs.com/package/@liskhq/lisk-passphrase)   | Mnemonic passphrase helpers for use with Lisk-related software     |
| [@liskhq/lisk-transactions](/transactions) | [![](https://img.shields.io/badge/npm-v1.0.0-green.svg)](https://www.npmjs.com/package/@liskhq/lisk-transactions) | Everything related to transactions according to the Lisk protocol  |


This section details how to use Lisk Elements, once you have successfully installed it.



## Node.js

Simply import (or require) the package and access its functionality according to the relevant namespace.

```js
import lisk from 'lisk-elements';

const transaction = lisk.transaction.transfer({
    amount: '100000000',
    recipientId: '15434119221255134066L',
    passphrase: 'robust swift grocery peasant forget share enable convince deputy road keep cheap',
});
```

Equivalent using `require` syntax:

```js
const lisk = require('lisk-elements').default;

const transaction = lisk.transaction.transfer({
    amount: '100000000',
    recipientId: '15434119221255134066L',
    passphrase: 'robust swift grocery peasant forget share enable convince deputy road keep cheap',
});
```

## Browser

Load the Lisk Elements script via our CDN. For example to load the minified version 1.0.0 of Lisk Elements include the following script, which will then expose the `lisk` variable:

```html
<script src="https://js.lisk.io/lisk-elements-1.0.0.min.js"></script>
<script>
    const transaction = lisk.transaction.transfer({
        amount: '100000000',
        recipientId: '15434119221255134066L',
        passphrase: 'robust swift grocery peasant forget share enable convince deputy road keep cheap',
    });
</script>
```
