# Lisk Client

Provides a default set of Elements for use by clients of the Lisk network.

Info | Note
---- | ----
![info note](../../info-icon.png "Info Note") | The `Client` package is a collection of the following packages:
|   | [api-client](../api-client/api-client.md), [constants](../constants/constants.md), [cryptography](cryptography/cryptography.md), [passphrases](../passphrases/passphrases.md), [transactions](../transactions/transactions.md) |


Lisk Elements will include a lot of different packages in the future, which can be plugged in to application as desired.

For better usability Lisk Elements provides special wrapper packages like `lisk-client`, which group packages that are often used in the same context.

## Installation

### Installation via npm

Add Lisk Client as a dependency of your project:

```bash
$ npm install --save @liskhq/lisk-client
```

Import using ES6 modules syntax:

```js
import lisk from '@liskhq/lisk-client';
```

Or using Node.js modules:

```js
const lisk = require('@liskhq/lisk-client');
```

Or import specific namespaced functionality:

```js
import { APIClient, transactions } from '@liskhq/lisk-client';
// or
const { APIClient, transactions } = require('@liskhq/lisk-client');
```

### Installation via CDN

Include the following script using the following HTML. The `lisk` variable will be exposed.

```html
<script src="https://js.lisk.io/lisk-client-1.0.0.js"></script>
```

Or minified:

```html
<script src="https://js.lisk.io/lisk-client-1.0.0.min.js"></script>
```
