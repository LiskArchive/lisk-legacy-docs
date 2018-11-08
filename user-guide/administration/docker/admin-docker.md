# Lisk Core Docker Administration

This section details how to work with a Docker based Lisk Core installation.
Listed below are available basic commands which can be used to manage your Docker based Lisk node.
For more details, see each commands reference below.
A brief summary of all commands and associated flags has been provided for advanced users.

- [Basic commands](#basic-commands)
- [Configuration](#configuration)

## Basic Commands

Command | Description
--- | ---
`docker ps -a` | Retrieves deployed Docker containers.
`docker start container_id` | Starts a Docker container with the specified container_id
`docker stop container_id` | Stops a Docker container with the specified container_id
`docker restart container_id` | Restarts a Docker container with the specified container_id

Get Docker container id.

```bash
docker ps -a
```

The output from this command will be used in subsequent management entries.

Start Docker `container_id` (replace `container_id` with your own id)

```bash
docker start container_id
```

Stop Docker `container_id` (replace `container_id` with your own id)

```bash
docker stop container_id
```

Restart Docker `container_id` (replace `container_id` with your own id)

```bash
docker restart container_id
```

## Configuration

Lisk Core normally gets configured by providing a suited [configuration file](../../configuration/configuration.md).
But this isn't convenient in a Docker installation.
Instead, one can use environment variables to change values in the configuration.
To do so, open the `.env` file, that you created during [docker installation](../../../setup/install/docker/installation-docker.md), and adjust the values to your needs.
All names of the environment variables start with `ENV_` prefix.

#### Advanced configuration

For advanced configuration, open `docker/docker-compose.yml`.
Configuration variables always start with `LISK_` and are mapped to their path in `config.json`.
These can be changed directly in the file, if needed.
For example, the value of `redis.db.host` can be changed by setting the `LISK_REDIS_DB_HOST` environment variable.
If you are unsure what variable name to use, refer to the [list of command line options](../source/admin-source.md#command-line-options).

Info | Note 
--- | --- 
![info note](../../../info-icon.png "Info Note") | Adding an array component as environment variable in your docker compose is not straightforward. For example, if you aim to enable forging on your node for several delegates, you need to add the next variable which will be inserted in the array `forging.delegates`: _LISK_FORGING_DELEGATES=publicKey1&#x7c;encryptedPassphrase1,publicKey2&#x7c;encryptedPassphrase2_
