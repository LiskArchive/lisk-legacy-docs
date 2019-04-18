# Lisk Commander Documentation

Lisk Commander is a Command-Line-Interface Tool designed to facilitate delegates, node operators, contributors to the Lisk codebase, developers using Lisk’s infrastructure (and anyone else who’s interested) to make use of Lisk’s functionality from the command line with ease.

Lisk Commander allows to communicate with a remote or local node and carry out Lisk-related functionality.

This can be for example:

- create a transaction
- decrypt/encrypt passphrases or messages
- create accounts
- get delegates
- ... many more examples can be found on the [commands](user-guide/commands.md) page.

## Table of contents

- [Introduction](#lisk-commander-documentation)
  - [Lisk Commander Version Reference](#versions)
  - [Contribute to Codebase](#contribute-to-the-codebase)
- [Setup](#setup)
  - [Pre-Installation](#pre-installation)
  - [Installation](#installation)
- [Upgrade](#upgrade)
- [User Guide](user-guide.md)
  - [Commands](user-guide/commands.md)
  - [Sensitive Inputs](user-guide/sensitive-inputs.md)

## Versions

Documentation on [lisk.io](https://lisk.io/documentation) keeps up to date with version updates. The table below provides an overview about the former releases and documentation versions of Lisk Commander.

Version | Release date <br> (yy/mm/dd)| Documentation reference
---     | ---         | ---
[v2.2.0](https://github.com/LiskHQ/lisk/releases/tag/v2.1.0) | 19/0x/xx | *Current version, live on lisk.io/documentation*
[v2.1.0](https://github.com/LiskHQ/lisk-commander/releases/tag/v2.1.0) | 19/01/14 | [Lisk Commander 2.1 docs](https://github.com/LiskHQ/lisk-docs/blob/commander-2.1.0/introduction.md)
[v2.0.0](https://github.com/LiskHQ/lisk-commander/releases/tag/v2.0.0) | 18/11/14 | [Lisk Commander 2.0 docs](https://github.com/LiskHQ/lisk-docs/blob/commander-2.0.0-1.0.1/introduction.md)
[v1.0.0](https://github.com/LiskHQ/lisk-commander/releases/tag/v1.0.0) | 18/08/13 | [Lisk Commander 1.0 docs](https://github.com/LiskHQ/lisk-docs/blob/commander-1.0.0/introduction.md)

## Setup

> Supported Platforms: Platforms with NodeJS versions 8.3 and above.

### Pre-Installation

Lisk Commander requires [Node.js](https://nodejs.org/) as the underlying engine for code execution.


#### Install Node

Node.js is supported on most operating systems. Follow the instructions for your operating system on the [Node.js downloads page](https://nodejs.org/en/download/). 
Lisk-Commander requires Node.js versions 8.3 or above.
NPM is automatically installed along with Node.js.

##### Verify Node installation

Confirm that Node.js and NPM have been successfully installed by running

```bash
node --version
npm --version
```

### Installation

To install the latest version of Lisk Commander as a global command, install the NPM package like so:

```bash
npm install --global --production lisk-commander
```

Upon successful completion, NPM will add the Lisk Commander executable to your PATH.

Too see usage examples and configuration options, check the [Lisk Commander User Guide](user-guide.md).
For a full reference of all commands and their available options, check the [Command Reference](user-guide/commands.md).

## Upgrade

To update your global installation to the latest version of Lisk Commander, simply run the following command:

```bash
npm update --global lisk-commander
```

## Contribute to the Codebase

Everyone is invited to contribute to the Lisk Commander project. We welcome and appreciate all contributions. 

### Github
All necessary information can be found on our [Lisk Commander Github](https://github.com/LiskHQ/lisk-commander).

### Contribution Guidelines
Please be sure to read and follow our [Contribution Guidelines](https://github.com/LiskHQ/lisk-commander/blob/development/docs/CONTRIBUTING.md).

### Gitter
If you have any further questions please join our [Gitter](https://gitter.im/LiskHQ/lisk).
