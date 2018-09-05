# Lisk Core Source Pre-Install

This document details the prerequisites to install Lisk Core 1.0.0 from a Source installation using tagged releases on Github.
To complete the installation there are prerequisites that need to be fulfilled.  If you have already performed these, please proceed to the [Installation](/lisk-core/setup/install/source/install-source.md) page.

### Steps:

1. [Open necessary ports](#open-necessary-ports)
2. [Create a new user](#create-a-new-user)
3. [Install Tool chain components](#tool-chain-components)
4. [Git Installation](#git)
5. [Node.js Installation](#node-js)
    1. [Recommended: Install NVM ](#recommended-install-a-version-manager-such-as-nvmhttps--githubcom-creationix-nvm)
    2. [Recommended: Install PM2 ](#recommended-pm2-https--githubcom-unitech-pm2)
6. [Postgres Installation](#postgresql-version-96)
7. [Redis Installation](#installing-redis)

Firstly, please determine if your platform can install Lisk Core from source.

###### Supported Platforms
- Ubuntu 14.04 (LTS) x86_64
- Ubuntu 16.04 (LTS) x86_64
- MacOS 10.12 (Sierra)
- MacOS 10.13 (High Sierra)

## 1. Open necessary ports

In order to connect to the desired network with Lisk Core , please ensure that the corresponding ports are open:

| Network | httpPort(HTTP) | wsPort(TCP) |
| -----------|-------------|-------------|
| Mainnet | 8000         | 8001        |
| Testnet   | 7000         | 7001        |
| Betanet  | 5000         | 5001        |
| Devnet    | 4000         | 5000        |

These are the default ports for connecting with the network, they can be altered later in `config.json`. 

## 2. Create a new user

In order to install the required prerequisites, it is necessary to have a user with sudo rights on the server.
In order to run and manage a Lisk Core node in the future, please create a separate 'Lisk' user like so:

### Ubuntu

Info | Note 
--- | --- 
![info note](../../../info-icon.png "Info Note") | The `lisk` user itself **does not need** any `sudo` rights to run Lisk Core.
    
```bash
sudo adduser lisk
```

## 3. Tool chain components

Used for compiling dependencies.

### Ubuntu

```bash
sudo apt-get update
sudo apt-get install -y python build-essential curl automake autoconf libtool ntp
```

### MacOS

Ensure that both [XCode](https://developer.apple.com/xcode/) and [Homebrew](https://brew.sh/) are installed.

Update homebrew and install dependencies:

```bash
brew update
brew doctor
brew install curl automake autoconf libtool
```

## 4. Git 

[Git](https://github.com/git/git) is used for cloning and updating Lisk.

### Ubuntu

```bash
sudo apt-get install -y git
```

### MacOS

```bash
brew install git
```

## 5. Node.js

[Node.js](https://nodejs.org/) serves as the underlying engine for code execution.

Install System wide via package manager, like so:

### Ubuntu

```bash
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### MacOS

```bash
brew install node@6.14.1
```

### 5a. _(Recommended)_ Install a version manager such as nvm (<https://github.com/creationix/nvm>)

1. Login as lisk user, that has been created in the first step:
```bash
su - lisk
```
2. Install nvm following these [instructions](https://github.com/creationix/nvm#installation)
3. Install the correct version of Node.js using nvm:
```bash
nvm install 6.14.1
```

For the following steps,  logout from the 'lisk' user again with `CTRL+D`, and continue with your user with sudo rights.

### 5b. _(Recommended)_ PM2 (<https://github.com/Unitech/pm2>) 

PM2 manages the node process for Lisk

```bash
sudo npm install -g pm2
```

## 6. PostgreSQL (version 10)

### Ubuntu

Firstly, install postgreSQL on your machine:
```bash
sudo apt-get purge -y postgres* # remove all already installed postgres versions
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
sudo apt install wget ca-certificates
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update
sudo apt install postgresql-10 pgadmin4 

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

### MacOS

```bash
brew install postgresql@10
initdb /usr/local/var/postgres -E utf8 --locale=en_US.UTF-8
brew services start postgresql@10
createdb lisk_{network}
```
`{network}` is the network you want to connect your Lisk Core node to.

## 7. Installing Redis

### Ubuntu

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

### MacOS

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

Info | Note 
--- | --- 
![info note](../../../info-icon.png "Info Note") | Lisk does not run on the redis default port of `6379`. Instead it is configured to run on port: `6380`. Due to this, in order to run Lisk, you have one of two options:

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
