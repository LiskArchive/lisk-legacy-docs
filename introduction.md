![Logo](assets/banner_sdk.png)

# Lisk SDK

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
[![Join the chat at https://gitter.im/LiskHQ/lisk](https://badges.gitter.im/LiskHQ/lisk.svg)](https://gitter.im/LiskHQ/lisk?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Disclaimer: Mostly Harmless

Please read our disclaimer carefully. The current version of the SDK is the alpha release of the Lisk SDK.
We have released the Lisk SDK in its current form in order for us to improve the development experience through community feedback and contributions.

We strongly discourage anyone from using the alpha release of the Lisk SDK for any production-based blockchain applications, i.e. a blockchain operating on a real mainnet.

Over the course of the SDK's alpha phase there will be significant changes in the Lisk protocol and implementation, which will eventually bring the accessibility and reliability to a level which is feasible for production-based blockchain applications.

At this time we only recommend the Lisk SDK for proof-of-concept blockchain applications, i.e. a blockchain operating on a fake testnet.

Be aware that the dummy delegate accounts are insecure, as their secret passphrases are public. In addition, the convenient creation of a new genesis block is not supported by alpha release of the Lisk SDK.

The only application built using the Lisk SDK currently feasible for production usage is [Lisk Core](https://github.com/liskhq/lisk-core), the client of the Lisk network itself.

Please be advised that we cannot guarantee blockchains created with the alpha release of the Lisk SDK will remain compatible with our planned (beta/rc) releases.

We hope you enjoy building your proof-of-concept blockchain applications using the Lisk SDK and look forward to receiving your feedback and contributions during the alpha phase.

## What is the Lisk SDK?

The Lisk SDK aims to provide an easy and reliable software development kit for building blockchain applications compatible with the [Lisk Protocol](../lisk-protocol/introduction.md).

The architecture of the Lisk SDK has been designed so that it can be extended to meet the requirements of a wide variety of blockchain use cases.

The codebase is written entirely in JavaScript, which means for a majority of developers, no significant change of tools is required to get started.

The Lisk SDK makes every effort to allow developers to focus simply and purely on writing the code that matters to their own blockchain application, and nothing more.

## Package Directories

| Directory                                   | Description                                                                                                                                          |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Framework](lisk-framework/introduction.md) | The application framework establishes and maintains the interactions between the modules of a Lisk blockchain application.                           |
| [Elements](lisk-elements/introduction.md)   | A collection of libraries, each of them implementing some form of blockchain application functionality such as cryptography, transactions, p2p, etc. |
| [Commander](lisk-commander/introduction.md) | A command line tool which allows developers to manage a Lisk node instance and interact with a Lisk compatible network.                              |

## Usage 

### Dependencies

Before running Lisk SDK, the following dependencies need to be installed in order to run applications created with the Lisk SDK:

| Dependencies     | Version |
| ---------------- | ------- |
| NodeJS           | 10.15.3 |
| PostgreSQL       | 10+     |
| Redis (optional) | 5+      |
| Python           | 2       |

You can find further details on installing these dependencies in our [pre-installation setup guide](setup.md).

Mind, that you need to create a database before. The default database name is `lisk_dev`, so for the development purposes, a command `createdb lisk_dev` will set you up.

### Installation

The installation of Lisk Alpha SDK is straightforward and limited to getting a single NPM package, `lisk-sdk`, to your Node.js project:

```bash
npm install lisk-sdk
```

Lisk SDK is all-in-one package that provides you with tools to create, run and maintain blockchain applications in JavaScript.

In case you only need some specific functionality, it is possible to install only the relevant package, e.g.:

```bash
npm install lisk-commmander # install Lisk Commander
npm install lisk-elements # install Lisk Elements
npm install @liskhq/lisk-transactions # install Lisk Elements Transactions Package
npm install @liskhq/lisk-cryptography # install Lisk Elements Cryptography Package
```

> Check out the [full list of Lisk Elements' packages](lisk-elements/packages.md) 

### Set up new a blockchain application

To start, create the project structure of your blockchain application. There are no special requirements here, you can create the basic Node.js project folder structure with `npm init`.

To create a blockchain application, you need to provide an entry point of your application (like `index.js`) and set-up your network by using the modules of Lisk SDK.

It is quite simple to have a working blockchain application, mirroring the configuration of the existing Lisk network. This can be done by copying the following three lines of code to your `index.js`:

```js
const { Application, genesisBlockDevnet, configDevnet} = require('lisk-sdk'); // require the lisk-sdk package

const app = new Application(genesisBlockDevnet, configDevnet); // create a new application with default genesis block for a local devnet

app.run() // start the application
   .then(() => app.logger.info('App started...')) // code that is executed after the successful start of the application.
   .catch(error => { // code that is executed if the application start fails.
        console.error('Faced error in application', error);
        process.exit(1);
});
```

Now, save and close `index.js` and try to start your newly created blockchain application by running:

```bash
node index.js | npx bunyan -o short # start the application
```

> `node index.js` will start the node, and `| npx bunyan -o short` will pretty-print the logs in the console.
  
This should start the application with the predefined default configurations, which will connect your app to a local devnet.
From this point, you can start to [configure](configuration.md) and customize the application further.

For more detailed explanations, check out the getting started sections for [building blockchain applications](../start/build-blockchain-app.md) and the [example applications](../start/tutorials.md), which describe the process of creating a blockchain application step-by-step.

### Configure your blockchain parameters

You can also define your blockchain application parameters such as `BLOCK_TIME`, `EPOCH_TIME`, `MAX_TRANSACTIONS_PER_BLOCK` and more with an optional configurations object.

```js
const app = new Application(genesisBlockDevnet, {
    app: {
        label: 'my-blockchain-application',
        genesisConfig: {
            EPOCH_TIME: new Date(Date.UTC(2016, 4, 24, 17, 0, 0, 0)).toISOString(),
            BLOCK_TIME: 10,
            MAX_TRANSACTIONS_PER_BLOCK: 25,
        },
        ...
});
```

See the [complete list of configuration options](configuration.md).

### Register a custom transaction

You can [define your own transaction types](customize.md) with Lisk-SDK.
This is where the custom logic for your blockchain application lives.

Add your custom transaction type to your blockchain application by registering it to the application instance:

```js
const { Application, genesisBlockDevnet } = require('lisk-sdk');

const MyTransaction = require('./my_transaction');

const app = new Application(genesisBlockDevnet);

app.registerTransaction(MyTransaction); // register the custom transaction

app
	.run()
	.then(() => app.logger.info('App started...'))
	.catch(error => {
		console.error('Faced error in application', error);
		process.exit(1);
	});
```

For information on creating your own custom transaction, see the [customize](customize.md) page or [follow the tutorials](../start/tutorials.md).

### Architecture Overview

The Lisk SDK operates on the NodeJS runtime and consists primarily of an application framework ([Lisk Framework](lisk-framework/introduction.md)), a collection of libraries providing blockchain application functionalities ([Lisk Elements](lisk-elements/introduction.md)), and a powerful Command Line Interface ([Lisk Commander](lisk-commander/introduction.md)) which allows developers to manage a Lisk node instance and interact with a Lisk compatible network.

The diagram below provides a high-level overview of the architecture:

![Diagram](assets/diagram_sdk.png)

## Get Involved

| How                           | Where                                                                                            |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| Introduce yourself to our community  | [Lisk.chat](http://lisk.chat)                                                |
| Have questions answered by developers | [Gitter](https://gitter.im/LiskHQ/lisk)                                      |
| Report a bug                      | [Open a new issue on GitHub](https://github.com/LiskHQ/lisk/issues/new)                                  |
| Report a security issue           | [View Bug Bounty Program](https://blog.lisk.io/announcing-lisk-bug-bounty-program-5895bdd46ed4) |
| Discuss technical research      | [Research Forum](https://research.lisk.io)                                              |
| Build with Lisk          | [Create a fork on GitHub](https://github.com/LiskHQ/lisk/fork)                                           |
