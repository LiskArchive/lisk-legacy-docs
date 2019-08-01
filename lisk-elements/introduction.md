# Lisk Elements Documentation

Lisk Elements is a JavaScript library containing several separately-installable npm packages, each covering a distinct region of Lisk-related functionality.

- [Introduction](#lisk-elements-documentation)
  - [Lisk Elements version reference](#versions)
  - [Setup](#setup)
    - [Pre-Installation](#pre-installation)
    - [Installation](#installation)
  - [Upgrade](#upgrade)
    - [via NPM](#upgrade-lisk-elements-via-npm)
    - [via CDN](#upgrade-lisk-elements-via-cdn)
  - [Contribute to Codebase](#contribute-to-the-codebase)
- [Packages](packages.md): Stand-alone packages of Lisk Elements
  - [API Client](packages/api-client.md): An API client for interacting with nodes on the Lisk network.
  - [Client](packages/client.md):  A default set of elements for use by clients of the Lisk network
  - [Constants](packages/constants.md): A set of Lisk-related constants.
  - [Cryptography](packages/cryptography.md): Relevant cryptographic functions.
  - [Passphrase](packages/passphrase.md): Mnemonic passphrase helpers.
  - [Transactions](packages/transactions.md): Functions for creating, signing and verifying transactions.

## Versions

Documentation on [lisk.io](https://lisk.io/documentation) remains up to date with version updates. The table below provides an overview about the former releases and documentation versions of Lisk Elements.

Version | Release date <br> (yy/mm/dd)| Documentation reference
---     | ---         | ---
[v2.1.0](https://www.npmjs.com/package/lisk-elements/v/2.1.0) | 19/06/24 | *Current version, live on lisk.io/documentation*
[v2.0.0](https://github.com/LiskHQ/lisk-elements/releases/tag/v2.0.0) | 19/01/07 | [Lisk Elements 2.0 docs](https://github.com/LiskHQ/lisk-docs/blob/elements-2.0.0/introduction.md)
[v1.1.3](https://github.com/LiskHQ/lisk-elements/releases/tag/v1.1.3) | 18/11/22 | [Lisk Elements 1.1 docs](https://github.com/LiskHQ/lisk-docs/blob/elements-1.1.0-1.0.1/introduction.md)
[v1.0.0](https://github.com/LiskHQ/lisk-elements/releases/tag/v1.0.0) | 18/08/06 | [Lisk Elements 1.0 docs](https://github.com/LiskHQ/lisk-docs/blob/elements-1.0.0-1.0.1/introduction.md)

## Setup
  
#### Supported Platforms
- Platforms with Node.js version 8.10 and above.

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

> As all packages in Lisk Elements are independent from each other, they can be installed seperately.

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
<script src="https://js.lisk.io/lisk-client-2.1.0.js"></script>
```

Or minified:
```html
<script src="https://js.lisk.io/lisk-client-2.1.0.min.js"></script>
```

To include other packages of Lisk Elements, replace `lisk-client` with any of the [packages](packages.md) of Lisk Elements.

# Upgrade

If you already have Lisk Elements installed and wish to upgrade your installation, you can follow the instructions below for your specific distribution.

## Upgrade Lisk Elements via NPM

To update your global installation to the latest version of Lisk Elements, simply run the following command:

```bash
npm update --save lisk-elements
```

## Upgrade Lisk Elements via CDN

When a new release is available, simply update the version number accordingly. For example, if you want to upgrade from v2.0.0 (minified) to v2.1.0 (minified), change this line:

```html
<script src="https://js.lisk.io/lisk-elements-2.0.0.min.js"></script>
```

to this:
```html
<script src="https://js.lisk.io/lisk-elements-2.1.0.min.js"></script>
```

## Contribute to the Codebase

Everyone is invited to contribute to the Lisk Elements codebase. We welcome and appreciate all contributions. 

### Github
All necessary information can be found on our [Lisk Elements Github](https://github.com/LiskHQ/lisk-sdk/tree/development/elements/lisk-elements).

### Contribution Guidelines
Please be sure to read and follow our [Contribution Guidelines](https://github.com/LiskHQ/lisk-sdk/blob/development/docs/CONTRIBUTING.md).

### Discord
If you have any further questions please join our [Lisk Discord](https://discord.gg/GA9DZmt) channel.
