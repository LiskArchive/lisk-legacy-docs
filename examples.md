# Example Blockchain Applications

## Hello World App

> Check out the full code example for the [Hello World App on Github](https://github.com/LiskHQ/lisk-sdk-test-app/tree/development/hello_world).

Welcome to the step-by-step guide of creating the Hello World application with Lisk Alpha SDK.
A simple App, showcasing a minimal setup of a blockchain application with 1 [custom transaction](custom-transactions.md) type: the "Hello" transaction.

The purpose of Hello World application is to explain how to use and how to implement custom transaction with the Lisk SDK. 
The implementation is saving the string value of the "hello" transaction's asset property to the asset property of the sender's account.

Hello World transaction implements only the required functions from the BaseTransaction abstract interface.

The Hello World implementation goes as following:

- __Steps 1-5__ describe what needs to be implemented on the server-side of the blockchain application.
- __Step 6__ explains how to interact with the network from the client-side.

### 1. Set up Lisk SDK

First, you need to set up the Lisk SDK following the instructions in the [Lisk SDK - Usage](../lisk-sdk/introduction.md#usage) section.

### 2. Configure the application

Next, let's configure the application, to provide basic information about the app we are going to build:

```js
//index.js
const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk'); // require application class, the default genesis block and the default config for the application

const app = new Application(genesisBlockDevnet, configDevnet); // create the application instance
```

In the `line 2`, we require the needed dependencies from the `lisk-sdk` package.
The most important one is the `Application` class, which is used in `line 4` to create the application instance.
The application instance will start the whole application at the bottom of `index.js`.

In `line 4` , the application instance gets initialized.
By passing the parameters for the [genesis block](../lisk-sdk/configuration.md) and the [configuration template](https://github.com/LiskHQ/lisk-sdk/blob/development/sdk/src/samples/config_devnet.json), the application is configured with most basic configurations to start the node.

### 3. Create a new transaction type

For the Hello World App, we want to create a [custom transaction type](custom-transactions.md) `HelloWorld`: 
If an account is able to afford a `HelloWorld` transaction (fee is set to 1 LSK by default), the new "hello" property appears into this account's asset field.
So after sending a valid `{"type": 10, "senderId": "16313739661670634666L", ... "asset": { "hello": "world" } }` transaction, the sender's account changes from e.g.: `{ address: "16313739661670634666L", ..., asset: null }`, to `{ "address": "16313739661670634666L", ..., "asset": {"hello": "world"}} }`.

Now, let's create a new file `hello_transaction.js`, which is defining the new transaction type `HelloTransaction`:

```js
//hello_transaction.js
const {	BaseTransaction, TransactionError } = require('@liskhq/lisk-transactions'); // import the BaseTransaction class from Lisk Elements transactions package

class HelloTransaction extends BaseTransaction { // let the HelloTransaction become a child class of BaseTransaction

// add the all methods described below here

}

module.exports = HelloTransaction;
``` 

> You find a version of [the complete `hello_transaction.js` file](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/hello_world/hello_transaction.js) on Github

The __required__ methods are described here in detail:

#### TYP

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

### 4. Register the new transaction type

Right now, your project should have the following file structure:

```bash
/hello-world-app # root directory of the application
/hello-world-app/hello_transaction.js # the custom transaction, created in step 3
/hello-world-app/index.js # the index file of your application, created in step 1, extended in step 2 and 4
/hello-world-app/node_modules/ # project dependencies, created in step 1
/hello-world-app/package.json # project manifest file, created in step 1
```

Add the new transaction type to your application, by registering it to the application instance:

```js
//index.js
const { Application, genesisBlockDevnet, configDevnet} = require('lisk-sdk'); // require application class, the default genesis block and the default config for the application
const HelloTransaction = require('./hello_transaction'); // require the newly created transaction type 'HelloTransaction'

const app = new Application(genesisBlockDevnet, configDevnet); // create the application instance

app.registerTransaction(10, HelloTransaction); // register the 'HelloTransaction' 


// the code block below starts the application and doesn't need to be changed
app
    .run()
    .then(() => app.logger.info('App started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(1);
    });
```

### 5. Start the network

Now, let's start our customized blockchain network for the first time.

The parameter `configDevnet`, which we pass to our `Application` instance in step 3, is preconfigured to start the node with a set of dummy delegates, that have enabled forging by default.
These dummy delegates stabilize the new network and make it possible to test out the basic functionality of the network with only one node immediately.

This creates a simple Devnet, which is beneficial during development of the blockchain application.
The dummy delegates can be replaced by real delegates later on.

To start the network, execute the following command:

```bash
node index.js | npx bunyan -o short
```

`node index.js` will start the node, and `| npx bunyan -o short` will pretty-print the logs in the console.

Check the logs, to verify the network has started successfully.

If something went wrong, the process should stop and an error with debug information is displayed.

If everything is ok, you should be able to see the following console logs:

```
$ node index.js | npx bunyan -o short
10:11:27.820Z  INFO lisk-framework: Booting the application with Lisk Framework(0.1.0)
10:11:27.822Z  INFO lisk-framework: Starting the app - hello-world-app
10:11:27.846Z  INFO lisk-framework: Initializing controller
10:11:27.847Z  INFO lisk-framework: Loading controller
10:11:27.919Z  INFO lisk-framework: Old PID: 6505
10:11:27.920Z  INFO lisk-framework: Current PID: 7735
10:11:27.924Z  INFO lisk-framework: Loading module lisk-framework-chain:0.1.0 with alias "chain"
10:11:28.042Z  INFO lisk-framework: Event network:bootstrap was subscribed but not registered to the bus yet.
10:11:28.045Z  INFO lisk-framework: Event network:bootstrap was subscribed but not registered to the bus yet.
10:11:28.065Z  INFO lisk-framework: Modules ready and launched
10:11:28.066Z  INFO lisk-framework: Event network:event was subscribed but not registered to the bus yet.
10:11:28.066Z  INFO lisk-framework: Module ready with alias: chain(lisk-framework-chain:0.1.0)
10:11:28.066Z  INFO lisk-framework: Loading module lisk-framework-network:0.1.0 with alias "network"
10:11:28.079Z  INFO lisk-framework: Blocks 425
10:11:28.079Z  INFO lisk-framework: Genesis block matched with database
10:11:28.101Z  INFO lisk-framework: Module ready with alias: network(lisk-framework-network:0.1.0)
10:11:28.101Z  INFO lisk-framework: Loading module lisk-framework-http-api:0.1.0 with alias "http_api"
10:11:28.101Z  INFO lisk-framework: Module ready with alias: http_api(lisk-framework-http-api:0.1.0)
10:11:28.101Z  INFO lisk-framework:
    Bus listening to events [ 'app:ready',
      'app:state:updated',
      'chain:bootstrap',
      'chain:blocks:change',
      'chain:signature:change',
      'chain:transactions:change',
      'chain:rounds:change',
      'chain:multisignatures:signature:change',
      'chain:multisignatures:change',
      'chain:delegates:fork',
      'chain:loader:sync',
      'chain:dapps:change',
      'chain:registeredToBus',
      'chain:loading:started',
      'chain:loading:finished',
      'network:bootstrap',
      'network:event',
      'network:registeredToBus',
      'network:loading:started',
      'network:loading:finished',
      'http_api:registeredToBus',
      'http_api:loading:started',
      'http_api:loading:finished' ]
10:11:28.102Z  INFO lisk-framework:
    Bus ready for actions [ 'app:getComponentConfig',
      'app:getApplicationState',
      'app:updateApplicationState',
      'chain:calculateSupply',
      'chain:calculateMilestone',
      'chain:calculateReward',
      'chain:generateDelegateList',
      'chain:updateForgingStatus',
      'chain:postSignature',
      'chain:getForgingStatusForAllDelegates',
      'chain:getTransactionsFromPool',
      'chain:getTransactions',
      'chain:getSignatures',
      'chain:postTransaction',
      'chain:getDelegateBlocksRewards',
      'chain:getSlotNumber',
      'chain:calcSlotRound',
      'chain:getNodeStatus',
      'chain:blocks',
      'chain:blocksCommon',
      'network:request',
      'network:emit',
      'network:getNetworkStatus',
      'network:getPeers',
      'network:getPeersCountByFilter' ]
10:11:28.102Z  INFO lisk-framework: App started...
10:11:28.116Z  INFO lisk-framework: Validating current block with height 425
10:11:28.116Z  INFO lisk-framework: Loader->validateBlock Validating block 6793985054296884034 at height 425
10:11:28.186Z  INFO lisk-framework: Verify->verifyBlock succeeded for block 6793985054296884034 at height 425.
10:11:28.186Z  INFO lisk-framework: Loader->validateBlock Validating block succeed for 6793985054296884034 at height 425.
10:11:28.188Z  INFO lisk-framework: Finished validating the chain. You are at height 425.
10:11:28.191Z  INFO lisk-framework: Blockchain ready
10:11:28.191Z  INFO lisk-framework: Loading 101 delegates using encrypted passphrases from config
10:11:28.621Z  INFO lisk-framework: Lisk started: 0.0.0.0:4000
10:11:28.631Z  INFO lisk-framework: Forging enabled on account: 8273455169423958419L
10:11:28.634Z  INFO lisk-framework: Forging enabled on account: 12254605294831056546L
10:11:28.636Z  INFO lisk-framework: Forging enabled on account: 14018336151296112016L
10:11:28.637Z  INFO lisk-framework: Forging enabled on account: 2003981962043442425L
[...]
```

For further interaction with the network, you can run the process in the background by executing:

```bash
npx pm2 start --name hello index.js # add the application to pm2 under the name 'hello'
npx pm2 stop hello # stop the hello app
npx pm2 start hello # start the hello app
```

### 6. Interact with the network

Now that the network is started, let's try to send a `HelloTransaction` to our node to see if it gets accepted.

As first step, create the transaction object.

First, we create a script [create_sendable_transaction.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/scripts/create_sendable_transaction_base_trs.js).

The purpose of this script is to offer a function `createSendableTransaction(Transaction, inputs)` that accepts two parameters: 1) `Transaction`: the *transaction type* and 2) `inputs`: the *corresponding transaction object*.

To view a full code example of this file, please click on the link above.

We present the most important parts of the script below:

```js
//create_sendable_transaction_base_trs.js
const { validateAddress, validatePublicKey } = require('@liskhq/lisk-validator');
const { getAddressFromPublicKey } = require('@liskhq/lisk-cryptography');

module.exports = (Transaction, inputs) => {
    // write some logic to validate the given inputs
    validateRequiredInputs(inputs);
    
    // the relevant parameters of the transaction object are extracted and put into indicative variables
    const {
        data,
        amount,
        asset,
        fee,
        type,
        recipientId,
        recipientPublicKey,
        senderPublicKey,
        passphrase,
        secondPassphrase,
        timestamp,
    } = inputs;
    
    // a new instance of the provided Transaction type is created by passing the transaction parameters
    const transaction = new Transaction(
        {
            asset: data ? { data } : asset,
            amount,
            fee,
            recipientId,
            senderPublicKey,
            type,
            timestamp,
        }
    );
    
    // next, newly created transaction object needs to be signed by the sender, by utilizing the sign() method of the transaction type. As arguments, the passphrase and , if existent, the secondPassphrase are passed.
    transaction.sign(passphrase, secondPassphrase);
    
    // the signed trasnaction object is returned in JSON format
    return asJSON(skipUndefined(transaction.toJSON()));
}
```

The second script simply will print a sendable `HelloTransaction` when executed.

Therefore, it will make use of the function `createSendableTransaction()`, which we have created above:

```js
//print_sendable.js
const createSendableTransaction = require('./create_sendable_transaction_base_trs');
const HelloTransaction = require('../hello_world/hello_transaction');

let h = createSendableTransaction(HelloTransaction, {
	type: 10, // we want to send a transaction type 10 (= HelloTransaction)
	asset: {
		hello: 'world', // we save the string 'world' into the 'hello' asset
	},
	fee: `${10 ** 8}`, // we set the fee to 1 LSK
	recipientId: '10881167371402274308L', // address of dummy delegate genesis_100
	senderPublicKey: 'c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f', // the senders publicKey
	passphrase: 'wagon stock borrow episode laundry kitten salute link globe zero feed marble', // the senders passphrase, needed to sign the transaction
	timestamp: 0,
});

console.log(h); // the desired trasnaction is created and signed, and then displayed as JSON object in the console
```

Now that we have a sendable transaction object, let's send it to our node and see how it gets processed by analyzing the logs.

For this, we utilize the API of the node and post the created transaction object to the transaction endpoint of the API.

Because the API of every node is only accessible form localhost by default, you need to execute this query on the same server that your node is runnign on, unless you changed the config to make your API accessible others or to the public.

```bash
node print_sendable.js | curl -X POST -H "Content-Type: application/json" -d @- localhost:4000/api/transactions
```

> __Optional:__ After first successful verification, you may wan to reduce the default console log level (info) and file log level (debug).<br> 
> You can do so, by passing a copy of the config object `configDevnet` with customized config for the logger component:

```js
//index.js
const { Application, genesisBlockDevnet, configDevnet} = require('lisk-sdk'); // require application class, the default genesis block and the default config for the application
const HelloTransaction = require('./hello_transaction'); // require the newly created transaction type 'HelloTransaction'

configDevnet.components.logger.fileLogLevel = "error"; // will only log errors and fatal errors in the log file
configDevnet.components.logger.consoleLogLevel = "none"; // no logs will be shown in console

const app = new Application(genesisBlockDevnet, configDevnet); // create the application instance
```

## Cashback App

> Check out the full code example for the [Cashback App on Github](https://github.com/LiskHQ/lisk-sdk-test-app).

A simple application which is rewarding it's users for sending tokens. 

To achieve this, a custom transaction type `CashbackTransaction` is created.

It extends the already existing transaction type `TransferTransaction`.

The Cashback transaction type returns half of the amount of tokens that are transferred back to the senders account.

So e.g. if Alice sends 100 token to Bob as a Cashback transaction, Bob would receive the 100 token and Alice would receive additional 50 tokens as a cashback.
