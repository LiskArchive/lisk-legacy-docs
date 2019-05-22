# Lisk Core Docker Administration

This section details how to work with a Docker-based Lisk Core installation.
Listed below are available basic commands which can be used to manage your Docker-based Lisk node.
For more details, see each commands reference below.
A summary of all commands and associated flags has been provided for advanced users.

- [Basic commands](#basic-commands)
  * [Status of Lisk Core](#status)
  * [Start Lisk Core](#start)
  * [Stop Lisk Core](#stop)
  * [Reload Lisk Core](#reload)
  * [Reset Lisk Core](#reset--coldstart)
  * [Show logs](#logs)
  * [Run command](#run-a-command)
- [Configuration](#configuration)
- [Advanced Configuration](#advanced-configuration)
  * [Examples](#examples)
- [Sync from snapshot](#sync-from-snapshot)
  * [Automated](#automated)
  * [Manually](#manually)

## Basic Commands

> Below commands must be executed inside the `docker` directory of your Lisk Core installation.


### Status

```bash
docker-compose ps
```

### Start

```bash
docker-compose start lisk
```

### Stop

```bash
docker-compose stop lisk
```

### Restart

```bash
docker-compose restart lisk
```

### Reset / Coldstart

```bash
make coldstart
```

### Logs

```bash
docker-compose logs
```

### Run a command

To run a command in the container where your Lisk Core node is running, use [docker-compose exec](https://docs.docker.com/compose/reference/exec/).

```bash
docker-compose exec lisk curl "http://localhost:7000/api/node/status" --header "accept: application/json" # Example: How to make an API request to your node
```

## Configuration

Lisk Core normally gets configured by providing a suited [configuration file](../configuration.md).
But this isn't convenient in a Docker installation.
Instead, one can use environment variables to change values in the configuration.
To do so, open the `.env` file, that you created during [docker installation](../setup/docker.md#installation), and adjust the values to your needs.
All names of the environment variables start with `ENV_` prefix.

## Advanced configuration

For advanced configuration, open `docker/docker-compose.override.yml`.
Configuration variables always start with `LISK_` and are mapped to their path in `config.json`.
These can be changed directly in the file if needed.
For example, the value of `redis.db.host` can be changed by setting the `LISK_REDIS_DB_HOST` environment variable.
If you are unsure what variable name to use, refer to the [list of command line options](source.md#command-line-options). 

After editing the variables, reinitialize Lisk Core. It will read `docker-compose.yml` and your customized `docker-compose.override.yml` file:

```bash
docker-compose up -d
```

### Examples

#### Use redis for caching

Caching using Redis can be enabled with the `docker-compose.redis.yml` file, e.g.:

> When specifying additional `docker-compose` files like `docker-compose.redis.yml`, they need to be chained in the correct order by using the `-f` flag like below:

```bash
docker-compose -f docker-compose.yml -f docker-compose.override.yml -f docker-compose.redis.yml up -d
```

Note that the variables inside `docker-compose.redis.yml` can be defined in `docker-compose.override.yml` as well.

#### Do not expose ports:

(see https://docs.docker.com/compose/compose-file/#ports)

```
version: "3"
services:

  lisk:
    ports:
      - ${ENV_LISK_HTTP_PORT}
      - ${ENV_LISK_WS_PORT}
```

#### Increase log level to debug, enable public API:

(see https://docs.docker.com/compose/compose-file/#environment)

```
version: "3"
services:

  lisk:
    environment:
      - LISK_CONSOLE_LOG_LEVEL=debug
      - LISK_API_PUBLIC=true
```

#### Add forging delegates and whitelist IPs:

(see https://docs.docker.com/compose/compose-file/#environment)

```
version: "3"
services:

  lisk:
    environment:
      - LISK_FORGING_DELEGATES=publicKey1|encryptedPassphrase1,publicKey2|encryptedPassphrase2
      - LISK_API_WHITELIST=127.0.0.1,172.17.0.1
      - LISK_FORGING_WHITELIST=127.0.0.1,172.17.0.1
```

## Sync from a snapshot

Syncing from the Genesis block can take a lot of time as the whole blockchain needs to be downloaded and validated.
To accelerate this process, it is recommended to sync your node from a snapshot.
Snapshots are database dumps of the Blockchain on a certain blockheight. While syncing from a snapshot, your node will only validate blocks with higher blockheight than the one of the used snapshot.

> Lisk provides [official snapshots](https://downloads.lisk.io/lisk/) that will be used during the automated synching process. If you want to use third-party snapshots make sure they come from a reliable source.

### Automated

```bash
cd lisk/docker  # navigate into docker directory
make coldstart  # will download and restore a blockchain snapshot for you
```

### Manually

The command block in the example below will perform the process. The URL can be substituted for another `blockchain.db.gz` snapshot file if desired.

#### Example

For this example we expect the environment variables equal the following values:

- `ENV_LISK_NETWORK=mainnet`
- `ENV_LISK_DB_DATABASE=lisk`

```bash
cd lisk/docker            # navigate into docker directory
curl --output main_blockchain.db.gz https://downloads.lisk.io/lisk/main/blockchain.db.gz  # download and save the blockchain snapshot
docker-compose up -d      # initialize Lisk and postgreSQL
docker-compose stop lisk  # stop Lisk Core
docker-compose start db   # start postgreSQL
docker-compose -f docker-compose.yml -f docker-compose.make.yml run --rm db-task dropdb --if-exists lisk # drop old database
docker-compose -f docker-compose.yml -f docker-compose.make.yml run --rm db-task createdb lisk           # create fresh database
gzip --decompress --to-stdout main_blockchain.db.gz | docker-compose -f docker-compose.yml -f docker-compose.make.yml run --rm db-task psql >/dev/null # import snapshot into database
docker-compose start lisk # start Lisk container
```
