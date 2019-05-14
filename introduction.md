# Lisk Core Documentation

### Table of contents

- [Lisk Core Overview](#lisk-core-documentation)
  - [Versions](#versions)
  - [Versioning Schemes](#versioning-schemes)
  - [Upgrade vs Migration](#upgrade-vs-migration)
  - [Networks](#networks)
  - [Distributions](#distributions)
  - [Snapshots](#snapshots)
  - [Technology stack](#technology-stack)
  - [Contribute to Codebase](#contribute-to-the-codebase)
- Setup
  - [Binary](setup/binary.md)
  - [Docker](setup/docker.md)
  - [Source](setup/source.md)
- Upgrade
  - [Binary](upgrade/binary.md)
  - [Docker](upgrade/docker.md)
  - [Source](upgrade/source.md)  
- [Migration](migration.md)
- Administration
  - [Binary](administration/binary.md)
  - [Docker](administration/docker.md)
  - [Source](administration/source.md)
- [Configuration](configuration.md)
- [API](api.json)
- [Troubleshooting](troubleshooting.md)

[![What is Lisk Core?](https://img.youtube.com/vi/RfF9EPwQDOY/0.jpg)](https://www.youtube.com/watch?v=RfF9EPwQDOY)

Lisk Core is the program that implements the [Lisk Protocol](/lisk-protocol/introduction.md).
Every machine must set it up to run a node that allows for participation in the network.
Setting up Lisk Core enables a user to:

- Connect to a [Network](#networks) and communicate with other nodes in the network.
- Full control to [configure](configuration.md) Lisk Core to specific needs, as required.
- Create your own [snapshots](#snapshots) of the blockchain.
- Use Lisk Core to perform actions on the Lisk blockchain, e.g. with [Lisk Hub](https://github.com/LiskHQ/lisk-docs/blob/master/lisk-hub/introduction.md#network-switcher).
- [Forge](configuration.md#forging) new blocks (if you are an active delegate).

By setting up your node, you contribute to the decentralization of the Lisk network.

An instance of Lisk Core is generally detailed in two different ways: 

> A Lisk Core instance connected to a network is referred to as a Lisk **Node**. 
> A Lisk Node connected to other Lisk Nodes is referred to as a Lisk **Peer**.

Both meanings refer to a machine which, after installing and executing Lisk Core, become a server. The server participates in the network and provides blockchain data to its clients.


## Versions

We release new versions of Lisk Core regularly. Documentation on [lisk.io](https://lisk.io/documentation) will keep up to date with version updates. The Lisk Core version reference below provides an overview of the former releases and documentation versions of Lisk Core.

Software Version | Protocol Version | Release date <br> (yy/mm/dd)| Documentation reference
---     | ---       | ---         | ---
[v1.6.0](https://github.com/LiskHQ/lisk-sdk/releases/tag/v1.6.0) | 1.0 | 19/04/24 | *Current version, live on lisk.io/documentation*
[v1.5.1](https://github.com/LiskHQ/lisk-sdk/releases/tag/v1.5.1) | 1.0 | 19/04/10 | [Lisk Core 1.5 docs](https://github.com/LiskHQ/lisk-docs/blob/core-1.4.0/introduction.md)
[v1.4.1](https://github.com/LiskHQ/lisk-sdk/releases/tag/v1.4.1) | 1.0 | 19/02/14 | [Lisk Core 1.4 docs](https://github.com/LiskHQ/lisk-docs/blob/core-1.4.0/introduction.md)
[v1.3.1](https://github.com/LiskHQ/lisk-sdk/releases/tag/v1.3.1) | 1.0 | 18/12/05 | [Lisk Core 1.3 docs](https://github.com/LiskHQ/lisk-docs/blob/core-1.3.0/introduction.md)
[v1.2.1](https://github.com/LiskHQ/lisk-sdk/releases/tag/v1.2.1) | 1.0 | 18/11/10 | [Lisk Core 1.2 docs](https://github.com/LiskHQ/lisk-docs/blob/core-1.2.0/introduction.md)
[v1.1.1](https://github.com/LiskHQ/lisk-sdk/releases/tag/v1.1.1) | 1.0 | 18/10/23 | [Lisk Core 1.1 docs](https://github.com/LiskHQ/lisk-docs/blob/core-1.1.0/introduction.md)
[v1.0.3](https://github.com/LiskHQ/lisk-sdk/releases/tag/v1.0.3) | 1.0 | 18/08/17 | [Lisk Core 1.0 docs](https://github.com/LiskHQ/lisk-docs/blob/core-1.0.0/introduction.md)

## Versioning schemes

Lisk Core is described in 2 different versioning schemes. The **Software Implementation Version** and the **Protocol Version**.

### Software implementation versioning

Any Lisk Core software changes, except for the logging system, are communicated following the exact rules specified by [SemVer](https://semver.org/).

Software implementation versioning has a version prefix `v` followed by a 3 digit notation `<MAJOR>.<MINOR>.<PATCH>` , where the individual digits represent the following types of software changes:

```
v<MAJOR>.<MINOR>.<PATCH> 

v     - Version prefix
MAJOR - Breaking change
MINOR - New feature
PATCH - Bug fix
```

The *software implementation version* follows the popular SemVer scheme and gives a quick overview for developers about breaking and non-breaking changes in the software.

### Protocol versioning

The *protocol version* is denoted by two digits, `H.S.`.
The first digit, `H`, depends on the number of hard forks and is incremented with every hard fork.
`S` represents the number of soft forks since the last hard fork.

> The initial protocol version 1.0 is defined to be the one that was implemented by Lisk Core v1.0.0.

The *protocol version* is used e.g. in P2P Communication between Lisk Core nodes, to determine, if the nodes have compatible versions of the Lisk protocol implemented.

## Upgrade vs Migration

When to upgrade, when to migrate Lisk Core?

Every time that a new software update of Lisk Core introduces a **hard fork** on the network, you need to [migrate](migration.md) your existing Lisk Core version.

In all other cases, you can use the normal **upgrade** process, according to the distribution you are using:
- [Upgrade Lisk Core Binary](upgrade/binary.md)
- [Upgrade Lisk Core Docker](upgrade/docker.md)
- [Upgrade Lisk Core Source](upgrade/source.md)

## Networks

Lisk Core can be connected to different networks.
There are two key public networks, entirely independent of each other, that are always accessible: **Mainnet** and **Testnet**. 

### Mainnet
Mainnet is where the true Lisk economy exists. On this network, Lisk users can transfer LSK tokens from one account to another, register accounts as delegates, vote for other delegates or register dApps. It can be explored via the [Lisk Explorer](https://explorer.lisk.io).

### Testnet
Testnet is an independent replica of the Lisk Mainnet intended as an area to rehearse upgrades before they take place on the Lisk Mainnet. This is where new versions and fixes of Lisk Core are tested. It can be explored via [Lisk Testnet Explorer](https://testnet-explorer.lisk.io).

## Distributions

The 3 supported distributions for Lisk Core are presented below:

### [Binary](setup/binary.md)
The **default** way to setup Lisk Core.
The binary installation is an easy and automated way to set up Lisk Core, this includes nearly completely automated update scripts and a selection of tools to help seamlessly maintain a Lisk Node.

### [Docker](setup/docker.md)
Docker adds support for additional platforms upon which to run a Lisk node, e.g. running a Lisk node inside of a Docker on Windows and connecting it via a custom Node on Lisk Hub to Lisk Core, without the need to rent an additional server.

### [Source](setup/source.md)
This is made for anyone wishing to develop on the Lisk Core codebase. It also comes with an extensive test-suite, detailed in `README.md`. Installation from Source enables a developer to work on the newest codebase for Lisk Core, which might not have been tagged for a release, yet.

## Snapshots

A snapshot is a backup of the complete blockchain. It can be used to speed up the sync process, instead of having to validate all transactions starting from genesis block to current block height.
Lisk provides official snapshots of the blockchain, see [http://snapshots.lisk.io](http://snapshots.lisk.io).

How to rebuild from a snapshot, and how to create your own snapshots is explained in the Administration section for each [distribution](#lisk-core-distributions) of Lisk Core.

> We recommend using [Lisk Core Binary](administration/binary.md#create-snapshot) for creating own snapshots, as it provides a script to create snapshots most convenience.

## Technology stack

The Lisk Core consists of 4 main technologies:

[![Node.js](assets/nodejs.png "Node.js")](https://nodejs.org)

[Node.js](https://nodejs.org/) serves as the underlying engine for code execution in Lisk Core. Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code server-side. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

[![Swagger](assets/swagger-logo.png "Swagger")](https://swagger.io)

[Swagger](https://swagger.io) is an open source software framework backed by a large ecosystem of tools that helps developers design, build, document, and consume RESTful Web services. As part of the Lisk Core documentation, the whole API specification can be explored interactively via the Swagger-UI interface.

[![PostgreSQL](assets/postgresql.png "PostgreSQL")](https://www.postgresql.org)

[PostgreSQL](https://www.postgresql.org) is a powerful, open source object-relational database system with over 30 years of active development which has earned it a strong reputation for reliability, feature robustness, and performance. All Information on the Lisk mainchain is stored inside of PostgreSQL databases.

[![Redis](assets/redis.png "Swagger")](https://redis.io)

[Redis](https://redis.io) is an open source, in-memory data structure store. Lisk Core mainly uses it to cache API responses. This prevents performance drops in the application, for example when the same API request is sent repeatedly.

## Contribute to the Codebase

Everyone is invited to contribute to the Lisk Core project. We welcome and appreciate all contributions. 

### Github
All necessary information can be found on our [Lisk SDK Github](https://github.com/LiskHQ/lisk-sdk).

### Contribution Guidelines
Please be sure to read and follow our [Contribution Guidelines](https://github.com/LiskHQ/lisk-sdk/blob/development/docs/CONTRIBUTING.md).

### Gitter
If you have any further questions please join our [Gitter](https://gitter.im/LiskHQ/lisk).
