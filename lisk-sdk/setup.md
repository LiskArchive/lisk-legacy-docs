# SDK Setup

### Supported Platforms

- Ubuntu 16.04 (LTS) x86_64
- Ubuntu 18.04 (LTS) x86_64
- MacOS 10.13 (High Sierra)
- MacOS 10.14 (Mojave)

### Dependencies

The following dependencies need to be installed in order to run applications created with the Lisk SDK:

| Dependencies     | Version |
| ---------------- | ------- |
| Node.js          | 10.15.3 |
| PostgreSQL       | 10+     |
| Redis (optional) | 5+      |
| Python           | 2       |

## Pre-Installation

### Create a new user

> To install the required prerequisites, it is necessary to have a user with sudo rights on the server.
> The `lisk` user itself **does not need** any `sudo` rights to run the node.

To run and manage a node in the future, please create a separate `lisk` user.
E.g. execute:

##### Ubuntu

```bash
sudo adduser lisk
```

##### MacOS

It is not essentially needed to set up a `lisk` user, especially when you are runnign a local instance for development pruposes.
If you still want to do it, we recommend to create the user using the macOS GUI: https://support.apple.com/en-gb/guide/mac-help/mtusr001/mac

### Toolchain components

Used for compiling dependencies.

##### Ubuntu

```bash
sudo apt install -y python-minimal build-essential
```

##### MacOS

Ensure that both [XCode](https://developer.apple.com/xcode/) and [Homebrew](https://brew.sh/) are installed.

### PostgreSQL

To install Postgres follow the intructions descibed below, depending on the operating system your machine is running on. 

Two different ways of installing Docker on your system are described below.
If you run into issues when trying to set up PostgreSQL on your machine, try to install it inside of a docker container.

> We recommend using Postgres with Docker for a quick and straight forward setup of Postgres.
 
#### Option A. Postgres with Docker

Running Postgres inside a Docker container will setup the correct version of Postgres and containerize it away from any existing versions you may have locally on your machine.
Choose this setup if you are not familiar with Postgres, or if you run in to issues with a previously installed version of Postgres.

##### Install Docker
To perform the command below successfully, install Docker first:

__Supported Platforms:__
Please refer to https://docs.docker.com/engine/installation/#desktop

##### Mac OS X

Please refer to https://docs.docker.com/docker-for-mac/install/. 
Please note that Docker for Mac already includes Docker Compose. 
Install `make` using [XCode](https://developer.apple.com/xcode/features/) 

##### Windows

Please refer to https://docs.docker.com/docker-for-windows/install/
Please note that Docker for Windows includes Docker Compose.

##### Linux

Please refer to https://docs.docker.com/engine/installation/#server

##### Start the Docker container

> If you have other versions of PostgreSQL installed on your machine, make sure to stop them before starting the docker container.

```bash
docker run --name lisk_sdk_db -p 5432:5432 -e POSTGRES_USER=lisk -e POSTGRES_PASSWORD=password -e POSTGRES_DB=lisk_dev -d postgres:10
```

This will install PostgreSQL version 10 (`postgres:10`) in a container with name `lisk_sdk_db` and binds the port `5432` of the container with the same port of the machine.
As environment variables we expose `POSTGRES_USER=lisk` to create the lisk user and `POSTGRES_PASSWORD=password` to set the password for the lisk user.
Finally the environment variable `POSTGRES_DB` creates the database `lisk_dev` with the `lisk` user as owner.

The above should be enough to set up the database ready to use with Lisk Core.
To manage the Docker container, use the following commands:

```bash
docker stop lisk_sdk_db # stop the container
docker start lisk_sdk_db # start the container
docker restart lisk_sdk_db # restart the container
docker rm lisk_sdk_db # remove the container
```

In case you want to access Postgres with `psql` inside the container, run:
```bash
docker exec --tty --interactive lisk_sdk_db psql -h localhost -U lisk -d postgres
```

#### Option B. Postgres system-wide

An alternative way to install Postgres on the system without Docker.

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
sudo -u postgres -i createdb lisk_dev --owner lisk
sudo -u postgres psql -d lisk_dev -c "alter user lisk with password 'password';"
```

> Change `'password'` to a secure password of your choice.
> Don't forget to update this password in the [Lisk SDK configuration](configuration.md) later on.

##### MacOS

Install Postgres version 10:
```bash
brew install postgresql@10
```

Add it to the systems path:
```bash
echo 'export PATH="/usr/local/opt/postgresql@10/bin:$PATH"' >> ~/.bash_profile
export LDFLAGS="-L/usr/local/opt/postgresql@10/lib"
export CPPFLAGS="-I/usr/local/opt/postgresql@10/include"
```

Start Postgres, create the `lisk` user and the database:
```bash
initdb /usr/local/var/postgres -E utf8 --locale=en_US.UTF-8
brew services start postgresql@10
createuser --createdb lisk
createdb lisk_dev --owner lisk
psql -d lisk_dev -c "alter user lisk with password 'password';"
```

> Change `'password'` to a secure password of your choice.
> Don't forget to update this password in the [Lisk SDK configuration](configuration.md) later on.

### Node.js

[Node.js](https://nodejs.org/) serves as the underlying engine for code execution.
There are several different ways and version managers to install Node.JS on your system.
We recommend one of the following two:

#### Option A: Node Version Manager

We recommend using a Node version manager such as [NVM](https://github.com/creationix/nvm).
NVM is a bash script that enables you to manage multiple active Node.js versions.

1. Install nvm following these [instructions](https://github.com/creationix/nvm#install--update-script)
3. Install the correct version of Node.js using NVM:
```bash
nvm install 10.15.3
```

#### Option B: Node.js package

If you do not want to use NVM or other package managers, you can install the Node package globally on your system alternatively:

##### Ubuntu

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
```

##### MacOS

```bash
brew install node@10.15.3
```

### PM2 (optional)

Install [PM2](https://github.com/Unitech/pm2) for managing start/stop of the app process in the background:

```bash
npm install pm2 -g
```

## Installation

To install the NPM package [lisk-sdk](https://www.npmjs.com/package/lisk-sdk), run:

```bash
npm install --save lisk-sdk # add --save flag to save it to package.json
```
