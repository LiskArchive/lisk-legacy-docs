# SDK Tutorials

Get onboarded to the Lisk SDK with step-by-step walkthroughs that simplify the process of developing a proof of concept blockchain application.

## What do the tutorials cover?

- How to initially set up the Lisk SDK and get the network started.
- How to develop a new transaction type and how to register it with the application.
- How to create a sendable transaction object of the new type, and broadcast it to the network.

## Hello World

Built using the Alpha SDK, our Hello World application explains how to create a new transaction type from scratch.

Hello World is a simple example to showcase how to create a new transaction type by implementing the [`BaseTransaction` interface](custom-transactions.md).

- [Hello World Tutorial](tutorials/hello-world.md)
- [View the full code example of our Hello World application on GitHub.](https://github.com/LiskHQ/lisk-sdk-examples/tree/development/hello_world)


## Cashback

The Cashback application shows you how to create a new custom transaction inherited from a pre-existing transaction type.

Built by extending the balance transfer transaction, in addition to the regular transfer functionality, the cashback transaction also applies an inflationary 10% to the senders account.

This tutorial is an example of a simple but valid use case - a cashback transaction.

- [Cashback Tutorial](tutorials/cashback.md)
- [View the full code example of our Cashback application on GitHub.](https://github.com/LiskHQ/lisk-sdk-examples/tree/development/cashback)

