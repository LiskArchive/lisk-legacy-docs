# Lisk Elements Packages

This section details how to use Lisk Elements, once you have successfully installed it.

**Usage**
  - [Node.js](#nodejs)
  - [Browser](#browser)
  
**Packages**
  - [@liskhq/lisk-api-client](api-client/api-client.md): An API client for the Lisk network.
  - [@liskhq/lisk-client](client/client.md): A default set of Elements for use by clients of the Lisk network.
  - [@liskhq/lisk-constants](constants/constants.md): General constants for use with Lisk-related software.
  - [@liskhq/lisk-cryptography](cryptography/cryptography.md): General cryptographic functions for use with Lisk-related software.
  - [@liskhq/lisk-passphrase](passphrase/passphrase.md): Mnemonic passphrase helpers for use with Lisk-related software.
  - [@liskhq/lisk-transactions](transactions/transactions.md): Everything related to transactions according to the Lisk protocol.

## Usage

### Node.js

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

### Browser

Load the Lisk Elements script via our CDN. For example to load the minified version 1.1.0 of Lisk Elements include the following script, which will then expose the `lisk` variable:

```html
<script src="https://js.lisk.io/lisk-elements-1.1.0.min.js"></script>
<script>
    const transaction = lisk.transaction.transfer({
        amount: '100000000',
        recipientId: '15434119221255134066L',
        passphrase: 'robust swift grocery peasant forget share enable convince deputy road keep cheap',
    });
</script>
```
