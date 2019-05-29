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

The blockchain application is built in 3 steps:

### 1. Set up the SDK
To get started in building a blockchain application, [set up the Lisk SDK](../lisk-sdk/introduction.md#setup).

The [Modules](../lisk-sdk/lisk-framework/introduction.md#modules) and [Components](../lisk-sdk/lisk-framework/introduction.md#components) of the [Lisk Framework](../lisk-sdk/lisk-framework/introduction.md) come with a set of predefined default configurations, that allow you to start and test out your network immediately.

To get the blockchain application started for the first time, follow the steps described in the [Lisk SDK - Usage](../lisk-sdk/introduction.md#usage) section.

### 2. Configure and customize the application

#### 2.a Configure Modules and Components
After the first successful start, feel free to [configure](../lisk-sdk/lisk-framework/configuration.md) the [Modules](../lisk-sdk/lisk-framework/introduction.md#modules) and [Components](../lisk-sdk/lisk-framework/introduction.md#components), suited to your specific needs.

It is possible as well to exchange Modules with other ones, or to add new Modules that provide new functionality.

To see which ready-to-use Modules and Components already exist, check out the [list of Modules](../lisk-sdk/lisk-framework/introduction.md#list-of-core-modules) and the [list of Components](../lisk-sdk/lisk-framework/introduction.md#components).

For a full list of all config options and their default values, see the [List of configuration options](configuration.md#list-of-configuration-options) or the file [config_devnet.json](https://github.com/LiskHQ/lisk-sdk/blob/development/sdk/src/samples/config_devnet.json) on Github.

#### 2.b Register custom transaction types
Transactions are the main way for users to add data to the blockchain.

Depending on the use-case for your network, you need to pick the fitting transaction types for your application.<br>
For comparison, see the [list of all transaction types](../lisk-protocol/transactions), which are described in the Lisk Protocol.
These default transaction types are already implemented in Lisk Elements as part of the [@liskhq/lisk-transactions](../lisk-sdk/lisk-elements/packages/transactions.md) package.

To create custom transaction types, utilize the provided `BaseTransaction` interface as described in the section for [custom transactions](custom-transactions.md).

See the [Examples applications](examples.md) for creating custom transaction types and how to add them to the application:

- [Hello World App](examples.md#hello-world-app): Most simple example of a blockchain application with 1 custom transaction type.
- [Cashback App](examples.md#hello-world-app): Simple example blockchain app, that is implementing the new transaction type `Cashback`.

### 3. Interact with the network
While your network is up and running, use [Lisk Commander](../lisk-sdk/lisk-commander/introduction.md) to interact with the network via the CLI (Command-Line-Interface).
To monitor and explore the network, you may want to set up a monitoring solution like e.g. [Lisk Explorer](https://github.com/LiskHQ/lisk-explorer).
Depending on the level of customization, it might be needed to customize the Lisk Explorer and Lisk Commander as well, or otherwise certain services might fail.

Another simple way to make first interactions with the network is by connecting to it with [Lisk Hub](https://github.com/LiskHQ/lisk-hub).
Lisk Hub provides a simple and beautiful User Interface to create and manage accounts in the network and to interact with it by sending different types of transactions.

When everything works as expected, it is time to build a nice frontend for your application, so that users are happy to use it.
To let your frontend interact with the network, we recommend to make use of [Lisk Elements' packages](../lisk-sdk/lisk-elements/packages.md) like [lisk-api-client](../lisk-sdk/lisk-elements/packages/api-client.md).

See more options in the getting started section [Interact with the network](interact-with-network.md).
