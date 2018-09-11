# Lisk Core Docker Installation

## Install Docker Compose

We suggest using [docker-compose](https://docs.docker.com/compose/install/) to run Lisk and its dependencies in Docker containers:

## Get configuration & Makefile

Go to [Lisk Docker Repository](https://github.com/LiskHQ/lisk-docker) on github and download following files:

```bash
mkdir lisk-docker
cd lisk-docker
curl -O https://raw.githubusercontent.com/LiskHQ/lisk-docker/2.2.0/examples/development/.env
curl -O https://raw.githubusercontent.com/LiskHQ/lisk-docker/2.2.0/examples/development/Makefile
curl -O https://raw.githubusercontent.com/LiskHQ/lisk-docker/2.2.0/examples/development/docker-compose.yml
```

## Set environment variables

In order to connect to the lisk network, the environment variables need to be set accordingly.
Open `.env` in an editor of your choice, e.g. vim:

```bash
vim .env
```

This is how the file looks with default values:

```bash
# Choose network and version:
ENV_LISK_NETWORK=devnet
ENV_LISK_VERSION=1.1.0-alpha.0

# Ports to expose
ENV_LISK_HTTP_PORT=4000
ENV_LISK_WS_PORT=5000

# Database configuration
ENV_LISK_DB_DATABASE=lisk
ENV_LISK_DB_USER=lisk
# Change this password before initializing the
# postgresql container for the first time.
ENV_LISK_DB_PASSWORD=password
```

Change the values according to your setup and the network you want your node to connect to.

## Coldstart Application

```bash
sudo make coldstart
```

You can then use `docker-compose` to see the status of your Lisk installation:

```bash
sudo docker-compose ps
```
