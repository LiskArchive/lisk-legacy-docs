# Lisk Tutorials

Welcome to Lisk tutorials!

Here we provide you with a detailed step-by-step tutorials that guide you through the process of developing blockchain application with the Lisk SDK.

All tutorials cover the following steps:

- how to initially set up the Lisk SDK and get the network started.
- how to develop a new transaction type and how to register it with the application.
- how to create a sendable transaction object of the new type, and send it to the network.

## Hello World
A hello world application built using the alpha SDK.

Explains how to create a new transaction type from scratch.

A simple example to showcase how to create a new transaction type by implementing the [`BaseTransaction` interface](custom-transactions.md).

- [Full code example of Hello World app](https://github.com/LiskHQ/lisk-sdk-examples/tree/development/hello_world) on Github.
- [Hello World Tutorial](tutorials/hello-world.md)

## Cashback

The example of a simple but valid use-case - a cashback transaction.
Built by extending the balance transfer transaction, in addition to the regular transfer functionality, the cashback transaction also applies an inflationary 10% to senders account.

This example shows you how to create a new custom transaction inheriting from a pre-existing transaction type.

- [A full example Cashback application's codebase ](https://github.com/LiskHQ/lisk-sdk-examples/tree/development/cashback) is available Github.
- [Cashback Tutorial](tutorials/cashback.md)
