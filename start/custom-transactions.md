# Custom transaction types

## What are custom transactions?

Transactions are an essential part of blockchain applications that are created using the Lisk SDK.

The Lisk SDK provides a class [BaseTransaction](https://github.com/LiskHQ/lisk-sdk/blob/development/elements/lisk-transactions/src/base_transaction.ts) from which developers can inherit and extend from, to create __custom transaction types__.

The application-specific business logic for custom transaction types is defined according to an abstract [interface](#interface) that is common across all transaction types.

All of the default transaction types of the Lisk SDK transactions implement the abstract interface of the base transaction, and therefore the base transaction can be used as a model for custom transactions. It's also possible to inherit one of the default transaction types, in order to extend or modify them.

## What are the different custom transaction types?

Each default transaction type implements a different use case of the Lisk network, i.e:

0. Balance transfer (type 0)
1. Second signature registration (type 1)
1. Delegate registration (type 2)
1. Delegate vote (type 3)
1. Multisignature account registration (type 4)

> The first 10 transaction types are reserved for the [Lisk protocol](https://lisk.io/documentation/lisk-protocol), don't use them to register custom transactions.

__For a complete list of all default transaction types, check out the section [Lisk Transactions](https://lisk.io/documentation/lisk-protocol/transactions) of the Lisk Protocol.__

Furthermore, the Lisk SDK [tutorials](tutorials.md) include simple code examples of custom transaction types.

## What is the Lifecycle of a transaction?

The lifecycle of a general transaction using the Lisk SDK can be summarized in 7 steps:

- __1. A transaction is created and signed (off-chain).__ The script to do this is `src/create_and_sign.ts`.
- __2. The transaction is sent to a network.__ This can be done by a third party tool (like `curl` or `Postman`), but also using Lisk Commander, Lisk Hub or Mobile. All of the tools need to be authorized to access an HTTP API of a network node.
- __3. A network node receives the transaction__ and after a lightweight schema validation, adds it to a transaction pool.
- __4. In the transaction pool, the transactions are firstly `validated`.__ In this step, only static checks are performed. These include schema validation and signature validation.
- __5. Validated transactions go to the `prepare` step__ defined in the transaction class, which to limit the I/O database operations, prepares all the information relevant to properly `apply` or `undo` the transaction. The store with the prepared data is a parameter of the mentioned methods.
- __6. Delegates forge the valid transactions into blocks__ and broadcasting the blocks to the network. Each network node performs the `apply` and `applyAsset` steps after the successful completion of the `validate` step.
- __7. Shortly after a block is applied, it's possible that a node performs the `undo` step__ (due to decentralized network conditions). When this happens, the block containing all of the included transactions get reverted in favor of a competing block.

While implementing a custom transaction, it is necessary to complete some of these steps. Often, a base transaction implements a default behavior. With experience, you may decide to override some of these base transaction methods, resulting in an implementation that is well-tailored and provides the best possible performance for your use case.

## Interface

### Required Properties

#### TYPE

```js
static get TYPE (): number
```

The hallmark of a transaction. Set this constant to any number, except `0-9`, which are reserved for the default transactions.

### Required Methods

All of the abstract methods and properties on the base transaction's interface are required to implement. These are the following:

#### prepare

```js
prepare(store: StateStorePrepare): Promise<void>
```

#### validateAsset

```js
validateAsset(): ReadonlyArray<TransactionError>
```

Before a transaction reaches the apply step it gets validated. Check the transaction's asset correctness from the schema perspective (no access to StateStore here).
Invalidate the transaction by pushing an error into the result array.
Prepare the relevant information about the accounts, which will be accessible in the later steps during the `apply` and `undo` steps.

#### applyAsset

```js
applyAsset(store: StateStore): ReadonlyArray<TransactionError>
```

The business use-case of a transaction is implemented in `applyAsset` method. Applys all of the necessary changes from the received transaction to the affected account(s) by calling `store.set`. Calls `store.get` to get all of the relevant data. The transaction that you're currently processing is the function's context (ie `this.amount`).
Invalidate the transaction by pushing an error into the result array.

#### undoAsset

```js
undoAsset(store: StateStore): ReadonlyArray<TransactionError>
```

The inversion of the `applyAsset` method. Undoes all of the changes to the accounts applied by the `applyAsset` step.

### Additional Methods

To increase your application's performance, you should override the following functions: `verifyAgainstTransactions`, `assetFromSync`, `fromSync`.

The BaseTransaction provides the default implementation of the methods revolving around the signatures.
As your application matures you can provide the custom ways of how your a transaction's signature is derived: `sign`, `getBytes`, `assetToBytes`.
