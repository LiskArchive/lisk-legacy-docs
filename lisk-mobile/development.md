# Lisk Mobile for developers

This page provides documentation for developers about how to run Lisk Mobile from Source.

- [Setup](#setup)
  - [System requirements](#system-requirements)
  - [Pre-Installation](#pre-installation)
    - [Git](#git)
    - [Node.js](#node-js)
    - [Node Version Manager](#node-version-manager)
    - [Watchman](#watchman)
    - [React Native CLI](#react-native-cli)
    - [Emulator](#choose-emulator)
  - [Installation](#installation)
- [User Guide](#user-guide)
  - [Using environment variables](#using-environment-variables)
  - [Run](#run)
  - [Build](#build)
  - [Testing](#testing)

## Setup

### System requirements

- Ubuntu 16.04 (LTS) x86_64 or later
- MacOS 10.12 (Sierra) or later

### Pre-Installation

#### Git

Firstly, Git is needed in order to clone the project from Github.

##### Ubuntu

```bash
sudo apt-get install -y git
```

##### macOS

```bash
brew update
brew install git
```

#### Node.js

##### Ubuntu

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

##### macOS

```bash
brew install node@8.14.0
```

#### Node version manager

> A node version manager is optional, but recommended in order to manager installation of different Node.JS versions conveniently.

- Install NVM following the [NVM installation instructions.](https://github.com/creationix/nvm#installation)
- After successful installation, install the correct version of Node.js like so:

```bash
nvm install 8.3.0
```

#### Watchman

##### Ubuntu

```bash
git clone https://github.com/facebook/watchman.git
cd watchman/
git checkout v4.9.0 # checkout latest stable release
sudo apt-get install -y autoconf automake build-essential python-dev libssl-dev libtool
./autogen.sh
./configure
make
sudo make install
```

##### macOS

```bash
brew install watchman
```

#### React-native-CLI

```bash
npm i -g react-native-cli
```

#### Choose emulator

You can run the project in Xcode and use iOS emulators or alternatively use Android emulators. There are several options to set up your Android development environment. Please read React Native docs for more info.

###### iOS Simulator

You'll need the Xcode installed in your machine to run the app in simulator.

Follow the [installation instructions by Apple](https://developer.apple.com/xcode/) for installation.

##### Android Studio

- Download and install Android Studio, following the [instructions on android.com](https://developer.android.com/studio/).
- Check the following options during installation:
  - Android SDK, consider these configurations:
    - compileSdkVersion: 26
    - buildToolsVersion: 27.0.3
  - Android SDK Platform
  - Performance (Intel ® HAXM)
  - Android Virtual Device

### Installation

```bash
git clone https://github.com/LiskHQ/lisk-mobile.git
cd lisk-mobile
npm install
npm run start
```

## User Guide

### Using environment variables

By using environment variables, the user can
- automatically login to the application on startup, with a pre defined account during development
- connect to a custom node

In order to do so, the file `env.json` inside the `lisk-mobile` installation folder needs to serve the needed variables.

```js
{
 "network": "customNode", // Lisk network's name
 "address": "https://testnet.lisk.io", // Lisk network's url
 "passphrase": "drastic spot aerobic web wave tourist library first scout fatal inherit arrange", // Passphrase of your LSK account, to be filled out automatically on login
 "secondPassphrase": "second custom passphrase" // Second passphrase of your LSK account, to be filled out automatically on send process
}
```

- `network` 
  - `customNode` indicates, another variable `address` is set, which will be used when Lisk Mobile is started.
  - `testnet` will try to connect to a predefined testnet node, it is not needed to set `address`. If `address` is set, it will overwrite the predefined node.
- `address` takes an URL to a Lisk node, Lisk Mobile shall connect to.
- `passphrase` a mnemonic passphrase can be specified here, that will be prefilled on the login screen of Lisk Mobile.
- `secondPassphrase` lets the user predefine the second passphrase for the account as well, if it is needed.


> `env.json` should stay empty, when commiting changes back to Github. To achieve this in a convenient way, the user may want to run the following command in order to ignore changes to that file in git:
> 
> ```bash
> git update-index --no-assume-unchanged env.json
> ```

### Run

```bash
npm start
```

### Build

To build a release of Lisk Mobile, that can be installed on a device.

#### Android

```bash
npm run build:android
```

#### iOS

```bash
npm run build:ios
```

### Testing

To test if the software works as expected, run the unit tests like so:

```bash
npm run test
```
