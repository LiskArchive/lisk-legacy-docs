# Lisk Explorer Pre-Installation

The following dependencies and resources are required to install and run Lisk Explorer.

## Node.js

Node.js serves as the underlying engine for code execution. You will need version v6.12.3 or higher.

**Ubuntu/Debian:**
```shell
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**MacOS:**
```shell
brew install node@6.12.3
```

## Redis

Redis is used for caching parsed exchange data and delegate list.

**Ubuntu/Debian:**
```shell
sudo apt-get install -y redis-server
service redis start
```

**MacOS:**
```shell
brew install redis
brew services start redis
```

## Freegeoip

Freegeoip is used by the Network Monitor for IP address geo-location.

**Ubuntu/Debian:**
```shell
wget https://github.com/fiorix/freegeoip/releases/download/v3.4.1/freegeoip-3.4.1-linux-amd64.tar.gz
tar -zxf freegeoip-3.4.1-linux-amd64.tar.gz
ln -s freegeoip-3.4.1-linux-amd64 freegeoip
nohup ./freegeoip/freegeoip > ./freegeoip/freegeoip.log 2>&1 &
```

**MacOS:**
```shell
wget https://github.com/fiorix/freegeoip/releases/download/v3.4.1/freegeoip-3.4.1-darwin-amd64.tar.gz
tar -zxf freegeoip-3.4.1-darwin-amd64.tar.gz
ln -s freegeoip-3.4.1-darwin-amd64 freegeoip
nohup ./freegeoip/freegeoip > ./freegeoip/freegeoip.log 2>&1 &
```

## Grunt.js

Grunt is used to run eslint and unit tests.

```shell
sudo npm install -g grunt
```


## PM2

PM2 manages the node process for Lisk Explorer and handles log rotation (Highly Recommended).

```shell
sudo npm install -g pm2
```

## PM2-logrotate

Manages PM2 logs

```shell
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 100M
```

## Tool chain components

Used for compiling dependencies

**Ubuntu/Debian:**
```shell
sudo apt-get install -y python build-essential curl automake autoconf libtool
```

**MacOS:**
```shell
brew install curl automake autoconf libtool
```
