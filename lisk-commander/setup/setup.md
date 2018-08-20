Author: shusetsu

----

Created: 2018-05-22

----

Updated: 2018-08-13

----

Metadescription: This section details how to install Lisk Commander. Lisk Commander requires Node.js as the underlying engine for code execution.

----

Metakeywords: lisk commander, install, setup, installation

----

Title: Setup

----

Opengraphtitle: Lisk Commander Setup

----

Opengraphimage: 

----

Opengraphdescription: 

----

Content: 

# Lisk Commander Setup

- [Pre-Installation](/documentation/lisk-commander/setup#pre-installation)
  - [Determine if your platform can run Node](/documentation/lisk-commander/setup#determine-if-your-platform-can-run-node)
  - [Install Node](/documentation/lisk-commander/setup#install-node)
- [Installation](/documentation/lisk-commander/setup#installation)
  - [Install Lisk Elements via NPM](/documentation/lisk-commander/setup#install-node)
  - [Install Lisk Elements from Source (GitHub)](/documentation/lisk-commander/setup#install-node)
  - [Load Lisk Elements via CDN](/documentation/lisk-commander/setup#install-node)

## Pre-Installation

Lisk Commander requires [Node.js](https://nodejs.org/) as the underlying engine for code execution. This document describes how to install Node and NPM for installation via NPM.

### Determine if your platform can run Node

<boxsuccess markdown="1">
######Supported Platforms
- Windows 10
- macOS
- Linux
</boxsuccess>

<boxerror markdown="1">
######Not Supported
- Platforms without NodeJS version between 6.12 and 6.14
</boxerror>

### Install Node

Node.js is supported on most operating systems. Follow the instructions for your operating system on the [Node.js downloads page](https://nodejs.org/en/download/). You will need version 6.14.1. NPM is automatically installed along with Node.js.

#### Verify Node installation

Confirm that Node.js and NPM have been successfully installed by running

```shell
node --version
npm --version
```

## Lisk Commander Installation

This section details how to install Lisk Commander for a given distribution. If you have satisfied the requirements from the [Pre-Installation](/documentation/lisk-commander/setup#pre-installation) section, you can proceed with the type of installation you would like to perform from the table below.

### Install Lisk Commander via NPM

To install the latest version of Lisk Commander as a global command, please proceed with the following:

```shell
npm install --global --production lisk-commander
```

Upon successful completion, NPM will add the Lisk Commander executable to your PATH.

### Install Lisk Commander from Source (GitHub)

Clone the Lisk Commander repository using Git and install the dependencies:

```shell
git clone https://github.com/LiskHQ/lisk-commander.git
cd lisk-commander
git checkout master
npm install
npm run build
```

### Adding the Lisk Commander executable to your PATH

<boxwarning markdown="1">
######Warning
If you have installed Lisk Commander globally via NPM (see Install Lisk Commander via NPM), following the instructions in this section is not recommended as they will introduce conflicts.
</boxwarning>

If you would like to add the `lisk` executable to your PATH you have two options: option 1 will install the current state of the code you are installing globally, while option 2 will only link to the code and therefore automatically reflect changes you make going forward.

#### 1. Install globally

Running this command from within the repository will add Lisk Commander to your global NPM packages, and add the `lisk` executable to your PATH. Be aware that any previous globally installed Lisk Commander version will get overridden with this local version.

```shell
npm install --global --production
```

Note that you will have to repeat this process for each subsequent build of Lisk Commander.

#### 2. Create a symlink

The other option is to ask NPM to create a symlink in the global folder that links to the package.

```shell
npm link
```

This will also add Lisk Commander to your PATH, but you won't have to repeat the process if you pull or create a new build. Be aware that any previous globally installed `lisk-commander` version will get overridden with this local version.

----

Htmltitle: Lisk Commander - Setup | Lisk Documentation

----

Whatsnext: asusual

----

Whatsnextheadline: 

----

Whatsnextpagelinktext: 

----

Whatsnextpagelink: 

----

Swaggerurl: 