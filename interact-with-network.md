# Interact with the network

You can choose from up to four  ways to interact with an existing network based on what is most convenient for your case:

## 1. Query the API
Query the [API](https://lisk.io/documentation/lisk-core/api) manually. Either from a public node, or connect to your own private node to interact with the network.

### Use a public node

There are a number of nodes that are available for the public use.

LiskHQ for example is running a public testnet node, that is also used to make [live requests](https://lisk.io/documentation/lisk-core/api) while trying out the different API endpoints in the documentation.

> When hitting the "Try it out" button beside each endpoint, it is possible to execute the corresponding API request and get a live response from the Lisk Testnet.
> It will also display the corresponding Curl command to make the request from the Command-line

### Use your private node

When [setting up Lisk Core](maintain-node.md), the API will be private by default, which means API requests will be only accepted from localhost.

To change this, it is possible to define exclusive [whitelists](../lisk-core/configuration#api-access-control), that allow specific addresses to perform API requests on the node.

## 2. Use the Command-line
[Lisk Commander](../lisk-commander/introduction.md) is the CLI-tool that lets you interact with the network conveniently through the command line.

See a list of all commands and their example responses on the [Commands page](../lisk-commander/user-guide/commands.md).

## 3. Write scripts in Javascript
[Lisk Elements](../lisk-elements/introduction.md) is a collection of Javascript libraries that help applications to interact with the network.

On the [Packages page](../lisk-elements/packages.md) of Lisk Elements, all available libraries are listed and documented.

One of the most useful packages in this regard is the [@liskhq/lisk-api-client](../lisk-elements/packages/api-client.md) as it provides a slick interface to interact with the network in Javascript.

## 4. Use Lisk Hub
[Lisk Hub](https://lisk.io/hub) is the Graphical User Interface (GUI) to interact with the network.

It consists of wallet functionalities like sending transactions and view account history, and more extended features like delegate voting or registering as a delegate.
