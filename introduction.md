# Lisk Elements Documentation

Lisk Elements is a JavaScript library containing several separately-installable npm packages, each covering a distinct region of Lisk-related functionality.

- [Introduction](#lisk-elements-documentation)
  - [Lisk Elements Version Reference](#versions)
  - [Setup](#setup)
    - [Pre-Installation](#pre-installation)
    - [Installation](#installation)
  - [Upgrade](#upgrade)
    - [via NPM](#upgrade-lisk-elements-via-npm)
  - [Contribute to Codebase](#contribute-to-the-codebase)
- [Packages](packages.md): Stand-alone packages of Lisk Elements
  - [API Client](packages/api-client.md): An API client for interacting with nodes on the Lisk network.
  - [Client](packages/client.md):  A default set of Elements for use by clients of the Lisk network
  - [Constants](packages/constants.md): A set of Lisk-related constants.
  - [Cryptography](packages/cryptography.md): Relevant cryptographic functions.
  - [Passphrase](packages/passphrase.md): Mnemonic passphrase helpers.
  - [Transactions](packages/transactions.md): Functions for creating, signing and verifying transactions.

## Versions

Documentation on [lisk.io](https://lisk.io/documentation) keeps up to date with version updates. The table below provides an overview about the former releases and documentation versions of Lisk Elements.

Version | Release date <br> (yy/mm/dd)| Documentation reference
---     | ---         | ---
[v2.3.0](https://www.npmjs.com/package/lisk-elements/v/2.3.0) | 19/08/02 | *Current version, live on lisk.io/documentation*
[v2.2.0](https://www.npmjs.com/package/lisk-elements/v/2.2.0) | 19/07/24 | [Lisk Elements 2.2 docs](https://github.com/LiskHQ/lisk-docs/tree/dev-elements-2.1.0)
[v2.1.0](https://www.npmjs.com/package/lisk-elements/v/2.1.0) | 19/06/24 | [Lisk Elements 2.1 docs](https://github.com/LiskHQ/lisk-docs/tree/dev-elements-2.1.0)
[v2.0.0](https://github.com/LiskHQ/lisk-elements/releases/tag/v2.0.0) | 19/01/07 | [Lisk Elements 2.0 docs](https://github.com/LiskHQ/lisk-docs/blob/elements-2.0.0/introduction.md)
[v1.1.3](https://github.com/LiskHQ/lisk-elements/releases/tag/v1.1.3) | 18/11/22 | [Lisk Elements 1.1 docs](https://github.com/LiskHQ/lisk-docs/blob/elements-1.1.0-1.0.1/introduction.md)
[v1.0.0](https://github.com/LiskHQ/lisk-elements/releases/tag/v1.0.0) | 18/08/06 | [Lisk Elements 1.0 docs](https://github.com/LiskHQ/lisk-docs/blob/elements-1.0.0-1.0.1/introduction.md)

## Setup
  
#### Supported Platforms
- Platforms with Node.JS version 8.10 and above.

### Pre-Installation

Lisk Elements requires [Node.js](https://nodejs.org/) as the underlying engine for code execution.
This document describes how to install Node and NPM for installation via NPM.

#### Install Node

Follow the instructions for your operating system on the [Node.js downloads page](https://nodejs.org/en/download/).

> NPM is automatically installed along with Node.js.

#### Verify Installation

Confirm that Node.JS and NPM have been successfully installed by running

```bash
node --version
npm --version
```

### Installation

This section details how to install Lisk Elements for a given distribution.

> As all Packages in Lisk Elements are independent from each other, they can be installed seperately.

#### Installation via NPM

To install the latest version of Lisk Elements for use as a dependency in a Node.js project, please proceed with the following:

**Complete library**
```bash
npm install --save lisk-elements
```
**Specific package**
```bash
npm install --save @liskhq/<package-name>
```

where `<package-name>` can be any of the [sub packages](packages.md) in Lisk Elements.

For concrete code examples for each package, check the [Packages section](packages.md).

Upon successful completion, NPM will add the Lisk Elements package to your `package.json` file.

#### Load via CDN

Include the following script using the following HTML. The `lisk` variable will be exposed.

**Client library**
```html
<script src="https://js.lisk.io/lisk-client-2.1.1.js"></script>
```

Or minified:
```html
<script src="https://js.lisk.io/lisk-client-2.1.1.min.js"></script>
```

To include other packages of Lisk Elements, replace `lisk-client` with any of the [packages](packages.md) of Lisk Elements.

# Upgrade

To update your installation to the latest version of Lisk Elements, simply run the following command:

```bash
npm update --save lisk-elements
```

## Contribute to the Codebase

Everyone is invited to contribute to the Lisk Elements project. We welcome and appreciate all contributions. 

### Github
All necessary information can be found on our [Lisk Elements Github](https://github.com/LiskHQ/lisk-sdk/tree/development/elements/lisk-elements).

### Contribution Guidelines
Please be sure to read and follow our [Contribution Guidelines](https://github.com/LiskHQ/lisk-sdk/blob/development/docs/CONTRIBUTING.md).

### Gitter
If you have any further questions please join our [Gitter](https://gitter.im/LiskHQ/lisk).
