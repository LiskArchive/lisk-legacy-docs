# Lisk Elements Setup

- [Pre-Installation](#pre-installation)
  - [Determine if your platform can run Node](#determine-if-your-platform-can-run-node)
  - [Install Node](#install-node)
- [Installation](#installation)
  - [via NPM](#installation-via-npm)
  - [via CDN](#load-via-cdn)
  - [from Source](#install-lisk-elements-from-source)

## Pre-Installation

Lisk Elements requires [Node.js](https://nodejs.org/) as the underlying engine for code execution.
This document describes how to install Node and NPM for installation via NPM.

### Determine if your platform can run Node

###### Supported Platforms
- Windows 10
- macOS
- Linux

###### Not Supported
- Platforms without NodeJS 6.3.x or higher

### Install Node

Node.js is supported on most operating systems. 
Follow the instructions for your operating system on the [Node.js downloads page](https://nodejs.org/en/download/).
**You will need version 6.3.x or higher**. 

NPM is automatically installed along with Node.js.

#### Verify Installation

Confirm that Node.js and NPM have been successfully installed by running

```bash
node --version
npm --version
```

## Installation

- [via NPM](#installation-via-npm)
- [via CDN](#load-via-cdn)
- [from Source](#install-lisk-elements-from-source)

This section details how to install Lisk Elements for a given distribution.

Info | Note
---- | ----
![info note](../info-icon.png "Info Note") | As all Packages in Lisk Elements are independent from each other, they can be installed seperately.

### Installation via NPM

To install the latest version of Lisk Elements for use as a dependency in a Node.js project, please proceed with the following:

**Complete library**
```bash
npm install --save lisk-elements
```
**Specific package**
```bash
npm install --save @liskhq/<package-name>
```

where `<package-name>` can be any of the sub packages in Lisk Elements.

For concrete code examples for each package, check the [Packages section](../packages/packages.md).

Upon successful completion, NPM will add the Lisk Elements package to your `package.json` file.

### Load via CDN

Include the following script using the following HTML. The `lisk` variable will be exposed.

**Client library**
```html
<script src="https://js.lisk.io/lisk-client-1.1.0.js"></script>
```

Or minified:
```html
<script src="https://js.lisk.io/lisk-client-1.1.0.min.js"></script>
```

**Specific package**
```html
<script src="https://js.lisk.io/lisk-<package-name>-1.1.0.js"></script>
```

Or minified:
```html
<script src="https://js.lisk.io/lisk-<package-name>-1.1.0.min.js"></script>
```

where `<package-name>` can be any of the sub packages in Lisk Elements.

For concrete code examples for each package, check the [Packages section](../packages/packages.md).

### Install Lisk Elements from Source

Clone the Lisk Elements repository using Git and install the dependencies:

```bash
git clone https://github.com/LiskHQ/lisk-elements.git
cd lisk-elements
git checkout master
npm install
npm run build
```
