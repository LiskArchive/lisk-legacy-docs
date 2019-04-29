# Setup of Lisk Framework

## Supported Platforms

- Ubuntu 16.04 (LTS) x86_64
- Ubuntu 18.04 (LTS) x86_64
- MacOS 10.13 (High Sierra)
- MacOS 10.14 (Mojave)

## Pre-Install

### Node.js

[Node.js](https://nodejs.org/) serves as the underlying engine for code execution.
There are several different ways and version managers to install Node.JS on your system.
We recommend one of the following two:

#### Node Version Manager

We recommend using a Node version manager such as [NVM](https://github.com/creationix/nvm).
NVM is a bash script that enables you to manage multiple active Node.js versions.

1. Install nvm following these [instructions](https://github.com/creationix/nvm#installation)
3. Install the correct version of Node.js using NVM:
```bash
nvm install 10.14.1
```

#### Node.js package

##### Ubuntu

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

##### MacOS

```bash
brew install node@10.14.1
```

## Installation

Install the [lisk-framework](https://www.npmjs.com/package/lisk-framework) NPM package.

```bash
cd /path/to/your-project # navigate into your projects folder
npm install --save lisk-framework@alpha # adds lisk-framework to your projects' dependencies in package.json
```
This will install `lisk-framework` in `/path/to/your-project/node_modules`.
Also, the package will be added to the dependencies of the project in your `package.json` file.

That's it!

As next step, you can start using the different components of `lisk-framework` in your project.
Check [Usage examples](...) and [Configuration]() for more details.
