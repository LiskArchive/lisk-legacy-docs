Author: 

----

Created: 2018-05-22

----

Updated: 2018-07-19

----

Metadescription: Learn how to install Lisk Elements quickly and easily. Lisk Elements requires Node.js as the underlying engine for code execution.

----

Metakeywords: Lisk Elements, installation, setup, install

----

Title: Setup

----

Opengraphtitle: Lisk Elements Setup

----

Opengraphimage: 

----

Opengraphdescription: 

----

Content: 

# Lisk Elements Setup

- [Pre-Installation](/documentation/lisk-elements/setup#pre-installation)
  - [Determine if your platform can run Node](/documentation/lisk-elements/setup#determine-if-your-platform-can-run-node)
  - [Install Node](/documentation/lisk-elements/setup#install-node)
- [Installation](/documentation/lisk-elements/setup#installation)
  - [Install Lisk Elements via NPM](/documentation/lisk-elements/setup#verify-installation)
  - [Install Lisk Elements from Source (GitHub)](/documentation/lisk-elements/setup#verify-installation)
  - [Load Lisk Elements via CDN](/documentation/lisk-elements/setup#verify-installation)

## Pre-Installation

Lisk Elements requires [Node.js](https://nodejs.org/) as the underlying engine for code execution. This document describes how to install Node and NPM for installation via NPM.

### Determine if your platform can run Node

<boxsuccess markdown="1">
######Supported Platforms
- Windows 10
- macOS
- Linux
</boxsuccess>

<boxerror markdown="1">
######Not Supported
- Platforms without NodeJS 6.3.x or higher
</boxerror>

### Install Node

Node.js is supported on most operating systems. Follow the instructions for your operating system on the [Node.js downloads page](https://nodejs.org/en/download/). You will need version 6.3.x or higher. NPM is automatically installed along with Node.js.

#### Verify Installation

Confirm that Node.js and NPM have been successfully installed by running

```shell
node --version
npm --version
```

## Installation

This section details how to install Lisk Elements for a given distribution. If you have satisfied the requirements from the [Pre-Installation](/documentation/lisk-elements/setup#pre-installation) section, you can proceed with the type of installation you would like to perform from the table below.

### Install Lisk Elements via NPM

To install the latest version of Lisk Elements for use as a dependency in a Node.js project, please proceed with the following:

```shell
npm install --save lisk-elements
```

Upon successful completion, NPM will add the Lisk Elements package to your `package.json` file.

### Install Lisk Elements from Source (GitHub)

Clone the Lisk Elements repository using Git and install the dependencies:

```shell
git clone https://github.com/LiskHQ/lisk-elements.git
cd lisk-elements
git checkout master
npm install
npm run build
```

### Load Lisk Elements via CDN

Include the following script using the following HTML. The `lisk` variable will be exposed.

```html
<script src="https://js.lisk.io/lisk-elements-1.0.0.js"></script>
```

Or minified:

```html
<script src="https://js.lisk.io/lisk-elements-1.0.0.min.js"></script>
```

----

Htmltitle: Lisk Elements - Setup | Lisk Documentation

----

Whatsnext: asusual

----

Whatsnextheadline: 

----

Whatsnextpagelinktext: 

----

Whatsnextpagelink: 
