# Lisk Documentation

Welcome to the Lisk documentation!

Here you will find all you need to **setup, run and configure**  a Lisk Node and join the network. 
We also describe the **Lisk Protocol**  and **Lisk products**.

## The Lisk Protocol

The [Lisk Protocol](../lisk-protocol/introduction.md) is a formal set of rules of the Lisk blockchain.

It consists of rules about the P2P communication, block and transaction formats, the consensus algorithm, and of rules how signatures and IDs are computed and verified.

The protocol defines these rules without focus on concrete implementation, and it is therefore possible to implement it in any compatible programming language.

Currently, the official implementations of the Lisk protocol are [Lisk Core](../lisk-core/introduction.md) and [Lisk Elements](../lisk-sdk/lisk-elements/introduction.md), which are written in Javascript and Typescript.

## Lisk products


Tool                                                         | Description
------------------------------------------------------------ | --------------------------------------------------
[Lisk SDK](../lisk-sdk/introduction.md) |  Set of modular software products that provide developers with all the tools they need to develop their own custom blockchain applications.
[Lisk SDK](../lisk-sdk/introduction.md) > [Lisk Framework](../lisk-sdk/lisk-framework/introduction.md) | Modular set of building blocks with specific, blockchain-related, functionality.
[Lisk SDK](../lisk-sdk/introduction.md) > [Lisk Elements](../lisk-sdk/lisk-elements/introduction.md)   | Set of libraries implementing Lisk protocol, contains all of the cryptography tools you may need to implement Lisk network interactions into your application.
[Lisk SDK](../lisk-sdk/introduction.md) > [Lisk Commander](../lisk-sdk/lisk-commander/introduction.md) | Command line tool to interact with the network and maintain a node.
[Lisk Hub](../lisk-hub/introduction.md)                      | Lisk wallet and UI tool for users to interact with the network, e.g. to manage their accounts, send or receive tokens or vote for delegates.
[Lisk Core](../lisk-core/introduction.md)                    | The software needed to run a node on the Lisk Mainchain.
[Lisk Service](../lisk-service/introduction.md)              | Extended API interface for Lisk nodes and the extended network.

## Getting started

### Maintain a node

You want to become a node operator?

Great!

There are several good reasons for it:

- Have your **private entry point** to [communicate](../lisk-core/api) with the network, it's important if you are an **exchange** implementing LSK tokens.
- **Full control** to [configure](../lisk-core/configuration.md) your node to your specific needs
- Create your own **snapshots** of the blockchain
- **Forge** new blocks (if you are an active delegate)

For the following user groups, it is recommended to set up an own node:

- Exchanges and other services that rely on a stable API interface to the network.
- Registered Delegates, who would like forge actively.
- Users who do not trust different sources and want to be in full control.

To become a node operator, you need to setup [Lisk Core](../lisk-core/introduction.md) on a server and connect it to the desired network.

### Build a blockchain application

#### What is a blockchain application?

Blockchain applications communicate within a network to agree upon which data is valid and should be stored and which should be rejected and bad actors potentially punished. The set of blockchain rules is already implemented by Lisk modules and libraries. By re-using them and implementing well-designed Lisk SDK Framework it's easy to compose new case-specific applications. Explore more great content of [Blockchain Business](https://lisk.io/academy/blockchain-business) in [Lisk Academy](https://lisk.io/academy).



#### And why do I need it?

As described in [What is a blockchain application?](#what-is-a-blockchain-application), blockchain application don't really offer new features, that centralized applications don't already have.

What distincts them is the level of trust, the user needs to have in the maintainers of the particular application.

Depending on the use case and service that the application is offering, users could have an interest in trustless interaction with an application.
If you plan to develop an application, that is putting a lot of power into the maintainers hands, it could be a trustbuilding decision to develop these crucial parts as part of a blockchain application. 

#### How to build a blockchain application

The [Lisk SDK](../lisk-sdk/introduction.md) provides you with a development framework, that enables developers to create their own custom blockchain applications with ease.
The Lisk SDK consists of the following tools:

- [Lisk Framework](../lisk-sdk/lisk-framework/introduction.md)
- [Lisk Elements](../lisk-sdk/lisk-elements/introduction.md)
- [Lisk Commander](../lisk-sdk/lisk-commander/introduction.md)

The Lisk Framework consists of a selection of various Modules, which each provide a specific functionality or logic related to blockchain networks.
The different Modules are the building blocks for the backend your blockchain application.
These building blocks can be assembled as desired to create a custom network, that is optimized to work seamlessly with your blockchain application.

1. Setup the Framework<br>
To get started in building your own blockchain application, set up the [Lisk Framework](../lisk-sdk/lisk-framework/introduction.md).
The Modules come with a set of predefined default configuration, that let you start and test out your own network immediately.

2. Configure the Modules<br>
After the first successful start, feel free to configure, exchange or extend the Modules, suited to your specific needs.

3. Write own Modules<br>
It is also possible to create own custom Modules from scratch, if needed.
For convenience, you may reuse the packages of [Lisk Elements](../lisk-sdk/lisk-elements/introduction.md) which provide related functionalities for creating blockchain applications, like cryptography.
Beside this, the **Lisk Framework** offers [Components](../lisk-sdk/lisk-framework/introduction.md).
Components consist of functionalities that are useful for most Modules, and provide an easy to use interface to perform actions on the application as a whole.
<br>The [Lisk Framework](../lisk-sdk/lisk-framework/introduction.md) initializes the Modules and controls their communication between each other and with the application as a whole.
To do this, each Module creates its' own communication channel, where it can publish events that it wants to share with the whole application.
Modules can passively listen to certain events that have been published by other Modules, or they can actively ask for information from other Modules.

4. Interact with your network<br>
While your network is up and running, use [Lisk Commander](../lisk-sdk/lisk-commander/introduction.md) to interact with the network via the CLI (Command-Line-Interface).

5. Build the frontend<br>
When you have the network up and running as desired, it is time to build a nice frontend for your application, so that users are happy to use it.

### Interact with the network

### Contribute to the codebase


