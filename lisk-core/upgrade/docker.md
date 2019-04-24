# Lisk Core Docker Upgrade

## Upgrade Lisk Core

To upgrade a Lisk installation using Docker Compose you simply need to change the version number in your `docker-compose.yml` file. For example if you were using `lisk/mainnet:1.0.0` (Lisk Docker image for mainnet version 1.0.0) and want to update to version 1.1.0 you simply change `lisk/mainnet:1.0.0` to `lisk/mainnet:1.1.0`. 

Your `docker-compose.yml` file would then look like this:

```
version: "2"
services:

  lisk:
    image: lisk/mainnet:1.1.0
[...]
```

To upgrade the Lisk installation run `docker-compose up -d`.
