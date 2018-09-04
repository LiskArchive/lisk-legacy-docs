# Lisk Elements User Guide

This section details how to use Lisk Elements, once you have successfully installed it.

- [Node.js](user-guide#nodejs)
- [Browser](user-guide#browser)
- [Subpackages](user-guide#sub-packages)

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

## Sub-packages

For usage regarding each sub-package, see the following pages:

Subcategories | Description
--- | ---
[API Client](user-guide/api-client/api) | The Lisk Elements API Client provides a convenient wrapper for interacting with the public API of nodes on the Lisk network
[Constants](user-guide/constants) | The Constants object provides some handy general-purpose constants for use with the Lisk Ecosystem
[Cryptography](user-guide/cryptography) | The cryptography module provides all the cryptographic functionality necessary when interacting with the Lisk ecosystem
[Mnemonic](user-guide/mnemonic) | The passphrase module provides tools for generating and validating mnemonic passphrases
[Transactions](user-guide/transactions) | The transactions module provides functions for creating transactions of every type, plus a set of utility functions
