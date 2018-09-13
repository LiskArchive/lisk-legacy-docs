# Lisk Core Docker Installation

Info | Note
---- | ----
![info note](../../../info-icon.png "Info Note") | Lisk Core 1.1 is already released on Testnet. If you wish to connect to Testnet, please refer to [Lisk Core 1.1.0 documentation](https://github.com/LiskHQ/lisk-docs/blob/core-1.1.0/introduction.md).

## Run Lisk in Docker

We suggest using `docker-compose` to run Lisk and its dependencies in Docker containers:

### Create configuration (executed only once per installation)
Before you proceed, you must  determine whether you wish to connect your node to the Mainnet (Main Network) or  to the Testnet (Test Network).

#### Mainnet

Create a `mainnet` directory and a `docker-compose.yml` file inside of that directory with the following content:

```
version: "2"
services:

  lisk:
    image: lisk/mainnet:1.0.0
    volumes:
      - lisk-logs:/home/lisk/lisk/logs/
    ports:
      - "8000:8000"
      - "8001:8001"
    networks:
      - lisk-main
    depends_on:
      - db
    restart: on-failure
    command: ["/home/lisk/wait-for-it.sh", "db:5432", "--", "/home/lisk/run.sh"]
    environment:
      - LISK_DB_HOST=db

  db:
    image: postgres:9.6-alpine
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - lisk-main
    restart: on-failure
    environment:
      - POSTGRES_DB=lisk_main
      - POSTGRES_PASSWORD=password
      - POSTGRES_USER=lisk

  task:
    image: postgres:9.6-alpine
    networks:
      - lisk-main
    environment:
      - PGUSER=lisk
      - PGPASSWORD=password
      - PGDATABASE=lisk_main
      - PGHOST=db
    command: /bin/true

networks:
  lisk-main:

volumes:
  db-data:
  lisk-logs:
```

As a convenience we provide a [Makefile](https://github.com/LiskHQ/lisk-docker/blob/2.1.0/examples/mainnet/Makefile) to easily restore a snapshot and start Lisk in Docker:
While still in the `mainnet` directory run:

<!-- TODO: fix branch -->
```shell
wget https://github.com/LiskHQ/lisk-docker/raw/2.1.0/examples/mainnet/Makefile
make coldstart
```

You can then use `docker-compose` to see the status of your Lisk installation:

```shell
cd testnet/
docker-compose ps
```

To learn more about Docker Compose please refer to the [Official Documentation](https://docs.docker.com/compose/gettingstarted/).

#### Testnet

Create a `testnet` directory and a `docker-compose.yml` file inside of that directory with the following content:

```
version: "2"
services:

  lisk:
    image: lisk/testnet:1.0.0
    volumes:
      - lisk-logs:/home/lisk/lisk/logs/
    ports:
      - "7000:7000"
      - "7001:7001"
    networks:
      - lisk-test
    depends_on:
      - db
    restart: on-failure
    command: ["/home/lisk/wait-for-it.sh", "db:5432", "--", "/home/lisk/run.sh"]
    environment:
      - LISK_DB_HOST=db

  db:
    image: postgres:9.6-alpine
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - lisk-test
    restart: on-failure
    environment:
      - POSTGRES_DB=lisk_test
      - POSTGRES_PASSWORD=password
      - POSTGRES_USER=lisk

  task:
    image: postgres:9.6-alpine
    networks:
      - lisk-test
    environment:
      - PGUSER=lisk
      - PGPASSWORD=password
      - PGDATABASE=lisk_test
      - PGHOST=db
    command: /bin/true

networks:
  lisk-test:

volumes:
  db-data:
  lisk-logs:
```

As a convenience we provide a [Makefile](https://github.com/LiskHQ/lisk-docker/blob/2.1.0/examples/testnet/Makefile) to easily restore a snapshot and start Lisk in Docker:
While still being inside the `testnet` directory run:

<!-- TODO: fix branch -->
```shell
wget https://github.com/LiskHQ/lisk-docker/raw/2.1.0/examples/testnet/Makefile
make coldstart
```

You can then use `docker-compose` to see the status of your Lisk installation:

```shell
cd testnet/
docker-compose ps
```

To learn more about Docker Compose please refer to the [Official Focumentation](https://docs.docker.com/compose/gettingstarted/).
