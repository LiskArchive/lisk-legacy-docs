# Lisk Core from Source Setup

- [Pre-Installation](#pre-install)
  1. [Open necessary ports](#open-necessary-ports)
  2. [Create a new user](#create-a-new-user)
  3. [Install Tool chain components](#toolchain-components)
  4. [Git](#git)
  5. [Node.js](#nodejs)
     * [Node version manager](#node-version-manager)
  6. [Postgres](#postgresql-version-10)
  7. [Redis](#installing-redis)
- [Installation](#installation)
  1. [Login as the Lisk user](#login-as-the-lisk-user)
  2. [Installing Lisk from Source](#installing-lisk-from-source)
- [Post-installation (optional)](#post-installation-optional)

## Pre-Install

This document details the prerequisites to install Lisk Core 1.0.0 from a Source installation using tagged releases on Github.
To complete the installation, some prerequisites need to be fulfilled.  If you have already performed these, please proceed to the [Installation](#installation) chapter.

Firstly, please determine if your platform can install Lisk Core from source.

###### Supported Platforms
- Ubuntu 16.04 (LTS) x86_64
- Ubuntu 18.04 (LTS) x86_64
- MacOS 10.13 (High Sierra)
- MacOS 10.14 (Mojave)

### Open necessary ports

To connect to the desired network with Lisk Core, please ensure that the corresponding ports are open:

| Network | httpPort(HTTP) | wsPort(TCP) |
| -----------|-------------|-------------|
| Mainnet    | 8000        | 8001        |
| Testnet    | 7000        | 7001        |
| Betanet    | 5000        | 5001        |
| Devnet     | 4000        | 5000        |

These are the default ports for connecting with the network, they can be altered later in `config.json`. 

### Create a new user

To install the required prerequisites, it is necessary to have a user with sudo rights on the server.
To run and manage a Lisk Core node in the future, please create a separate 'Lisk' user like so:

#### Ubuntu

> The `lisk` user itself **does not need** any `sudo` rights to run Lisk Core.
    
```bash
sudo adduser lisk
```

### Toolchain components

Used for compiling dependencies.

#### Ubuntu

```bash
sudo apt-get update
sudo apt-get install -y build-essential python-minimal
```

#### MacOS

Ensure that both [XCode](https://developer.apple.com/xcode/) and [Homebrew](https://brew.sh/) are installed.

### Git 

[Git](https://github.com/git/git) is used for cloning and updating Lisk.

#### Ubuntu

```bash
sudo apt-get install -y git
```

#### MacOS

```bash
brew install git
```

### Node.js

[Node.js](https://nodejs.org/) serves as the underlying engine for code execution.

#### Node version manager

We recommend using a Node version manager such as [NVM](https://github.com/creationix/nvm).
NVM is a bash script that enables you to manage multiple active Node.js versions.

1. Login as `lisk` user, that has been created in the first step:
```bash
sudo -u lisk -i
```
2. Install nvm following these [instructions](https://github.com/creationix/nvm#installation)
3. Install the correct version of Node.js using nvm:
```bash
nvm install 10.15.3
```

For the following steps, log out from the `lisk` user again with `CTRL+D`, and continue with your user with sudo rights.

#### Node.js Package

Alternatively, you can install Node.js system-wide via a package manager, like so:

#### Ubuntu

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### MacOS

```bash
brew install node@10.15.3
```

### PostgreSQL (version 10)

To install Postgres follow the intructions descibed below, depending on the operating system your machine is running on. 
If you run into issues when trying to set up PostgreSQL on your machine, try to install it inside of a docker container.

> We recommend using Postgres with Docker for a quick and straight forward setup of Postgres.
 
#### A. Postgres with Docker

This is a simple way to install postgres on your machine.
To perform the command below successfully, [install Docker](docker.md) like described in the Setup page of Lisk Core Docker distribution.

> If you have other versions of PostgreSQL installed on your machine, make sure to stop them before starting the docker container.

```bash
docker run --name lisk_core_db -p 5432:5432 -e POSTGRES_USER=lisk -e POSTGRES_PASSWORD=password -e POSTGRES_DB=lisk_<NETWORK> -d postgres:10
```

This will install PostgreSQL version 10 (`postgres:10`) in a container with name `lisk_dev_db` and binds the port `5432` of the container with the same port of the machine.
As environment variables we expose `POSTGRES_USER=lisk` to create the lisk user and `POSTGRES_PASSWORD=password` to set the password for the lisk user.
Finally the environment variable `POSTGRES_DB` creates the database `lisk_dev` witht he `lisk` user as owner.

The above should be enough to set up the database ready to use with Lisk Core.
To manage the Docker container, use the following commands:

```bash
docker stop lisk_core_db # stop the container
docker start lisk_core_db # start the container
docker restart lisk_core_db # restart the container
docker rm lisk_core_db # remove the container
```

In case you want to access Postgres inside the container via CLI, run:
```bash
docker exec --tty --interactive lisk_core_db psql -h localhost -U lisk -d postgres
```

#### B. Postgres system-wide

##### Ubuntu

Firstly, install postgreSQL on your machine:
```bash
sudo apt-get purge -y postgres* # remove all already installed postgres versions
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
sudo apt install wget ca-certificates
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update
sudo apt install postgresql-10
```

After installation, you should see the Postgres database cluster, by running
```bash
pg_lsclusters
```

Drop the existing database cluster, and replace it with a cluster with the locale `en_US.UTF-8`:
```bash
sudo pg_dropcluster --stop 10 main
sudo pg_createcluster --locale en_US.UTF-8 --start 10 main
```
Create a new database user called `lisk` and grant it rights to create databases.
Then create the database with the lisk user as owner.
In the last step, define the password for the lisk user:
```bash
sudo -u postgres -i createuser --createdb lisk
sudo -u postgres -i createdb lisk_<NETWORK> --owner lisk
sudo -u postgres psql -d lisk_<NETWORK> -c "alter user lisk with password 'password';"
```
`<NETWORK>` may be `main` for Mainnet, `test` for Testnet or `dev` for Devnet.

> Change 'password' to a secure password of your choice.

##### MacOS

```bash
brew install postgresql@10
initdb /usr/local/var/postgres -E utf8 --locale=en_US.UTF-8
brew services start postgresql@10
createuser --createdb lisk
createdb lisk_<NETWORK>
psql -d lisk_<NETWORK> -c "alter user lisk with password 'password';"
```
`<NETWORK>` may be `main` for Mainnet, `test` for Testnet or `dev` for Devnet.

> Change 'password' to a secure password of your choice.

### Installing Redis

#### Ubuntu

```bash
sudo apt-get install redis-server
```

Start Redis:

```bash
sudo service redis-server start
```

Stop Redis:

```bash
sudo service redis-server stop
```

#### MacOS

```bash
brew install redis
```

Start Redis:

```bash
brew services start redis
```

Stop Redis:
  
```bash
brew services stop redis
```

> Lisk does not run on the redis default port of `6379`. Instead it is configured to run on port: `6380`.
> Due to this, to run Lisk, you have one of two options:

A. **Change the Lisk configuration**

In the next installation phase, remember to update the Redis port configuration in `config.json`.

B. **Change the Redis launch configuration**

Update the launch configuration file on your system. Note that there are many ways to do this. 

The following is one example:

1. Stop redis-server
2. Edit the file `redis.conf` and change: `port 6379` to `port 6380`
   * Ubuntu/Debian: `/etc/redis/redis.conf`
   * MacOS: `/usr/local/etc/redis.conf`
3. Start redis-server

Now confirm that redis is running on `port 6380`:

```bash
redis-cli -p 6380
ping
```

And you should get the result `PONG`.

If you have finished all the above steps successfully, your system is ready for installation of Lisk Core.

## Installation

This section details how to install Lisk Core from Source. When completed, you will have a functioning node on the Lisk Network.
If you are looking to upgrade your current Lisk Core installation, please see [Upgrade from Source](../upgrade/source.md).

### Login as the Lisk user

This user was created in the [Prerequisites](#pre-install). 
If you are already logged in to this user, please skip this step.

```bash
sudo -u lisk -i
```

### Installing Lisk from Source

```bash
git clone https://github.com/LiskHQ/lisk-core.git # clone the repository
cd lisk-core                  # navigate into the lisk-core root folder
git checkout v2.0.0 -b v2.0.0 # check out the latest release tag
npm ci                        # install dependencies
npm run build                 # compile packages
```

> Please check for latest release on https://github.com/LiskHQ/lisk-core/releases

To test that Lisk Core is built and configured correctly, issue the following command to connect to the network:

```bash
node dist/index.js # Default: connect to Devnet
LISK_NETWORK=[network] node dist/index.js # Use environment variables to overwrite config values (recommended)
node dist/index.js --network [network]  # Use flags to overwrite config values
```

Where `[network]` might be either `devnet` (default), `alphanet`, `betanet`, `testnet` or `mainnet`.

It is recommended to overwrite the config values with environment variables if needed.
Useable variables will always start with `LISK_` prefix.
Alternatively, the user may define a custom `config.json`, like described in [Configuarion of Lisk Core](../configuration.md)
Click here, to see a [list of available environment variables](../administration/source.md#command-line-options)

If the process is running correctly, no errors are thrown in the logs.
By default, errors will be logged in `logs/[network]/lisk.log`.
Once the process is verified as running correctly, `CTRL+C` and start the process with `pm2`.
This will fork the process into the background and automatically recover the process if it fails.

```bash
npx pm2 start --name lisk dist/index.js -- --network [network]
```
Where `[network]` might be either `devnet` (default), `alphanet`, `betanet`, `testnet` or `mainnet`.

For details on how to manage or stop your Lisk node, please have a look in [Administration from Source](../administration/source.md).

If you are not running Lisk locally, you will need to follow the [Configuration - API](../configuration.md#api-access-control) document to enable access.

That's it!
You are ready to move on to the [configuration](../configuration.md) documentation if you wish to enable forging or SSL. 

## Post-installation (optional)

- Recommended: Set up a [log rotation](../configuration.md#logrotation)
