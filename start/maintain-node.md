# How to maintain a node

## What is a node?

The Lisk blockchain is a decentralized network that consists of many different servers (or nodes). Node operators need to set up Lisk Core on a server and connect it to the desired network.

There are over 600 nodes around the world that are maintained by individuals. These nodes communicate with the network, e.g. by broadcasting and receiving blocks or transactions from their peers. Lisk nodes are also required to forge/add new blocks to the blockchain. View live network statistics on [Lisk's Blockchain Explorer](https://explorer.lisk.io/networkMonitor).

## Who should operate a node?

If you fall under one of the following groups, we recommend you to set up your own node:

- __Exchanges__ and other services that rely on a stable API interface to the network.
- __Delegates__ who have registered a delegate and would like to actively forge.
- __Users__ who do not trust external sources and want to be in full control over their node.

## Why operate a node?

There are several reasons why you would want to set up a node:
- Have your [private](../lisk-core/configuration.md#api-access-control) entry point to communicate with the network. It's especially important if you are an exchange implementing LSK tokens.
- Full control to [configure](../lisk-core/configuration.md) the node to your specific needs
- Create your own [snapshots](../lisk-core/introduction.md#snapshots) of the blockchain
- [Forge](../lisk-core/configuration#forging) new blocks (if you are an active [delegate](../lisk-protocol/consensus.md#delegates)).

## How to set up a node?

Simply follow the node setup guide for your desired distribution, described on the [Lisk Core Introduction](../lisk-core/introduction.md#distributions) page.

There are three available distributions of Lisk Core:

### [Binary](../lisk-core/setup/binary.md)
The **default** way to setup Lisk Core.
The binary installation is an easy and automated way to set up Lisk Core, this includes nearly completely automated update scripts and a selection of tools to help seamlessly maintain a Lisk Node.

### [Docker](../lisk-core/setup/docker.md)
Docker adds support for additional platforms upon which to run a Lisk node, e.g. running a Lisk node inside of a Docker on Windows and connecting it via a custom Node on Lisk Hub to Lisk Core, without the need to rent an additional server.

### [Source](../lisk-core/setup/source.md)
This is made for anyone wishing to develop on the Lisk Core codebase. It also comes with an extensive test-suite, detailed in `README.md`. Installation from Source enables a developer to work on the newest codebase for Lisk Core, which might not have been tagged for a release, yet.
