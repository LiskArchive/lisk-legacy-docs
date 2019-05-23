# Interact with the network

> Every action that puts data on the blockchain, or gets data from it, is an interaction with the blockchain network. 

There are several groups that need to interact with the network :

- __Exchanges__ interact heavily with the network, e.g. by transferring tokens for their customers. For exchanges, it is recommended to [set up their own node](maintain-node.md) to interact with the network reliably.
- __Delegates__ interact with the network by forging new blocks and adding them to the blockchain. A delegate typically is also a __node operator__.
- __Node operators__ have a general interest in monitoring their node and the network. Their node provides them with a private API that can be used to make different queries or to post transactions to the network. Depending on their preferences, node operators might want to use [Lisk Commander](#a-use-the-command-line), [Lisk Elements](#b-write-scripts-in-javascript) or a graphical interface like [Lisk Hub](#c-use-lisk-hub).
- __Developers__ test and prove the functionality of their blockchain application. For quick testing we recommend to use [Lisk Commander](#a-use-the-command-line).
- __Applications__ interact through the API with the network. For convenience, applications would use wrappers like [@liskHQ/lisk-api-client](../lisk-sdk/lisk-elements/packages/api-client.md). Applications might also want to make use of [Lisk Service](https://github.com/LiskHQ/lisk-service) and its extended API.
- __End users__ mostly interact with the network through Graphical User Interfaces such as wallet applications like [Lisk Hub](#c-use-lisk-hub).

## How to interact with the network

> The following tools are suited for interacting with the Main- and Testnet of Lisk, but they can be used for interaction with other blockchain applications that have been developed with the Lisk SDK as well

You can choose from up to five ways to interact with an existing network based on what is most convenient for your case:

## A. Use the Command-line
[Lisk Commander](../lisk-sdk/lisk-commander/introduction.md) is the CLI-tool that lets you interact with the network conveniently through the command line.

See a list of all commands and their example responses on the [Commands page](../lisk-sdk/lisk-commander/user-guide/commands.md).

## B. Write scripts in Javascript
[Lisk Elements](../lisk-sdk/lisk-elements/introduction.md) is a collection of Javascript libraries that help applications to interact with the network.

On the [Packages page](../lisk-sdk/lisk-elements/packages.md) of Lisk Elements, all available libraries are listed and documented.

One of the most useful packages in this regard is the [@liskhq/lisk-api-client](../lisk-sdk/lisk-elements/packages/api-client.md) as it provides a slick interface to interact with the network in Javascript.

## C. Use Lisk Hub
[Lisk Hub](https://lisk.io/hub) is the Graphical User Interface (GUI) to interact with the network.

It consists of wallet functionalities like sending transactions and view account history, and more extended features like delegate voting or registering as a delegate.

## D. Query the API
Query the [API](https://lisk.io/documentation/lisk-core/api) manually. Either from a public node, or connect to your own private node to interact with the network.

### Use a public node

There are a number of nodes that are available for the public use.

LiskHQ for example is running a public testnet node, that is also used to make [live requests](https://lisk.io/documentation/lisk-core/api) while trying out the different API endpoints in the documentation.

> When hitting the "Try it out" button beside each endpoint, it is possible to execute the corresponding API request and get a live response from the Lisk Testnet.
> It will also display the corresponding Curl command to make the request from the Command-line

### Use your private node

When [setting up Lisk Core](maintain-node.md), the API will be private by default, which means API requests will be only accepted from localhost.

To change this, it is possible to define exclusive [whitelists](../lisk-core/configuration#api-access-control), that allow specific addresses to perform API requests on the node.

## E. Query the extended API

[Lisk Service](https://github.com/LiskHQ/lisk-service) combines various services in the Lisk ecosystem and makes it available through an extended API with a bigger selection of endpoints.
