# Lisk Commander Setup

- [Pre-Installation](#pre-installation)
  - [Determine if your platform can run Node](#determine-if-your-platform-can-run-node)
  - [Install Node](#install-node)
- [Installation](#installation)
  - [Install Lisk Commander via NPM](#install-lisk-commander-via-npm)
  - [Install Lisk Commander from Source](#install-lisk-commander-from-source)
    - [Adding the Lisk Commander executable to your PATH](#adding-the-lisk-commander-executable-to-your-path)

## Pre-Installation

Lisk Commander requires [Node.js](https://nodejs.org/) as the underlying engine for code execution.

### Determine if your platform can run Node

###### Supported Platforms
- Windows 10
- macOS
- Linux

###### Not Supported
- Platforms without NodeJS versions 8.3 and above.

### Install Node

Node.js is supported on most operating systems. Follow the instructions for your operating system on the [Node.js downloads page](https://nodejs.org/en/download/). 
Lisk-Commander requires Node.js versions 8.3 or above.
NPM is automatically installed along with Node.js.

#### Verify Node installation

Confirm that Node.js and NPM have been successfully installed by running

```bash
node --version
npm --version
```

## Installation

This section details how to install Lisk Commander for a given distribution.
If you have satisfied the requirements from the [Pre-Installation](#pre-installation) section, you can proceed with the type of installation you would like to perform from the table below.

### Install Lisk Commander via NPM

To install the latest version of Lisk Commander as a global command, please proceed with the following:

```bash
npm install --global --production lisk-commander
```

Upon successful completion, NPM will add the Lisk Commander executable to your PATH.

### Install Lisk Commander from Source

Clone the Lisk Commander repository using Git and install the dependencies:

```bash
git clone https://github.com/LiskHQ/lisk-sdk.git
git checkout master
cd lisk-sdk/lisk-commander
npm install
npm run build
```

#### Adding the Lisk Commander executable to your PATH

> **Important:** If you have installed Lisk Commander globally [via NPM](#install-lisk-commander-via-npm), you can skip this step. Following the instructions in this section is not recommended as they will introduce conflicts.

If you would like to add the `lisk` executable to your PATH you have two options: option 1 will install the current state of the code you are installing globally, while option 2 will only link to the code and therefore automatically reflect changes you make going forward.

##### 1. Install globally

Running this command from within the repository will add Lisk Commander to your global NPM packages, and add the `lisk` executable to your PATH. Be aware that any previous globally installed Lisk Commander version will get overridden with this local version.

```bash
npm install --global --production
```

Note that you will have to repeat this process for each subsequent build of Lisk Commander.

##### 2. Create a symlink

The other option is to ask NPM to create a symlink in the global folder that links to the package.

```bash
npm link
```

This will also add Lisk Commander to your PATH, but you won't have to repeat the process if you pull or create a new build. Be aware that any previous globally installed `lisk-commander` version will get overridden with this local version.
