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

The Lisk SDK aims to provide an easy and reliable software development kit for building blockchain applications compatible with the [Lisk Protocol](https://lisk.io/documentation/lisk-protocol).

The architecture of the Lisk SDK has been designed so that it can be extended to meet the requirements of a wide variety of blockchain use cases.

The codebase is written entirely in JavaScript, which means for a majority of developers, no significant change of tools is required to get started.

The Lisk SDK makes every effort to allow developers to focus simply and purely on writing the code that matters to their own blockchain application, and nothing more.

### Architecture Overview

The Lisk SDK operates on the NodeJS runtime and consists primarily of an application framework ([Lisk Framework](lisk-framework/introduction.md)), a collection of libraries providing blockchain application functionalities ([Lisk Elements](lisk-elements/introduction.md)), and a powerful Command Line Interface ([Lisk Commander](lisk-commander/introduction.md)) which allows developers to manage a Lisk node instance and interact with a Lisk compatible network.
The diagram below provides a high-level overview of the architecture:

![Diagram](assets/diagram_sdk.png)

## Package Directories

| Directory                                   | Description                                                                                                                                          |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Framework](lisk-framework/introduction.md) | The application framework establishes and maintains the interactions between the modules of a Lisk blockchain application.                           |
| [Elements](lisk-elements/introduction.md)   | A collection of libraries, each of them implementing some form of blockchain application functionality such as cryptography, transactions, p2p, etc. |
| [Commander](lisk-commander/introduction.md) | A command line tool which allows developers to manage a Lisk node instance and interact with a Lisk compatible network.                              |

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

#### Create a new user

> To install the required prerequisites, it is necessary to have a user with sudo rights on the server.
> The `lisk` user itself **does not need** any `sudo` rights to run the node.

To run and manage a node in the future, please create a separate `lisk` user. E.g. execute:

##### Ubuntu

```bash
sudo adduser lisk
```

#### Toolchain components

Used for compiling dependencies.

##### Ubuntu

```bash
sudo apt install -y python-minimal build-essential
```

##### MacOS

Ensure that both [XCode](https://developer.apple.com/xcode/) and [Homebrew](https://brew.sh/) are installed.

#### PostgreSQL

##### Ubuntu

Firstly, install postgreSQL on your machine:
```bash
sudo apt-get purge -y postgres* # remove all already installed postgres versions
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
sudo apt install wget ca-certificates
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update
sudo apt install postgresql-10
```

After installation, you should see the Postgres database cluster, by running
```bash
pg_lsclusters
```

Drop the existing database cluster, and replace it with a cluster with the locale `en_US.UTF-8`:
```bash
sudo pg_dropcluster --stop 10 main
sudo pg_createcluster --locale en_US.UTF-8 --start 10 main
```
Next we will create a new database user called `lisk` with create database rights.
With the `lisk` user as the owner, we will create a database called `lisk_dev`.
Finally we will set a password for the `lisk` user (see commands below).
```bash
sudo -u postgres createuser --createdb lisk
createdb lisk_dev --owner lisk
psql -U lisk -d lisk_dev -c "alter user lisk with password 'password';"
```

> Change `'password'` to a secure password of your choice.
> Don't forget to update this password in the [Lisk SDK configuration](configuration.md) later on.

##### MacOS

```bash
brew install postgresql@10
initdb /usr/local/var/postgres -E utf8 --locale=en_US.UTF-8
brew services start postgresql@10
createuser --createdb lisk
createdb lisk_dev --owner lisk
psql --username lisk -d lisk_dev -c "alter user lisk with password 'password';"
```

> Change `'password'` to a secure password of your choice.
> Don't forget to update this password in the [Lisk SDK configuration](configuration.md) later on.

#### Node.js

[Node.js](https://nodejs.org/) serves as the underlying engine for code execution.
There are several different ways and version managers to install Node.JS on your system.
We recommend one of the following two:

##### Option A: Node Version Manager

We recommend using a Node version manager such as [NVM](https://github.com/creationix/nvm).
NVM is a bash script that enables you to manage multiple active Node.js versions.

1. Install nvm following these [instructions](https://github.com/creationix/nvm#install--update-script)
3. Install the correct version of Node.js using NVM:
```bash
nvm install 10.15.3
```

##### Option B: Node.js package

If you do not want to use NVM or other package managers, you can install the Node package globally on your system alternatively:

###### Ubuntu

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

###### MacOS

```bash
brew install node@10.15.3
```

### Installation

To install the `alpha` version of the NPM package [lisk-sdk](https://www.npmjs.com/package/lisk-sdk), run:

```bash
npm install --save lisk-sdk@alpha # add --save flag to save it to package.json
```

### Usage

The first steps to start developing your blockchain application:

```bash
mkdir my-app # create the root folder for your blockchain application
cd my-app # navigate into the root folder
npm init # initialize your package.json
npm install --save lisk-sdk@alpha # install lisk-sdk alpha version and save it to package.json
touch index.js # create the index file to start the application
```

Inside of `index.js`, require the `lisk-sdk` package to create and start the application.

Below is the minimal version of `index.js` that is needed to successfully kick-start the blockchain application:

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

## Get Involved

| How                           | Where                                                                                            |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| Get questions answered by community members  | [Lisk.chat](http://lisk.chat)                                                |
| Get questions answered by our developers | [Gitter](https://gitter.im/LiskHQ/lisk)                                      |
| Report a bug                      | [Open a new issue on GitHub](https://github.com/LiskHQ/lisk/issues/new)                                  |
| Report a security issue           | [View Bug Bounty Program](https://blog.lisk.io/announcing-lisk-bug-bounty-program-5895bdd46ed4) |
| Discuss technical research      | [Research Forum](https://research.lisk.io)                                              |
| Build with Lisk          | [Create a fork](https://github.com/LiskHQ/lisk/fork)                                           |
