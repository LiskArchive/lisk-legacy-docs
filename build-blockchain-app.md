# Build a blockchain application

## What is a blockchain application?

Blockchain applications communicate within a network to agree upon which data is valid and therefore should be stored, or whether it should be rejected and bad actors potentially punished.

The set of blockchain rules is already implemented by Lisk modules and libraries. By reusing them and implementing the well-designed [Lisk SDK Framework](../lisk-sdk/introduction.md), it's easy to compose new case-specific applications.

For more information on blockchain use cases, visit Blockchain Business in the [Lisk Academy](https://lisk.io/academy/blockchain-business/blockchain-in-business).

## What is the Lisk SDK?

The [Lisk SDK](../lisk-sdk/introduction.md) provides a development framework that enables developers to create their own custom blockchain applications with ease.

### The Lisk SDK consists of the following packages:

- [Lisk Framework](../lisk-sdk/lisk-framework/introduction.md): Consists of a selection of various Modules and Components which each provide specific functionality or logic for use in blockchain networks.
- [Lisk Elements](../lisk-sdk/lisk-elements/introduction.md): Collection of NPM packages that provide blockchain- and lisk-specific functionalities.
- [Lisk Commander](../lisk-sdk/lisk-commander/introduction.md): Command line tool to interact with the network and maintain a node.

## Build a blockchain application in 3 steps

### 1. Set up the SDK
To get started building a blockchain application, [set up the Lisk SDK](../lisk-sdk/introduction.md#setup).

The [Modules](../lisk-sdk/lisk-framework/introduction.md#modules) and [Components](../lisk-sdk/lisk-framework/introduction.md#components) of [Lisk Framework](../lisk-sdk/lisk-framework/introduction.md) come with a set of predefined default configurations, allowing you to start and test your network immediately.

To get your blockchain application started for the first time, follow the steps described in the [Lisk SDK - Usage](../lisk-sdk/introduction.md#usage) section.

### 2. Configure and customize the application

#### A. Configure modules and components
After the first successful start, feel free to [configure](../lisk-sdk/lisk-framework/configuration.md) the [Modules](../lisk-sdk/lisk-framework/introduction.md#modules) and [Components](../lisk-sdk/lisk-framework/introduction.md#components) to suit your specific needs.

It is also possible to exchange Modules with different ones, or to add new Modules to provide additional functionality.

To view the list of currently available ready-to-use Modules and Components, check out the [list of Modules](../lisk-sdk/lisk-framework/introduction.md#list-of-core-modules) and the [list of Components](../lisk-sdk/lisk-framework/introduction.md#components).

For a full list of all config options and their default values, see the [List of configuration options](../lisk-sdk/configuration.md#list-of-configuration-options) or the file [config_devnet.json](https://github.com/LiskHQ/lisk-sdk/blob/development/sdk/src/samples/config_devnet.json) on GitHub.

#### B. Register custom transaction types
Transactions are the main way to add data to your blockchain. The most basic transaction types are part of almost all blockchains, for example a transaction type for creating new accounts on the network, or a transaction type to send tokens from one account to another. You can choose the appropriate transaction types for your application and its use case.

For comparison, please view the [list of all transaction types](../lisk-protocol/transactions.md) which are implemented in the Lisk Protocol.

To create custom transaction types, utilize the provided `BaseTransaction` interface as described in the section for [custom transactions](custom-transactions.md).

See the [tutorials](tutorials.md) to see examples of how to create custom transaction types and how to add them to your application:

- [Hello World App](tutorials/hello-world.md): A example of a Lisk blockchain application with 1 custom transaction type, which extends the BaseTransaction type.
- [Cashback App](tutorials/cashback.md): A more practical example creating the new transaction type `Cashback`. Cashback extends the pre-existing transaction type TransferTransaction, making for a straightforward implementation.

### 3. Interact with the network
While your network is up and running, interact with the network and the node through the API and use [Lisk Commander](../lisk-sdk/lisk-commander/introduction.md) or [Lisk Elements](../lisk-sdk/lisk-elements/introduction.md) to create sendable transaction objects.

To monitor and explore the network, you may want to set up a monitoring solution like e.g. [Lisk Explorer](https://github.com/LiskHQ/lisk-explorer).

Depending on the level of customization, Lisk Explorer and Lisk Commander may also require customization to prevent other services from failing.

Another simple way to interact with the network is by connecting it to [Lisk Hub](https://github.com/LiskHQ/lisk-hub).
Lisk Hub provides a simple and beautiful user interface to create and manage accounts on the network, and also to interact with the network by sending different types of transactions.

Once your blockchain is finished, and it is possible to send the transactions (and custom transactions), you can create a frontend to allow users to interact and use your blockchain application.
To connect your frontend to your network, we recommend to make use of [Lisk Elements' packages](../lisk-sdk/lisk-elements/packages.md) like [lisk-api-client](../lisk-sdk/lisk-elements/packages/api-client.md).

> Check out the example applications at the [tutorials](tutorials.md), to see concrete examples how to make first interactions with a blockchain application.

See more options in the ['Interact with the network'](interact-with-network.md) getting started section.
