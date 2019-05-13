# Lisk Documentation

Welcome to the Lisk documentation!

Beside the **Lisk Protocol**, you find all you need to **setup, run and configure** the different parts of the **Lisk ecosystem**.

## The Lisk Protocol

The [Lisk Protocol](../lisk-protocol/introduction.md) is a formal set of rules of the Lisk blockchain.

It consists of rules about the P2P communication, block and transaction formats, the consensus algorithm, and of rules how signatures and IDs are computed and verified.

The protocol defines these rules without focus on concrete implementation, and it is therefore possible to implement it in any compatible programming language.

Currently, the official implementations of the Lisk protocol are [Lisk Core](../lisk-core/introduction.md) and [Lisk Elements](../lisk-sdk/lisk-elements/introduction.md), which are written in Javascript and Typescript.

## The Lisk ecosystem

The Lisk Ecosystem consists of a set of modular software products that provide developers with all the tools they need to develop their own custom blockchain applications.
It also consists of software that is needed to maintain and monitor the Lisk Main network.

Tool                                                         | Description
------------------------------------------------------------ | --------------------------------------------------
[Lisk SDK](../lisk-sdk/introduction.md) > [Lisk Framework](../lisk-sdk/lisk-framework/introduction.md) | Modular set of building blocks with specific blockchain related functionality.
[Lisk SDK](../lisk-sdk/introduction.md) > [Lisk Elements](../lisk-sdk/lisk-elements/introduction.md)   | JS library for interacting with the network.
[Lisk SDK](../lisk-sdk/introduction.md) > [Lisk Commander](../lisk-sdk/lisk-commander/introduction.md) | CLI-tool to interact with the network.
[Lisk Hub](../lisk-hub/introduction.md)                      | UI for users to interact with the network, e.g. to manage their accounts, or to send or receive tokens.
[Lisk Core](../lisk-core/introduction.md)                    | The software needed to run a node on the Lisk Mainchain.
[Lisk Service](../lisk-service/introduction.md)              | Extended API interface for Lisk nodes and the extended network.

## Getting started

### Maintain a node

You want to become a node operator?

Great!

There are several good reasons for it:

- Have your **private entry point** to [communicate](../lisk-core/api) with the network
- **Full control** to [configure](../lisk-core/configuration.md) your node to your specific needs
- Create your own **snapshots** of the blockchain
- **Forge** new blocks (if you are an active delegate)

For the followign user groups, it is recommended to set up an own node:

- Exchanges and other services that rely on a stable API interface to the network.
- Registered Delegates, who would like forge actively.
- Users who do not trust different sources and want to be in full control.

To become a node operator, you need to setup [Lisk Core](../lisk-core/introduction.md) on a server and connect it to the desired network.

### Build a blockchain application

#### What is a blockchain application?

Blockchain applications are applications that communicate with a blockchain network in the background.

This blockchain network can be used as decentralized database layer to create, read, update or delete data within the system.


#### How to build a blockchain application

The [Lisk SDK](../lisk-sdk/introduction.md) provides you with a development framework, that enables developers to create their own custom blockchain applications with ease.
The Lisk SDK consists of the following tools:

- [Lisk Framework](../lisk-sdk/lisk-framework/introduction.md)
- [Lisk Elements](../lisk-sdk/lisk-elements/introduction.md)
- [Lisk Commander](../lisk-sdk/lisk-commander/introduction.md)

The Lisk Framework consists of a selection of various modules, which each provide a specific functionality or logic related to blockchain networks.
The different modules are the building blocks for the backend your blockchain application.
These building blocks can be assembled as desired to create a custom network, that is optimized to work seamlessly with your blockchain application.

1. Setup the Framework<br>
To get started in building your own blockchain application, set up the [Lisk Framework](../lisk-sdk/lisk-framework/introduction.md).
The modules come with a set of predefined default configuration, that let you start and test out your own network immediately.

2. Configure the modules<br>
After the first successful start, feel free to configure, exchange or extend the modules, suited to your specific needs.

3. Write own modules<br>
It is also possible to create own custom modules from scratch, if needed.
For convenience, you may reuse the packages of [Lisk Elements](../lisk-sdk/lisk-elements/introduction.md) which provide related functionalities for creating blockchain applications, like cryptography.
Beside this, the **Lisk Framework** offers [Components](../lisk-sdk/lisk-framework/introduction.md).
Components consist of functionalities that are useful for most modules, and provide an easy to use interface to perform actions on the application as a whole.
<br>The [Lisk Framework](../lisk-sdk/lisk-framework/introduction.md) initializes the modules and controls their communication between each other and with the application as a whole.
To do this, each module creates its' own communication channel, where it can publish events that it wants to share with the whole application.
Modules can passively listen to certain events that have been published by other modules, or they can actively ask for information from other modules.

4. Interact with your network<br>
While your network is up and running, use [Lisk Commander](../lisk-sdk/lisk-commander/introduction.md) to interact with the network via the CLI (Command-Line-Interface).

5. Build the frontend<br>
When you have the network up and running as desired, it is time to build a nice frontend for your application, so that users are satisfied using it.

### Interact with the network

### Contribute to the codebase


