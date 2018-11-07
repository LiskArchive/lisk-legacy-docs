# Lisk Core Docker Installation

## Get configuration & Makefile

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

## Set environment variables

In order to connect to the lisk network, the environment variables need to be set accordingly.
Copy the environment variables of the network you want to connect to:

```bash
cp .env.{network} .env
```

## Coldstart Application

```bash
make coldstart
```

You can then use `docker-compose` to see the status of your Lisk installation:

```bash
docker-compose ps
```

As next step, check out [Docker Administration](../../../user-guide/administration/docker/admin-docker.md) to learn how to manage your Node.
