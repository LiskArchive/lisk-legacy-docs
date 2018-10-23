# Lisk Elements User Guide

This section details how to use Lisk Elements, once you have successfully installed it.

- [Node.js](#nodejs)
- [Browser](#browser)
- [Monorepo structure](#monorepo-structure)
- [Packages](#packages)

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

```js
<script src="https://js.lisk.io/lisk-elements-1.0.0.min.js"></script>
<script>
    const transaction = lisk.transaction.transfer({
        amount: '100000000',
        recipientId: '15434119221255134066L',
        passphrase: 'robust swift grocery peasant forget share enable convince deputy road keep cheap',
    });
</script>
```

## Monorepo structure

Lisk Elements is a multi-package mono repository, and therefore consists of one main npm package `lisk-elements`, which includes multiple independent npm sub packages.
As every package is independent form all other packages , each package can be installed seperately using npm.

The general structure of the repository is realized with [lerna](https://github.com/lerna/lerna) and looks like the following:

```bash
lisk-elements/
  package.json
  packages/
    lisk-client/
      package.json
    lisk-api-client/
      package.json
    lisk-constants/
      package.json
    lisk-cryptography/
      package.json
    lisk-passphrase/
      package.json
    lisk-transactions/
      package.json
```

For usage regarding each package, see the following pages:

## Packages

| Package                                                 |                                                      Version                                                      | Description                                                        |
| ------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------ |
| [lisk-elements](packages/lisk-elements)                 | [![](https://img.shields.io/badge/npm-v1.0.0-green.svg)](https://www.npmjs.com/package/lisk-elements)             | Package contains everything                                        |
| [@liskhq/lisk-client](../user-guide/client/api)         | [![](https://img.shields.io/badge/npm-v1.0.0-green.svg)](https://www.npmjs.com/package/@liskhq/lisk-client)       | A default set of Elements for use by clients of the Lisk network   |
| [@liskhq/lisk-api-client](../user-guide/api-client/api) | [![](https://img.shields.io/badge/npm-v1.0.0-green.svg)](https://www.npmjs.com/package/@liskhq/lisk-api-client)   | An API client for the Lisk network                                 |
| [@liskhq/lisk-constants](../user-guide/constants)       | [![](https://img.shields.io/badge/npm-v1.0.0-green.svg)](https://www.npmjs.com/package/@liskhq/lisk-constants)    | General constants for use with Lisk-related software               |
| [@liskhq/lisk-cryptography](../user-guide/cryptography) | [![](https://img.shields.io/badge/npm-v1.0.0-green.svg)](https://www.npmjs.com/package/@liskhq/lisk-cryptography) | General cryptographic functions for use with Lisk-related software |
| [@liskhq/lisk-passphrase](../user-guide/mnemonic)       | [![](https://img.shields.io/badge/npm-v1.0.0-green.svg)](https://www.npmjs.com/package/@liskhq/lisk-passphrase)   | Mnemonic passphrase helpers for use with Lisk-related software     |
| [@liskhq/lisk-transactions](../user-guide/transactions) | [![](https://img.shields.io/badge/npm-v1.0.0-green.svg)](https://www.npmjs.com/package/@liskhq/lisk-transactions) | Everything related to transactions according to the Lisk protocol  |
