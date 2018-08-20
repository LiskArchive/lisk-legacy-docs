Author: mona

----

Created: 2018-05-15

----

Updated: 2018-06-24

----

Metadescription: Prepare your system to run Lisk Core as a Docker based container. To run Lisk in Docker you must install the Docker Engine.

----

Metakeywords: Lisk Core Docker Pre-install

----

Title: Docker

----

Opengraphtitle: Lisk Core Docker Pre-install

----

Opengraphimage: 

----

Opengraphdescription: 

----

Content: 

# Lisk Core Docker Pre-install

This document will detail how to prepare a system to run Lisk Core as a Docker based container. In order to run Lisk in Docker a user must first install the Docker Engine. Additionally it is recommended to install Docker Compose for convenience.

Determine if your platform can run Docker.

<boxsuccess markdown="1">

###### Supported Platforms
Please refer to https://docs.docker.com/engine/installation/#desktop
</boxsuccess>

## Mac OS X

Please refer to https://docs.docker.com/docker-for-mac/install/. 
Please note that Docker for Mac already includes Docker Compose. 
Install `make` using [XCode](https://developer.apple.com/xcode/features/) 

## Windows

Please refer to https://docs.docker.com/docker-for-windows/install/
Please note that Docker for Windows includes Docker Compose.

## Linux

Please refer to https://docs.docker.com/engine/installation/#server
To install Docker Compose, please refer to: https://docs.docker.com/compose/install/
Install `make` using your package manager. For example, use `apt-get` if running Ubuntu:
```
sudo apt-get install make
```

## Open necessary ports

In order to connect to the desired network with Lisk Core , please ensure that the corresponding ports are open:

| Network | httpPort(HTTP) | wsPort(TCP) |
| --------|----------------|-------------|
| Mainnet | 8000         | 8001        |
| Testnet | 7000           | 7001        |
| Betanet  | 5000           | 5001        |
| Devnet | 4000          | 5000        |

These are the default ports for connecting with the network, these can be altered later in `config.json`.

----

Htmltitle: Lisk Core - Docker Pre-install | Lisk Documentation

----

Iframe: 