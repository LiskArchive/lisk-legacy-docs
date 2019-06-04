# Example Blockchain Applications

## Hello World App

> Check out the full code example for the [Hello World App on Github](https://github.com/LiskHQ/lisk-sdk-test-app/tree/development/hello_world).

A simple App, showcasing a minimal setup of a blockchain application with 1 custom transaction type: the "Hello" transaction.


## Cashback App

> Check out the full code example for the [code example on Github](https://github.com/LiskHQ/lisk-sdk-test-app).

A simple application which rewards its users for sending tokens. 

To achieve this, a custom transaction type `CashbackTransaction` is created.

It extends the pre-existing transaction type `TransferTransaction`.

Here the Cashback transaction type pays out a 50% bonus reward to the sender of any Cashback transaction type.

So if Alice sends 100 token to Bob as a Cashback transaction, Bob would receive the 100 token and Alice would receive additional 50 tokens as a cashback.
