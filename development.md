# Lisk Hub for developers

This page provides documentation for developers about how to run Lisk Hub from Source.

- [Setup](#setup)
  - [System requirements](#system-requirements)
  - [Installation](#installation)
- [User Guide](#user-guide)
  - [Build](#build)
  - [Testing](#testing)
  - [React Storybook](#react-storybook)

## Setup

### System requirements

- Ubuntu 16.04 (LTS) x86_64 or later
- MacOS 10.12 (Sierra) or later

### Installation

Clone the Lisk Hub repository:
```bash
git clone https://github.com/LiskHQ/lisk-hub.git
cd lisk-hub
npm install
npm run dev
```

Open `http://localhost:8080` in a browser, to verify that the installation was successful.
To enable the network switcher, use `http://localhost:8080/#/?showNetwork=true`.

If you are actively developing in a specific route, and want to be autologged in everytime you reload the page, please add the following to localStorage:

```js
localStorage.setItem('liskCoreUrl', 'http://localhost:4000') // desired node to log in into
localStorage.setItem('loginKey', 'wagon stock borrow episode laundry kitten salute link globe zero feed marble') // desired account passphrase
```

## User Guide

### Build

```bash
npm run build
```

### Electron

#### Start

Start the Electron client. Before staring you need to make sure the application is built.
If you need to build the entire application, run

```bash
npm run build
```

as mentioned before. And if you want to solely build electron app, run

```bash
npm run build-electron
```

Then, in order to launch electron, you can run

```bash
npm run start
```

Then, in order to launch version with hardware wallet, you can run

```bash
npm run dev-hardware-wallet
```

In order to launch electron that gets live updates from already running webpack-dev-server on port 8080, you can run

```bash
LISK_HUB_URL="http://localhost:8080" npm run start
```

#### Windows

Build package for Windows (on Windows in [Git BASH](https://git-for-windows.github.io/)).

```bash
npm run pack:win
```

#### macOS

Build package for macOS (on macOs)

```bash
npm run pack 
```

#### Linux

Build package for Linux (on Linux).

```bash
npm run pack 
```

### Testing

#### Run unit tests

##### Single run

```bash
npm run test
```

##### Run each time a file changes

```bash
npm run test-live
```

#### Run end-to-end tests
In order to run e2e tests you need to install [lisk-core](https://github.com/LiskHQ/lisk)

##### Setup core

Setup a lisk test node as described in [https://github.com/LiskHQ/lisk](https://github.com/LiskHQ/lisk)

Run lisk test node with [pm2](http://pm2.keymetrics.io/)  on `localhost:4000`

##### Run

Start the development version of lisk-hub:
```bash
npm run dev
```
Apply blockchain snapshot
 
```bash
./test/e2e-test-setup.sh ~/git/lisk/
```

(replace `~/git/lisk/` with your path to lisk core)

Run e2e tests
```bash
npm run cypress:run
```

### React Storybook

To launch storybook sandbox with components run
```
npm run storybook
```
and navigate to

`localhost:6006`
