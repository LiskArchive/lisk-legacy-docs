# Build a blockchain application

## What is a blockchain application?

Blockchain applications communicate within a network to agree upon which data is valid and should be stored, or whether it should be rejected and bad actors potentially punished.
The set of blockchain rules is already implemented by Lisk modules and libraries.
By re-using them and implementing the well-designed [Lisk SDK Framework](../lisk-sdk/introduction.md), it's easy to compose new case-specific applications.
Explore more great content of Blockchain Business in [Lisk Academy](https://lisk.io/academy/blockchain-business/blockchain-in-business).

## How to build a blockchain application with the Lisk SDK

The [Lisk SDK](../lisk-sdk/introduction.md) provides you with a development framework that enables developers to create their own custom blockchain applications with ease.

The Lisk SDK consists of the following tools:

- [Lisk Framework](../lisk-sdk/lisk-framework/introduction.md): Consists of a selection of various Modules and Components which each provide specific functionality or logic related to blockchain networks.
- [Lisk Elements](../lisk-sdk/lisk-elements/introduction.md): Collection of NPM packages that provide blockchain- and lisk-specific functionalities.
- [Lisk Commander](../lisk-sdk/lisk-commander/introduction.md): Command line tool to interact with the network and maintain a node.

### 1. Setup the SDK
To get started in building a blockchain application, [set up the Lisk SDK](../lisk-sdk/introduction.md#setup).

The [Modules](../lisk-sdk/lisk-framework/introduction.md#modules) of the [Lisk Framework](../lisk-sdk/lisk-framework/introduction.md) come with a set of predefined default configurations, that allow you to start and test out your network immediately.

To get the blockchain application started for the first time, follow the steps described in the [Lisk SDK - Usage](../lisk-sdk/introduction.md#usage) section.

### 2. Configure and customize the application

#### 2.a Configure Modules and Components
After the first successful start, feel free to [configure](../lisk-sdk/lisk-framework/introduction.md#configuration) the [Modules](../lisk-sdk/lisk-framework/introduction.md#modules) and [Components](../lisk-sdk/lisk-framework/introduction.md#components), suited to your specific needs.
It is possible as well to exchange Modules with other ones, or to add new Modules that provide new functionality.

To see which ready-to-use Modules and Components already exist, check out the [list of Modules](../lisk-sdk/lisk-framework/introduction.md#list-of-core-modules) and [list of Components](../lisk-sdk/lisk-framework/introduction.md#components).

#### 2.b Write own Modules
If a Module with a desired functionality doesn't exist yet, create own [custom Modules](../lisk-sdk/lisk-framework/introduction.md#custom-modules) from scratch if needed.

Lisk Framework provides a [BaseModule](https://github.com/LiskHQ/lisk-sdk/blob/development/framework/src/modules/base_module.js) class for this purpose, which every new module needs to inherit from.
The `BaseModule` class defines all required methods, the Lisk Framework expects for successful communication to the application or to other Modules.

> For convenience, you may want to reuse the packages of [Lisk Elements](../lisk-sdk/lisk-elements/introduction.md) inside of your custom Module, which provide related functionalities for creating blockchain applications, like [@liskhq/lisk-cryptography](../liks-elements/packages/cryptography.md).

Lisk Framework initializes the Modules and controls their communication between each other and with the application as a whole.
To do this, each Module creates its' own communication channel, where it can publish events that it wants to share with the whole application.
Modules can passively listen to certain events that have been published by other Modules, or they can actively ask for information from other Modules.

### 4. Build the frontend
While your network is up and running, use [Lisk Commander](../lisk-sdk/lisk-commander/introduction.md) to interact with the network via the CLI (Command-Line-Interface).
To monitor and explore the network, you may want to set up a monitoring solution like e.g. [Lisk Explorer](https://github.com/LiskHQ/lisk-explorer).
Depending on the level of customization, it might be needed to customize the Lisk Explorer as well, or otherwise certain services might fail.

Another simple way to make first interactions with the network is by connecting to it with [Lisk Hub](https://github.com/LiskHQ/lisk-hub).
Lisk Hub provides a simple and beautiful User Interface to create and manage accounts in the network and to interact with it by sending different types of transactions.

When everything works as expected, it is time to build a nice frontend for your application, so that users are happy to use it.
To let your frontend interact with the network, we recommend to make use of [Lisk Elements' packages](../lisk-sdk/lisk-elements/packages.md) like `lisk-api-client`.

See more options in the getting started section [Interact with the network](interact-with-network.md).
