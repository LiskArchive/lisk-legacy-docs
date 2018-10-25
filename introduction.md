# Lisk Core Documentation

## Table of contents
[Setup](setup/setup.md) | [Upgrade](upgrade/upgrade.md) | [User Guide](user-guide/user-guide.md) | 
--- | --- | ---
[Pre-Installation](setup/pre-install/preinstallation.md) | [Binary](upgrade/binary/upgrade-binary.md) | [Administration](user-guide/administration/admin.md)
[Installation](setup/install/installation.md) | [Docker](upgrade/docker/upgrade-docker.md) | [Configuration](user-guide/configuration/configuration.md)
[Troubleshooting](troubleshooting/troubleshooting.md) | [Source](upgrade/source/upgrade-source.md) |  [API](user-guide/api/api.json)
| | [Migration](upgrade/migration/migration.md)| |

Lisk Core is the program that implements the [Lisk Protocol](/lisk-protocol/introduction.md). Every machine must set it up in order to run a node that allows for participation in the network. Setting up Lisk Core enables a user to:
- Contribute to the decentralisation of the Lisk network
- Explore data recorded on the Lisk blockchain
- Post transactions to the Lisk blockchain
- Enable/Disable forging for a registered delegate
- Configure Lisk Core to specific needs, as required

An instance of Lisk Core is generally detailed in two different ways: 

Info | Note 
--- | --- 
![info note](info-icon.png "Info Note") | A Lisk Core instance connected to a network is referred to as a Lisk **Node**. 

Info | Note 
--- | --- 
![info note](info-icon.png "Info Note") | A Lisk Node connected to other Lisk Nodes is referred to as a Lisk **Peer**.

Both meanings refer to a machine which, after installing and executing Lisk Core, become a server. The server participates in the network and provides blockchain data to its clients.

## Networks

Lisk Core can be connected to different networks. There are two key public networks, entirely independent of each other, that are always accessible: **Mainnet** and **Testnet**. 

### Mainnet
Mainnet is where the true Lisk economy exists. On this network, Lisk users are able to transfer LSK tokens from one account to another, register accounts as delegates, vote for another delegates or register dApps. It can be explored via the [Lisk Explorer](https://explorer.lisk.io).

### Testnet
Testnet is an independent replica of the Lisk Mainnet intended as an area to rehearse upgrades before they take place on the Lisk Mainet. This is where new versions and fixes of Lisk Core are tested. It can be explored via [Lisk Testnet Explorer](https://testnet-explorer.lisk.io).

Each connects to a network specified in the config file [`config.json`](https://github.com/LiskHQ/lisk/blob/development/config.json#L2). 
When a user decides which network they wish to connect to, they must follow the correspondent tutorial in the [Setup](setup/setup.md) section.

## Components
The Lisk Core consists of 4 main components:

[![Node.js](nodejs.png "Node.js")](https://nodejs.org)

[Node.js](https://nodejs.org/) serves as the underlying engine for code execution in Lisk Core. Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code server-side. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

[![Swagger](swagger-logo.png "Swagger")](https://swagger.io)

[Swagger](https://swagger.io) is an open source software framework backed by a large ecosystem of tools that helps developers design, build, document, and consume RESTful Web services. As part of the Lisk Core documentation, the whole API specification can be explored interactively via the Swagger-UI interface.

[![PostgreSQL](postgresql.png "PostgreSQL")](https://www.postgresql.org)

[PostgreSQL](https://www.postgresql.org) is a powerful, open source object-relational database system with over 30 years of active development which has earned it a strong reputation for reliability, feature robustness, and performance. All Information on the Lisk mainchain is stored inside of PostgreSQL databases.

[![Redis](redis.png "Swagger")](https://redis.io)

[Redis](https://redis.io) is an open source, in-memory data structure store. Lisk Core mainly uses it to cache API responses. This prevents performance drops in the application, for example when the same API request is sent repeatedly.

## Contribute to the Codebase

Everyone is invited to contribute to the Lisk Core project. We welcome and appreciate all contributions. 

### Github
All necessary information can be found on our [Lisk Core Github](https://github.com/LiskHQ/lisk).

### Contribution Guidelines
Please be sure to read and follow our [Contribution Guidelines](https://github.com/LiskHQ/lisk/blob/development/docs/CONTRIBUTING.md).

### Gitter
If you have any further questions please join our [Gitter](https://gitter.im/LiskHQ/lisk).

