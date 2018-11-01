# Lisk Elements Constants

The Lisk Elements Constants object provides some handy general-purpose constants for use with the Lisk Ecosystem.

- [Installation](#installation)
- [Upgrade](#upgrade)
- [Usage](#usage)

## Installation

Add Lisk Client as a dependency of your project:

```bash
$ npm install --save @liskhq/lisk-constants
```

## Upgrade

```bash
npm update --save @liskhq/lisk-constants
```


## Usage

```js
import lisk from 'lisk-elements';

lisk.constants.EPOCH_TIME; // Date from which timestamps are calculated.
lisk.constants.EPOCH_TIME_MILLISECONDS; // EPOCH_TIME as milliseconds since Unix Epoch.
lisk.constants.EPOCH_TIME_SECONDS; // EPOCH_TIME as seconds since Unix Epoch.

lisk.constants.MAX_ADDRESS_NUMBER; // Maximum valid number which can form an address when suffixed with an 'L'.
lisk.constants.MAX_TRANSACTION_AMOUNT; // Maximum valid amount for a transaction.

lisk.constants.SIGNED_MESSAGE_PREFIX; // The prefix attached to all messages signed according to the Lisk message signature protocol.

lisk.constants.BETANET_NETHASH; // Nethash for Betanet.
lisk.constants.TESTNET_NETHASH; // Nethash for Testnet.
lisk.constants.MAINNET_NETHASH; // Nethash for Mainnet.
```
