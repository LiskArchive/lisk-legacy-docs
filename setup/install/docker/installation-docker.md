# Lisk Core Docker Installation

Info | Note
---- | ----
![info note](../../../info-icon.png "Info Note") | The installation process has changed from Lisk Core `1.0` to `1.1`. If you wish to install the `1.0` version of Lisk Core, please visit the [Lisk Docs Github Repository](https://github.com/LiskHQ/lisk-docs), where you can find a full archived version of [Lisk Core 1.0 documentation](https://github.com/LiskHQ/lisk-docs/blob/core-1.0.0/introduction.md)

## Get configuration & Makefile

Clone [Lisk Docker Repository](https://github.com/LiskHQ/lisk-docker). It contains the following files:
- `Makefile`
- `docker-compose.yml`
- `.env.{network}`

The `.env`-files are examples, where `{network}` stands for the lisk network you want to connect.

```bash
su - lisk # switch to lisk user
git clone https://github.com/LiskHQ/lisk-docker.git # clone the repository
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
