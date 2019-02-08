# Lisk Mobile for developers

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
brew install node@8.3.0
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

In order to do so, the file `env.json` inside the lisk-mobile installation folder needs to serve the needed variables.

```js
{
 "network": "customNode",
 "address": "https://testnet.lisk.io",
 "passphrase": "drastic spot aerobic web wave tourist library first scout fatal inherit arrange",
 "secondPassphrase": "second custom passphrase"
}
```

- `network` 
  - `customNode` indicates, another variable `address` is set, which will be used when Lisk Mobile is started.
  - `testnet` will try to connect to a predefined testnet node, it is not needed to set `address`. If `address` is set, it will overwrite the predefined node.
- `address` takes an URL to a Lisk node, Lisk Mobile shall connect to.
- `passphrase` a mnemonic passphrase cann be specified here, that will be prefilled on the Login screen of Lisk Mobile.
- `secondPassphrase` lets the user predefine the second passphrase for the account as well, if it is needed.

### Run

```bash
npm start
```

### Build

#### Android

```bash
npm run build:android
```

#### iOS

```bash
npm run build:ios
```

### Testing

Run unit tests:

```bash
npm run test
```
