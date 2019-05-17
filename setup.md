# Setup of Lisk Framework for Developers

## Supported Platforms

- Ubuntu 16.04 (LTS) x86_64
- Ubuntu 18.04 (LTS) x86_64
- MacOS 10.13 (High Sierra)
- MacOS 10.14 (Mojave)

### Dependencies

The following dependencies need to be installed in order to run applications created with the Lisk SDK:

| Dependencies     | Version |
| ---------------- | ------- |
| Node.js          | 10.15.3 |
| PostgreSQL       | 10+     |
| Redis (optional) | 5+      |
| Python           | 2       |

## Pre-Install

#### Node Version Manager

[Node.js](https://nodejs.org/) serves as the underlying engine for code execution.
There are several different ways and version managers to install Node.js on your system.
We recommend one of the following two:

We recommend using a Node version manager such as [NVM](https://github.com/creationix/nvm).
NVM is a bash script that enables you to manage multiple active Node.js versions.

1. Install nvm following these [instructions](https://github.com/creationix/nvm#install--update-script)
3. Install the correct version of Node.js using NVM:
```bash
nvm install 10.15.3
```

#### Node.js package

If you do not want to use NVM or other package managers, you can install the Node package globally on your system alternatively:

##### Ubuntu

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

##### MacOS

```bash
brew install node@10.15.3
```

## Installation

tbd
