# Example Blockchain Applications

## Hello World App

> Check out the full code example for the [Hello World App on Github](https://github.com/LiskHQ/lisk-sdk-test-app/tree/development/hello_world).

Welcome to the step-by-step guide of creating the Hello World application with Lisk Alpha SDK.
A simple App, showcasing a minimal setup of a blockchain application with 1 custom transaction type: the "Hello" transaction.

The purpose of Hello World application is to explain how to use and how to implement custom transaction with the Lisk SDK. 
The implementation is saving the string value of the "hello" transaction's asset property to the asset property of the sender's account.

Hello World transaction implements only the required functions from the BaseTransaction abstract interface.
The overview of Custom Transaction implementation you can find in the dedicated section.
So after sending a valid `{"type": 10, "senderId": "16313739661670634666L", ... "asset": { "hello": "world" } }` transaction, the sender's account changes from: `{ address: "16313739661670634666L", ..., asset: null }`, to `{ "address": "16313739661670634666L", ..., "asset": {"hello": "world"}} }`. 

The Hello World implementation goes as following:

### 1. Set up Lisk SDK

First, you need to set up the Lisk SDK following the instructions in the [Lisk SDK - Usage](../lisk-sdk/introduction.md#usage) section.

### 2. Create a new transaction type

For the Hello App, we want to create a new transaction type `HelloWorld`.

If the account of an address "16313739661670634666L" is able to afford a `HelloWorld` transaction (fee is set to 1 LSK by default), the new "hello" property appears into this account's asset field.

#### TYPE

Set the HelloWorld transaction TYPE to 10. Every time a transaction is received, it gets differentiated by the type. The first 10 types, from 0-9 is reserved for the default Lisk Network functions.
```js
static get TYPE () {
    return 10;
}
```
#### applyAsset

That's where the custom logic of the Hello World app is implemented. 

It shows how to store an additional information about accounts using the `asset` field. The content of property of "hello" transaction's asset gets saved into the "hello" property of the account's asset.

`applyAsset` and `undoAsset` uses the information about the sender's account from the `store`, which is defined in the `prepare` step.

Invoked as part of the `apply` step of the BaseTransaction and block processing.  
```js
applyAsset(store) {
    const sender = store.account.get(this.senderId);
    const newObj = { ...sender, asset: { hello: this.asset.hello } };
    store.account.set(sender.address, newObj);
    return [];
}
```
#### undoAsset
Inverse of `applyAsset`. Undoes the changes made in applyAsset step - removes the "hello" property from the account's asset field.

```js
undoAsset(store) {
    const sender = store.account.get(this.senderId);
    const oldObj = { ...sender, asset: null };
    store.account.set(sender.address, sender);
    return [];
}
```
#### validateAsset
Validation of the value of the "hello" property, defined by the HelloWorld transaction signer.
The implementation below checks, that the value of the "hello" property needs to be a string, no longer than 64 characters. 
```js
validateAsset() {
    const errors = [];
    if (!this.asset.hello || typeof this.asset.hello !== 'string' || this.asset.hello.length > 64) {
        errors.push(
            new TransactionError(
                'Invalid "asset.hello" defined on transaction',
                this.id,
                '.asset.hello',
                this.asset.hello,
                'A string value no longer than 64 characters',
            )
        );
    }
    return errors;
}
```
#### prepare
Prepares the necessary data for the `apply` and `undo` step.
The "hello" property will be added only to sender's account, therefore it's the only resource needed in the `appluAsset` and `undoAsset` steps. 
```js
async prepare(store) {
    await store.account.cache([
        {
            address: this.senderId,
        },
    ]);
}
```

## Cashback App

> Check out the full code example for the [code example on Github](https://github.com/LiskHQ/lisk-sdk-test-app).

A simple application which is rewarding it's users for sending tokens. 

To achieve this, a custom transaction type `CashbackTransaction` is created.

It extends the already existing transaction type `TransferTransaction`.

The Cashback transaction type returns half of the amount of tokens that are transferred back to the senders account.

So e.g. if Alice sends 100 token to Bob as a Cashback transaction, Bob would receive the 100 token and Alice would receive additional 50 tokens as a cashback.
