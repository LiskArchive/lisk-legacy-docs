# Lisk Core Docker Administration

This section details how to work with a Docker based Lisk Core installation.
Listed below are the available basic commands which can be used to manage your Docker based Lisk node.
For more details, see each commands reference below.
A brief summary of all commands and associated flags has been provided for advanced users.

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

### Configuration

Lisk Core normally gets configured by providing a suited [configuration file](../../configuration/configuration.md).
But this isn't convenient in a Docker installation.
Instead a [template](https://github.com/LiskHQ/lisk/blob/1.1.0/docker_files/etc/confd/templates/config.json.tmpl) is provided and configurations options can be passed as environment variables. 
We did so already by setting `LISK_DB_HOST` in `docker-compose.yml` above.

#### Changing the configuration of your Lisk installation

Configuration variables always start with `LISK_` and are mapped to their path in `config.json`.
For example, the value of `redis.db.host` can be changed by setting  the `LISK_REDIS_DB_HOST` environment variable.
If you are unsure what variable name to use, refer to the [list of command line options](../source/admin-source.md#command-line-options).

Info | Note 
--- | --- 
![info note](../../../info-icon.png "Info Note") | Adding an array component as environment variable in your docker compose is a bit tricky. For example, if you aim to enable forging on your node, you need to add the next variable which will be inserted as the **first** component in the array `forging.delegates`: ```LISK_FORGING_DELEGATES=publicKey1&#124;encryptedPassphrase1,publicKey2&#124;encryptedPassphrase2```

