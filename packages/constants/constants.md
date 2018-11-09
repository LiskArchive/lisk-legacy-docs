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
import constants from '@liskhq/lisk-constants';

constants.EPOCH_TIME; // Date from which timestamps are calculated.
constants.EPOCH_TIME_MILLISECONDS; // EPOCH_TIME as milliseconds since Unix Epoch.
constants.EPOCH_TIME_SECONDS; // EPOCH_TIME as seconds since Unix Epoch.

constants.MAX_ADDRESS_NUMBER; // Maximum valid number which can form an address when suffixed with an 'L'.
constants.MAX_TRANSACTION_AMOUNT; // Maximum valid amount for a transaction.

constants.SIGNED_MESSAGE_PREFIX; // The prefix attached to all messages signed according to the Lisk message signature protocol.

constants.BETANET_NETHASH; // Nethash for Betanet.
constants.TESTNET_NETHASH; // Nethash for Testnet.
constants.MAINNET_NETHASH; // Nethash for Mainnet.
```
