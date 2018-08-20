Author: mona

----

Created: 2018-05-15

----

Updated: 2018-06-24

----

Metadescription: To upgrade a Lisk installation using Docker Compose you simply need to change the version number in your `docker-compose.yml` file.

----

Metakeywords: Lisk Core Docker Upgrade

----

Title: Docker

----

Opengraphtitle: Lisk Core Docker Upgrade

----

Opengraphimage: 

----

Opengraphdescription: 

----

Content: 

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

To actually upgrade your Lisk installation run `docker-compose up -d`.

----

Htmltitle: Lisk Core - Docker Upgrade | Lisk Documentation