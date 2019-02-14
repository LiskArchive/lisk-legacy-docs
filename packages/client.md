# Lisk Client

Provides a default set of Elements for use by clients of the Lisk network.

> The `Client` package is a collection of the following packages:
> [api-client](../api-client/api-client.md), [constants](constants.md), [cryptography](cryptography/cryptography.md), [passphrase](passphrase.md), [transactions](transactions.md) |

Lisk Elements will include a lot of different packages in the future, which can be plugged in to application as desired.

For better usability Lisk Elements provides special wrapper packages like `lisk-client`, which group packages that are often used in the same context.

- [Installation](#installation)
- [Upgrade](#upgrade)
- [Usage](#usage)

## Installation

Add Lisk Client as a dependency of your project:

```bash
$ npm install --save @liskhq/lisk-client
```

## Upgrade

```bash
npm update --save @liskhq/lisk-client
```

## Usage

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
