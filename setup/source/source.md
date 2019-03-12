# Lisk Core from Source Setup

- [Pre-Installation](#pre-install)
  1. [Open necessary ports](#open-necessary-ports)
  2. [Create a new user](#create-a-new-user)
  3. [Install Tool chain components](#tool-chain-components)
  4. [Git](#git)
  5. [Node.js](#nodejs)
     * [Node version manager](#node-version-manager)
  6. [Postgres](#postgresql-version-10)
  7. [Redis](#installing-redis)
- [Installation](#installation)
  1. [Login as the Lisk user](#login-as-the-lisk-user)
  2. [Installing Lisk from Source](#installing-lisk-from-source)
- [Post-installation (optional)](#post-installation-optional)
  - [Logrotate Setup](#logrotate-setup)

## Pre-Install

This document details the prerequisites to install Lisk Core 1.0.0 from a Source installation using tagged releases on Github.
To complete the installation there are prerequisites that need to be fulfilled.  If you have already performed these, please proceed to the [Installation](#installation) chapter.

Firstly, please determine if your platform can install Lisk Core from source.

###### Supported Platforms
- Ubuntu 14.04 (LTS) x86_64
- Ubuntu 16.04 (LTS) x86_64
- Ubuntu 18.04 (LTS) x86_64
- MacOS 10.12 (Sierra)
- MacOS 10.13 (High Sierra)

### Open necessary ports

In order to connect to the desired network with Lisk Core , please ensure that the corresponding ports are open:

| Network | httpPort(HTTP) | wsPort(TCP) |
| -----------|-------------|-------------|
| Mainnet    | 8000         | 8001       |
| Testnet    | 7000         | 7001       |
| Betanet    | 5000         | 5001       |
| Devnet     | 4000         | 5000       |

These are the default ports for connecting with the network, they can be altered later in `config.json`. 

### Create a new user

In order to install the required prerequisites, it is necessary to have a user with sudo rights on the server.
In order to run and manage a Lisk Core node in the future, please create a separate 'Lisk' user like so:

#### Ubuntu

> The `lisk` user itself **does not need** any `sudo` rights to run Lisk Core.
    
```bash
sudo adduser lisk
```

### Tool chain components

Used for compiling dependencies.

#### Ubuntu

```bash
sudo apt-get update
sudo apt-get install -y python build-essential curl automake autoconf libtool ntp
```

#### MacOS

Ensure that both [XCode](https://developer.apple.com/xcode/) and [Homebrew](https://brew.sh/) are installed.

Update homebrew and install dependencies:

```bash
brew update
brew doctor
brew install curl automake autoconf libtool
```

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

Install System wide via package manager, like so:

#### Ubuntu

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### MacOS

```bash
brew install node@10.14.1
```

### Node version manager

We recommend to use a Node version manager such as [NVM](https://github.com/creationix/nvm).
NVM is a bash script that enables you to manage multiple active Node.js versions.

1. Login as lisk user, that has been created in the first step:
```bash
su - lisk
```
2. Install nvm following these [instructions](https://github.com/creationix/nvm#installation)
3. Install the correct version of Node.js using nvm:
```bash
nvm install 10.14.1
```

For the following steps,  logout from the 'lisk' user again with `CTRL+D`, and continue with your user with sudo rights.

### PostgreSQL (version 10)

#### Ubuntu

Firstly, install postgreSQL on your machine:
```bash
sudo apt-get purge -y postgres* # remove all already installed postgres versions
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
sudo apt install wget ca-certificates
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update
sudo apt install postgresql-10
```

After installation, you should see the postgres database cluster, by running
```bash
  pg_lsclusters
```

Drop the existing database cluster, and replace it with a cluster with the locale `en_US.UTF-8`:
```bash
  sudo pg_dropcluster --stop 10 main
  sudo pg_createcluster --locale en_US.UTF-8 --start 10 main
```
Create a new database user called `lisk` and grant it rights to create databases:
```bash
  sudo -u postgres createuser --createdb lisk
```

Switch to the lisk user and create the databases, where `{network}` is the network you want to connect your Lisk Core node to:
```bash
  su - lisk
  createdb lisk_{network}
  ```

For the following steps,  logout from the lisk user again with `CTRL+D`, and continue with your user with sudo rights.
Change `'password'` to a secure password of your choice.
```bash
  sudo -u postgres psql -d lisk_{network} -c "alter user lisk with password 'password';"
  ```

#### MacOS

```bash
brew install postgresql@10
initdb /usr/local/var/postgres -E utf8 --locale=en_US.UTF-8
brew services start postgresql@10
createdb lisk_{network}
```
`{network}` is the network you want to connect your Lisk Core node to.

### Installing Redis

#### Ubuntu

```bash
sudo apt-get install redis-server
```

Start redis:

```bash
sudo service redis-server start
```

Stop redis:

```bash
sudo service redis-server stop
```

#### MacOS

```bash
brew install redis
```

Start redis:

```bash
brew services start redis
```

Stop redis:
  
```bash
brew services stop redis
```

> Lisk does not run on the redis default port of `6379`. Instead it is configured to run on port: `6380`. Due to this, in order to run Lisk, you have one of two options:

1. **Change the Lisk configuration**

In the next installation phase, remember to update the Redis port configuration in both `config.json` and `test/data/config.json`. 

2. **Change the Redis launch configuration**

Update the launch configuration file on your system. Note that there are a number of ways to do this. 

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

If you have finished all above steps successfully, your system is ready for installation of Lisk Core.

## Installation

This section details how to install Lisk Core from Source. When completed, you will have a functioning node on the Lisk Network. If you are looking to upgrade your current Lisk Core installation, please see [Upgrade from Source](/lisk-core/upgrade/source/upgrade-source.md).

### Login as the Lisk user

This user was created in the [ Prerequisites](../../setup/pre-install/source/preinstall-source.md). 
If you are already logged in to this user, please skip this step.

```bash
su - lisk
```

### Installing Lisk from Source

Before proceeding, determine whether you wish to connect your node to the Mainnet (Main Network) or Testnet (Test Network).

```bash
git clone https://github.com/LiskHQ/lisk.git
cd lisk
git checkout v1.1.0 -b v1.1.0 # check out latest release tag
npm ci
```

> Please check for latest release on https://github.com/LiskHQ/lisk/releases

To test that Lisk Core is built and configured correctly, issue the following command to connect to the network:

```bash
npm start # default: connect to Devnet
LISK_NETWORK=[network] npm start # Use environment variables to overwrite config values (recommended)
npm start -- --network [network]  # Use flags to overwrite config values
```

Where `[network]` might be either `devnet` (default), `alphanet`, `betanet`, `testnet` or `mainnet`.

It is recommended to overwrite the config values with environment variables, if needed.
Useable variables will always start with `LISK_` prefix.
Click here, to see a [list of available environment variables](../../user-guide/administration/source/source.md#command-line-options)

If the process is running correctly, no errors are thrown in the logs.
By default, errors will be logged in `logs/[network]/lisk.log` only. You can change the logging level in `config.json`.
Once the process is verified as running correctly, `CTRL+C` and start the process with `pm2`.
This will fork the process into the background and automatically recover the process if it fails.

```bash
npx pm2 start --name lisk src/index.js -- --network [network]
```
Where `[network]` might be either `devnet` (default), `alphanet`, `betanet`, `testnet` or `mainnet`.

For details on how to manage or stop your Lisk node, please have a look in [Administration from Source](../../../user-guide/administration/source/admin-source.md).

If you are not running Lisk locally, you will need to follow the [Configuration - API](../../../user-guide/configuration/configuration.md#api-access-control) document to enable access.

With all of the above steps complete you are ready to move on to the configuration documentation if you wish to enable forging or SSL. 
Please see [General Configuration](../../../user-guide/configuration/configuration.md) for more information.

## Post-installation (optional)

### Logrotate Setup

It is recommended to setup a log rotation for the logfile of Lisk Core.

#### Ubuntu
Ubuntu systems provide a service called `logrotate` for this purpose.
Please ensure Logrotate is installed on your system:

```bash
logrotate --version
```

Next, go to the logrotate config directory and create a new logrotate file for Lisk Core:

```bash
cd /etc/logrotate.d
touch lisk
```

Inside this file, define the parameters for the log rotation.

Example values:

```bash
/path/to/lisk/logs/mainnet/*.log { 
        daily                   # daily rotation
        rotate 5                # keep the 5 most recent logs
        maxage 14               # remove logs that are older than 14 days
        compress                # compress old log files
        delaycompress           # compress the data, after it has been moved
        missingok               # if no logfile is present, ignore
        notifempty              # do not rotate empty log files
}
```

After customizing the config to fit your needs and saving it, you can test it by doing a dry run:

```bash
sudo logrotate /etc/logrotate.conf --debug
```
