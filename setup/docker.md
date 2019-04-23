# Lisk Core Docker Setup

- [Pre-Install](#pre-install)
  1. [Mac OS X](#mac-os-x)
  2. [Windows](#windows)
  3. [Linux](#linux)
  4. [Open necessary ports](#open-necessary-ports)
  5. [Create a new user](#create-a-new-user)
- [Installation](#installation)
  1. [Get configuration and Makefile](#get-configuration-and-makefile)
  2. [Set environment variables](#set-environment-variables)
  3. [Coldstart application](#coldstart-application)  

## Pre-install

This document will detail how to prepare a system to run Lisk Core as a Docker-based container. To run Lisk in Docker a user must first install the Docker Engine. Additionally, it is recommended to install Docker Compose for convenience.

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

To install Docker Compose, please refer to https://docs.docker.com/compose/install/

**Important**: Configure Docker, so it can be run without `sudo` rights: https://docs.docker.com/install/linux/linux-postinstall/

Install `make` using your package manager. For example, use `apt-get` if running Ubuntu:

```bash
sudo apt-get install make
```

### Open necessary ports

To connect to the desired network with Lisk Core, please ensure that the corresponding ports are open:

| Network | httpPort(HTTP) | wsPort(TCP) |
| --------|----------------|-------------|
| Mainnet | 8000           | 8001        |
| Testnet | 7000           | 7001        |
| Betanet | 5000           | 5001        |
| Devnet  | 4000           | 5000        |

These are the default ports for connecting with the network, these can be altered later in `.env`.

### Create a new user

To run and manage a Lisk Core node in the future, please create a separate 'lisk' user like so:

#### Ubuntu

The `lisk` user itself **does not need** any `sudo` rights to run Lisk Core. It is sufficient to create a group `docker` and add the newly created user to that group, to enable the user to use Docker (see: https://docs.docker.com/install/linux/linux-postinstall/).
    
```bash
sudo adduser lisk              # create a new user
sudo groupadd docker           # create docker group
sudo usermod -aG docker lisk   # add the user to docker group
```

## Installation

### Get configuration and Makefile

Clone the [Lisk Repository](https://github.com/LiskHQ/lisk). 

```bash
su - lisk                                    # switch to lisk user
git clone git@github.com:LiskHQ/lisk-sdk.git # clone the repository
cd lisk/docker                               # navigate into docker directory
```

It contains a directory `docker` with the following files:
- `.env.development`
- `.env.mainnet`
- `.env.testnet`
- `docker-compose.make.yml`: used by `make coldstart`.
- `docker-compose.override.yml`: use this file to overwrite `LISK_` variables (empty by default).
- `docker-compose.redis.yml`: enable cache (optional).
- `docker-compose.yml`
- `Makefile`

The `.env`-files are templates with network specific environment variables.

### Set environment variables

To connect to the Lisk network, the environment variables need to be set accordingly.

Before setting the variables, you may want to edit them in the respective `.env.{network}` file.

It is recommended to change the password for the database, which is stored in `ENV_LISK_DB_PASSWORD`.

To install a specific version of Lisk Core, set the `ENV_LISK_VERSION` to the respective version.

After adjusting them, copy the environment variables to a file called `.env`:

```bash
cp .env.{network} .env
```

Where `{network}` stands for the Lisk network you want to connect to.

### Coldstart application

#### Option 1: Makefile

We recommend to use the Makefile:

```bash
make  # will run `docker-compose up` for you
```

Makefile provides a convenient way to [sync your node from snapshot](../administration/docker.md#sync-from-snapshot):

```bash
make coldstart  # will download and restore a blockchain snapshot for you
```

#### Option 2: docker-compose

```bash
docker-compose up -d # initialize Lisk Core
docker-compose ps    # see the status of Lisk Core
docker-compose logs  # see logs
```

As next step, check out [Docker Administration](../administration/docker.md) to learn how to manage your Node.
