# Lisk Commander Documentation

Lisk Commander is a Command Line Interface tool designed to be a low entry point and the most convenient tool for developers who are looking for an efficient way of coding.

**Who is Lisk Commander for?**

- Delegates
- Node operators
- Contributors to the Lisk codebase
- Developers using Lisk’s infrastructure
- Anyone interested in making use of Lisk’s functionality from the command line with ease

Lisk Commander allows to communicate with a remote or local node and carry out Lisk-related functionality.

**What can I do with Lisk Commander?**

- Create a transaction
- Decrypt/encrypt passphrases or messages
- Install and manage a node
- Create accounts
- Get delegates
- And many more! [View all commands](user-guide/commands.md)

## Table of contents

- [Introduction](#lisk-commander-documentation)
  - [Lisk Commander Version Reference](#versions)
  - [Setup](#setup)
    - [Pre-Installation](#pre-installation)
    - [Installation](#installation)
  - [Upgrade](#upgrade)
  - [Contribute to Codebase](#contribute-to-the-codebase)
- [User Guide](user-guide.md)
- [Lisk Core Commands](user-guide/lisk-core.md)
- [General Command Reference](user-guide/commands.md)
- [Sensitive Inputs](user-guide/sensitive-inputs.md)

## Versions

Documentation on [lisk.io](https://lisk.io/documentation) keeps up to date with version updates. The table below provides an overview about the former releases and documentation versions of Lisk Commander.

Version | Release date <br> (yy/mm/dd)| Documentation reference
---     | ---         | ---
[v2.2.0](https://www.npmjs.com/package/lisk-commander/v/2.2.0) | 19/06/24 | *Current version, live on lisk.io/documentation*
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

Everyone is invited to contribute to the Lisk Commander codebase. We welcome and appreciate all contributions. 

### Github
All necessary information can be found on our [Lisk Commander Github](https://github.com/LiskHQ/lisk-sdk/tree/development/commander).

### Contribution Guidelines
Please be sure to read and follow our [Contribution Guidelines](https://github.com/LiskHQ/lisk-sdk/blob/development/docs/CONTRIBUTING.md).

### Gitter
If you have any further questions please join our [Gitter](https://gitter.im/LiskHQ/lisk) channel.
