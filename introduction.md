![Logo](assets/banner_sdk.png)

# Lisk SDK

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
[![Join the chat at https://gitter.im/LiskHQ/lisk](https://badges.gitter.im/LiskHQ/lisk.svg)](https://gitter.im/LiskHQ/lisk?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Disclaimer - Mostly Harmless

Please read our disclaimer carefully. The current version of the Lisk SDK is the alpha release of the Lisk SDK.
We have released the Lisk SDK in its current form in order for us to improve the development experience through community feedback and contributions.

We strictly discourage anyone from using the alpha release of the Lisk SDK for any production-based blockchain applications, i.e. a blockchain operating on a real mainnet.
Over the course of the alpha phase there will be significant changes in the Lisk protocol and implementation, which will eventually bring the accessibility and reliability to a level which is feasible for production-based blockchain applications.
At this time we only recommend the Lisk SDK for proof-of-concept blockchain applications, i.e. a blockchain operating on a fake testnet.

The only application built using the Lisk SDK currently feasible for production usage is [Lisk Core](https://github.com/liskhq/lisk-core), the client of the Lisk network itself.

Please be advised we cannot guarantee blockchains created with the alpha release of the Lisk SDK will remain compatible with our planned (beta/rc) releases.

We hope you enjoy building your proof-of-concept blockchain applications using the Lisk SDK, and shall look forward to receiving your feedback and contributions during the alpha phase.

## What is the Lisk SDK

The Lisk SDK aims to provide an easy and reliable software development kit for building blockchain applications which are compatible with the [Lisk Protocol](https://lisk.io/documentation/lisk-protocol).
The architecture of the Lisk SDK has been designed so that it can be extended to meet the requirements of a wide variety of blockchain application use-cases.
The codebase is written entirely in JavaScript, which means for a majority of developers, no significant change of tools or mindset is required to get started.
The Lisk SDK makes every effort to allow developers to focus simply and purely on writing the code that matters to their own blockchain application, and nothing more.

### Architecture Overview

The Lisk SDK operates on the NodeJS runtime and consists primarily of an application framework (Lisk Framework), a collection of libraries providing blockchain application functionalities (Lisk Elements), and a powerful command-line tool (Lisk Commander) allowing developers to manage a Lisk node instance and interact with a Lisk compatible network.
The diagram below provides a high-level overview of the architecture:

![Diagram](assets/diagram_sdk.png)

## Package Directories

| Directory                                   | Description                                                                                                                                          |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Framework](lisk-framework/introduction.md) | The application framework is establishing and maintaining the interactions between the modules of a Lisk blockchain application.                     |
| [Elements](lisk-elements/introduction.md)   | A collection of libraries, each of them implementing some form of blockchain application functionality such as cryptography, transactions, p2p, etc. |
| [Commander](lisk-commander/introduction.md) | A command line tool allowing developers to manage a Lisk node instance and interact with a Lisk compatible network.                                  |

## Setup

### Supported Platforms

- Ubuntu 16.04 (LTS) x86_64
- Ubuntu 18.04 (LTS) x86_64
- MacOS 10.13 (High Sierra)
- MacOS 10.14 (Mojave)

### Dependencies

The following dependencies need to be installed in order to run applications created with the Lisk SDK:

| Dependencies     | Version |
| ---------------- | ------- |
| Node.js          | 10.15.3 |
| PostgreSQL       | 10+     |
| Redis (optional) | 5+      |
| Python           | 2       |

### Pre-Installation

### Node.js

[Node.js](https://nodejs.org/) serves as the underlying engine for code execution.
There are several different ways and version managers to install Node.JS on your system.
We recommend one of the following two:

#### Node Version Manager

We recommend using a Node version manager such as [NVM](https://github.com/creationix/nvm).
NVM is a bash script that enables you to manage multiple active Node.js versions.

1. Install nvm following these [instructions](https://github.com/creationix/nvm#install--update-script)
3. Install the correct version of Node.js using NVM:
```bash
nvm install 10.15.3
```

#### Node.js package

If you do not want to use NVM or other package managers, you can install the Node package globally on your system alternatively:

##### Ubuntu

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

##### MacOS

```bash
brew install node@10.15.3
```

### Installation

To install the `alpha` version of the NPM package [lisk-sdk](https://www.npmjs.com/package/lisk-sdk), run:

```bash
npm install lisk-sdk@alpha # install lisk-sdk alpha version 
npm install --save lisk-sdk@alpha # add --save flag to save it to package.json
```

### Usage

First steps to start developing your blockchain application:

```bash
mkdir my-app # create the root folder for your blockchain application
cd my-app # navigate into the root folder
npm init # initialize your package.json
npm install --save lisk-sdk@alpha # install lisk-sdk alpha version and save it to package.json
touch index.js # create the index file to start the application
```

Inside of `index.js`, require the `lisk-sdk` package to create and start the application.

Below you see the minimal version of `index.js` that is needed to successfully kick-start the blockchain application:

```js
const { Application, genesisBlockDevnet } = require('lisk-sdk'); // require the lisk-sdk package
  
const app = new Application(genesisBlockDevnet); // Create a new application with default genesis block for a local devnet

app.run() // start the application
   .then(() => app.logger.info('App started...')) // Code that is executed after the successful start of the application.
   .catch(error => { // Code that is executed if the application start fails.
        console.error('Faced error in application', error);
        process.exit(1);
});               
```

Now, save and close `index.js` and try to start your newly created blockchain application by running:

```bash
node index.js # start the application
```

This should start the application with predefined default configurations, what will connect your app to a local Devnet.
From this point, you can start to configure and customize the application further.

## Contributing to the Lisk SDK

To test out your local changes of the Lisk SDK, use a blockchain application(e.g. [Lisk Core](../lisk-core/introduction.md)) as basis and link your locally customized `lisk-sdk`  to it.

1) At root of `lisk-sdk` repo,  run `npx lerna link`
2) At root level of your blockchain application, run `npm link lisk-sdk`

*Notes:*
1) If you have made changes in `elements` lib then make sure you run `npm run build` to see the changes
2) To clean up, install and build from scratch, `npm run clean:node_modules && rm -rf ./node_modules && npm ci && npm run bootstrap -- --ci && npm run build`

For more information about how to contribute to Lisk SDK, check out our [Contribution Guidelines](https://github.com/LiskHQ/lisk-sdk/blob/development/docs/CONTRIBUTING.md) on Github.

## Get Involved

| Reason                           | How                                                                                            |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| Want to chat with our community  | [Chat with them on Lisk.chat](http://lisk.chat)                                                |
| Want to chat with our developers | [Chat with them on Gitter](https://gitter.im/LiskHQ/lisk)                                      |
| Found a bug                      | [Open a new issue](https://github.com/LiskHQ/lisk/issues/new)                                  |
| Found a security issue           | [See our bounty program](https://blog.lisk.io/announcing-lisk-bug-bounty-program-5895bdd46ed4) |
| Want to share your research      | [Propose your research](https://research.lisk.io)                                              |
| Want to develop with us          | [Create a fork](https://github.com/LiskHQ/lisk/fork)                                           |
