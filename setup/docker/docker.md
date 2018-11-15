# Lisk Core Docker Setup

- [Pre-Install](#pre-install)
  1. [Mac OS X](#mac-os-x)
  2. [Windows](#windows)
  3. [Linux](#linux)
  4. [Open necessary ports](#open-necessary-ports)
- [Installation](#installation)
  1. [Get configuration and Makefile](#get-configuration-and-makefile)
  2. [Set environment variables](#set-environment-variables)
  3. [Coldstart application](#coldstart-application)
  

## Pre-install

This document will detail how to prepare a system to run Lisk Core as a Docker based container. In order to run Lisk in Docker a user must first install the Docker Engine. Additionally it is recommended to install Docker Compose for convenience.

Determine if your platform can run Docker.

###### Supported Platforms
Please refer to https://docs.docker.com/engine/installation/#desktop

### Mac OS X

Please refer to https://docs.docker.com/docker-for-mac/install/. 
Please note that Docker for Mac already includes Docker Compose. 
Install `make` using [XCode](https://developer.apple.com/xcode/features/) 

### Windows

Please refer to https://docs.docker.com/docker-for-windows/install/
Please note that Docker for Windows includes Docker Compose.

### Linux

Please refer to https://docs.docker.com/engine/installation/#server

To install Docker Compose, please refer to: https://docs.docker.com/compose/install/

**Important**: Configure Docker, so it can be run without `sudo` rights: https://docs.docker.com/install/linux/linux-postinstall/

Install `make` using your package manager. For example, use `apt-get` if running Ubuntu:

```bash
sudo apt-get install make
```

### Open necessary ports

In order to connect to the desired network with Lisk Core , please ensure that the corresponding ports are open:

| Network | httpPort(HTTP) | wsPort(TCP) |
| --------|----------------|-------------|
| Mainnet | 8000           | 8001        |
| Testnet | 7000           | 7001        |
| Betanet | 5000           | 5001        |
| Devnet  | 4000           | 5000        |

These are the default ports for connecting with the network, these can be altered later in `.env`.

## Installation

### Get configuration and Makefile

Clone the [Lisk Repository](https://github.com/LiskHQ/lisk). It contains a directory `docker` with the following files:
- `Makefile`
- `docker-compose.yml`
- `.env.{network}`

The `.env`-files are examples, where `{network}` stands for the lisk network you want to connect.

```bash
su - lisk # switch to lisk user
git clone https://github.com/LiskHQ/lisk.git # clone the repository
cd lisk/docker # navigate into docker directory
```

### Set environment variables

In order to connect to the lisk network, the environment variables need to be set accordingly.
Copy the environment variables of the network you want to connect to:

```bash
cp .env.{network} .env
```

### Coldstart application

```bash
make coldstart
```

You can then use `docker-compose` to see the status of your Lisk installation:

```bash
docker-compose ps
```

As next step, check out [Docker Administration](../../user-guide/administration/docker/admin-docker.md) to learn how to manage your Node.
