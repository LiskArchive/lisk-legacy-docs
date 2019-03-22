# Lisk Hub for developers

This page provides documentation for developers about how to run Lisk Hub from Source.

- [Setup](#setup)
  - [System requirements](#system-requirements)
  - [Installation](#installation)
- [User Guide](#user-guide)
  - [Build](#build)
  - [Electron](#electron)
  - [React Storybook](#react-storybook)
  - [Testing](#testing)

## Setup

### System requirements

- Ubuntu 16.04 (LTS) x86_64 or later
- MacOS 10.12 (Sierra) or later

### Installation

```bash
git clone https://github.com/LiskHQ/lisk-hub.git # clone the Lisk Hub repository
cd lisk-hub
npm install # install dependencies
npm run dev # start development version of Lisk Hub
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

Start the Electron client. Before starting you need to make sure the application is built.
If you need to build the entire application, run

```bash
npm run build
```

as mentioned before. And if you want to solely build the Electron app, run

```bash
npm run build-electron
```

Then, to launch Electron, you can run

```bash
npm run start
```

Then, to launch the version with hardware wallet, you can run

```bash
npm run dev-hardware-wallet
```

To launch Electron that gets live updates from already running webpack-dev-server on port 8080, you can run

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

### React Storybook

To launch storybook sandbox with components run
```bash
npm run storybook
```
and navigate to `localhost:6006`

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

To run e2e tests you need to install [Lisk Core](https://github.com/LiskHQ/lisk).

##### Setup Lisk Core

Setup a Lisk node from Source, as described in [https://github.com/LiskHQ/lisk](https://github.com/LiskHQ/lisk)

And connect to `devnet` with it (`localhost:4000`)

##### Run

Start the development version of lisk-hub:
```bash
npm run dev
```
Apply blockchain snapshot
 
```bash
./test/e2e-test-setup.sh ~/git/lisk/
```

(replace `~/git/lisk/` with your path to Lisk Core)

Run e2e tests
```bash
npm run cypress:run
```
