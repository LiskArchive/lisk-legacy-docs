# Cashback App

A simple application which rewards its users for sending tokens. 

The Cashback App implementation goes as following:

- __Steps 1-5__ describes the sever-side implementation of the blockchain application.
- __Step 6__  shows how to interact with the network from the (blockchain) client-side using a node script.
- __Step 7__ explains how to override specific config values.

> Check out the __full code example__ of the [Cashback App on Github](https://github.com/LiskHQ/lisk-sdk-test-app/cashback).

## 1. Set up Lisk SDK

First, let's create the root folder for the Cashback App and initialize the project:

```bash
mkdir cashback # create the root folder for the blockchain application
cd cashback # navigate into the root folder
npm init # initialize the manifest file of the project
```

As next step, we want to install the `lisk-sdk` package and add it to our projects' dependencies.
Before installing it, make sure to follow the instructions in the [Lisk SDK - Pre-Install](../../lisk-sdk/introduction.md#pre-installation) section.

```bash
npm install --save lisk-sdk@alpha # install lisk-sdk as dependency for the server side
npm install --save @liskhq/validator @liskhq/cryptography # install lisk-elements dependencies for the client side scripts
```

Create two folders `client` and `server`, which will hold the corresponding scripts for the blockchain application.

- the `server` folder holds all the code that is needed to start a node and connect it to a network.
- the `client` folder holds scritps that communicate with the network through the API of the node.

```bash
mkdir client server # creates the folder inside the root directory of your blockchain application
cd server # move inside the server folder
```

Inside the `server` folder, create the index file of your blockchain application:

```bash
touch index.js
```

## 2. Configure the application

Next, let's configure the application, to provide basic information about the application we are going to build:

```js
//server/index.js
const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk'); // require application class, the default genesis block and the default config for the application

const app = new Application(genesisBlockDevnet, {...configDevnet, app: {label: 'Cashback blockchain application'}}); // create the application instance

// the code block below starts the application and doesn't need to be changed
app
    .run()
    .then(() => app.logger.info('App started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(1);
    });        
```
> *See the complete file on Github: [cashback/server/index.js](https://github.com/LiskHQ/lisk-sdk-test-app/tree/development/cashback/server/index.js).*

On `line 2`, we require the needed dependencies from the `lisk-sdk` package.
The most important one is the `Application` class, which is used in `line 4` to create the application instance.
The application instance is used to start the blockchain application at the bottom of `index.js`.

In `line 4` , the application instance gets initialized.
By passing the parameters for the [genesis block](../../lisk-sdk/configuration.md) and the [configuration template](https://github.com/LiskHQ/lisk-sdk/blob/development/sdk/src/samples/config_devnet.json), the application is configured with the most basic configurations to start the node.

> If you want to change any of the values for `configDevnet`, check out the [full list of configurations](../../lisk-sdk/configuration.md#list-of-configuration-options) for Lisk SDK and overwrite them like described in [step 7](#7-customize-the-default-configuration)

## 3. Create a new transaction type

Now, we want to create a new [custom transaction type](custom-transactions.md) `CashbackTransaction`: 
It extends the pre-existing transaction type `TransferTransaction`.
The difference between the regular `TransferTransaction` and the `CashbackTransaction`, is that Cashback transaction type also pays out a 10% bonus reward to its sender.

So e.g. if Alice sends 100 token to Bob as a Cashback transaction, Bob would receive the 100 token and Alice would receive additional 10 tokens as a cashback.

> If you compare the methods below with the methods we implemented in the `HelloTransaction`, you will notice, that we implement fewer methods for the `CashbackTransaction`.
> This is because we extend the `CashbackTransaction` from an already existing transaction type `TransferTransaction`.
> As a result, all required methods are implemented already inside the `TransferTransaction` class, and we only need to overwrite/extend explicitely the methods we want to customize.

Now, let's create a new file `cashback_transaction.js`, which is defining the new transaction type `CashbackTransaction`:

```js
//server/cashback_transaction.js
const {	TransferTransaction, BigNum } = require('lisk-sdk'); // import the TransferTransaction class and Bignum from the Lisk SDK package

class CashbackTransaction extends TransferTransaction { // let the CashbackTransaction become a child class of TransferTransaction

// add the all methods described below here

}

module.exports = CashbackTransaction;
``` 
> *See the complete file on Github: [cashback/server/cashback_transaction.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/cashback/server/cashback_transaction.js)*

### TYPE

Set the Cashback transaction TYPE to `11`.
The first 10 types, from `0-9` is reserved for the default Lisk Network functions.
Type `10` was used previously for the `HelloTransaction`, so we set it to `11`, but any other integer value (that is not already used by another transaction type) is a valid value.
```js
static get TYPE () {
    return 11;
}
```

### applyAsset

The CashbackTransaction adds an inflationary 10% to senders account.

Invoked as part of the `apply` step of the BaseTransaction and block processing.  
```js
applyAsset(store) {
    super.applyAsset(store); // transfer the tokens to the recipient account, executes applyAsset() of TransferTransaction

    const sender = store.account.get(this.senderId); // get sender id
    const updatedSenderBalanceAfterBonus = new BigNum(sender.balance).add( // add 1/10 of the transaction amount to senders account balance
        new BigNum(this.amount).div(10) 
    );
    const updatedSender = { // update senders account balance
        ...sender,
        balance: updatedSenderBalanceAfterBonus.toString(),
    };
    store.account.set(sender.address, updatedSender); // push updated account back to database

    return []; // array of TransactionErrors, returns empty array if no errors are thrown
}
```

### undoAsset

Inverse of `applyAsset`.
Undoes the changes made in `applyAsset` step: It sends the transaction amount back to the sender and substracts 1/10 of the transaction amount from the senders account balance.
```js
undoAsset(store) {
    super.undoAsset(store); // transfer the tokens back from the recipient account to the senders account, executes undoAsset() of TransferTransaction

    const sender = store.account.get(this.senderId); // get sender id
    const updatedSenderBalanceAfterBonus = new BigNum(sender.balance).sub( // substract 1/10 of the transaction amount from senders account balance
        new BigNum(this.amount).div(10)
    );
    const updatedSender = { // update senders account balance
        ...sender,
        balance: updatedSenderBalanceAfterBonus.toString(),
    };
    store.account.set(sender.address, updatedSender); // push updated account back to database

    return []; // array of TransactionErrors, returns empty array if no errors are thrown
}
```

## 4. Register the new transaction type

Right now, your project should have the following file structure:

```bash
/cashback-app # root directory of the application
/cashback-app/client # location for scripts from the client side, empty right now, created in step 1
/cashback-app/server/cashback_transaction.js # the custom transaction, created in step 3
/cashback-app/server/index.js # the index file of your application, created in step 1, extended in step 2 and 4
/cashback-app/node_modules/ # project dependencies, created in step 1
/cashback-app/package.json # project manifest file, created in step 1
```

Add the new transaction type to your application, by registering it to the application instance:

```js
//server/index.js
const { Application, genesisBlockDevnet, configDevnet} = require('lisk-sdk'); // require application class, the default genesis block and the default config for the application
const CashbackTransaction = require('./cashback_transaction'); // require the newly created transaction type 'CashbackTransaction'

const app = new Application(genesisBlockDevnet, configDevnet); // create the application instance

app.registerTransaction(11, CashbackTransaction); // register the 'CashbackTransaction' 


// the code block below starts the application and doesn't need to be changed
app
    .run()
    .then(() => app.logger.info('App started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(1);
    });
```

## 5. Start the network

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

If an error occurs, the process should stop and the error with debug information will be displayed.

If everything is ok, the following logs will be displayed:

```
$ node index.js | npx bunyan -o short
14:01:39.384Z  INFO lisk-framework: Booting the application with Lisk Framework(0.1.0)
14:01:39.391Z  INFO lisk-framework: Starting the app - devnet-alpha-sdk
14:01:39.392Z  INFO lisk-framework: Initializing controller
14:01:39.392Z  INFO lisk-framework: Loading controller
14:01:39.451Z  INFO lisk-framework: Old PID: 7707
14:01:39.452Z  INFO lisk-framework: Current PID: 7732
14:01:39.467Z  INFO lisk-framework: Loading module lisk-framework-chain:0.1.0 with alias "chain"
14:01:39.613Z  INFO lisk-framework: Event network:bootstrap was subscribed but not registered to the bus yet.
14:01:39.617Z  INFO lisk-framework: Event network:bootstrap was subscribed but not registered to the bus yet.
14:01:39.682Z  INFO lisk-framework: Modules ready and launched
14:01:39.683Z  INFO lisk-framework: Event network:event was subscribed but not registered to the bus yet.
14:01:39.684Z  INFO lisk-framework: Module ready with alias: chain(lisk-framework-chain:0.1.0)
14:01:39.684Z  INFO lisk-framework: Loading module lisk-framework-network:0.1.0 with alias "network"
14:01:39.726Z  INFO lisk-framework: Blocks 1886
14:01:39.727Z  INFO lisk-framework: Genesis block matched with database
14:01:39.791Z ERROR lisk-framework: Error occurred while fetching information from 127.0.0.1:5000
14:01:39.794Z  INFO lisk-framework: Module ready with alias: network(lisk-framework-network:0.1.0)
14:01:39.795Z  INFO lisk-framework: Loading module lisk-framework-http-api:0.1.0 with alias "http_api"
14:01:39.796Z  INFO lisk-framework: Module ready with alias: http_api(lisk-framework-http-api:0.1.0)
14:01:39.797Z  INFO lisk-framework:
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
14:01:39.799Z  INFO lisk-framework:
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
14:01:39.800Z  INFO lisk-framework: App started...
14:01:39.818Z  INFO lisk-framework: Validating current block with height 1886
14:01:39.819Z  INFO lisk-framework: Loader->validateBlock Validating block 10258884836986606075 at height 1886
14:01:40.594Z  INFO lisk-framework: Lisk started: 0.0.0.0:4000
14:01:40.600Z  INFO lisk-framework: Verify->verifyBlock succeeded for block 10258884836986606075 at height 1886.
14:01:40.600Z  INFO lisk-framework: Loader->validateBlock Validating block succeed for 10258884836986606075 at height 1886.
14:01:40.600Z  INFO lisk-framework: Finished validating the chain. You are at height 1886.
14:01:40.601Z  INFO lisk-framework: Blockchain ready
14:01:40.602Z  INFO lisk-framework: Loading 101 delegates using encrypted passphrases from config
14:01:40.618Z  INFO lisk-framework: Forging enabled on account: 8273455169423958419L
14:01:40.621Z  INFO lisk-framework: Forging enabled on account: 12254605294831056546L
14:01:40.624Z  INFO lisk-framework: Forging enabled on account: 14018336151296112016L
14:01:40.627Z  INFO lisk-framework: Forging enabled on account: 2003981962043442425L
[...]
```


## 6. Interact with the network

Now that your network is running, let's try to send a `CashbackTransaction` to our node to see if it gets accepted.

As first step, create the transaction object.

First, let's reuse the script [create_sendable_transaction_base_trs.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/scripts/create_sendable_transaction_base_trs.js) which we already described in [step 6 of Hello World app](hello-world.md#6-interact-with-the-network).

We can call the `createSendableTransaction` function to print a sendable `CashbackTransaction` object:

```js
//client/print_sendable_cashback.js
const createSendableTransaction = require('./create_sendable_transaction_base_trs');
const CashbackTransaction = require('../server/cashback_transaction');

let c = createSendableTransaction(CashbackTransaction, { // the desired transaction gets created and signed
	type: 11, // we want to send a transaction type 11 (= CashbackTransaction)
	data: null,
	amount: `${10 ** 8}`, // we set the amount to 1 LSK
	fee: `${10 ** 7}`, // we set the fee to 0.1 LSK
 	recipientId: '10881167371402274308L', // recipient address: dummy delegate genesis_100
 	recipientPublicKey: 'addb0e15a44b0fdc6ff291be28d8c98f5551d0cd9218d749e30ddb87c6e31ca9', // public key of the recipient 
 	senderPublicKey: 'c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f', // the senders publickey
 	passphrase: 'wagon stock borrow episode laundry kitten salute link globe zero feed marble', // the senders passphrase, needed to sign the transaction
 	secondPassphrase: null,
 	timestamp: 2,
});

console.log(c); // the transaction is displayed as JSON object in the console
```
> *See the complete file on Github: [hello_world/client/print_sendable_cashback.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/hello_world/client/print_sendable_hello-world.js).*

The generated transaction object should look like this:
```json
{  
   "id":"5372254888441494149",
   "amount":"100000000",
   "type":11,
   "timestamp":3,
   "senderPublicKey":"c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f",
   "senderId":"16313739661670634666L",
   "recipientId":"10881167371402274308L",
   "fee":"10000000",
   "signature":"0a3f41cc529f9de523cadc7db64e9436014d1b10ca2158bbce0469e8e76dfd021358496440da43acaf64d0223d3514609fc1aa41646be56353207d88a03b1305",
   "signatures":[],
   "asset":{}
}
```

Now that we have a sendable transaction object, let's send it to our node and see how it gets processed by analyzing the logs.

For this, we utilize the http API of the node and post the created transaction object to the transaction endpoint of the API.

Because the API of every node is only accessible form localhost by default, you need to execute this query on the same server that your node is running on, unless you changed the config to make your API accessible to others or to the public.

```bash
node print_sendable_cashback.js | curl -X POST -H "Content-Type: application/json" -d @- localhost:4000/api/transactions
```

If the node accepted the transaction, it should respond with `{"meta":{"status":true},"data":{"message":"Transaction(s) accepted"},"links":{}}`.

Look at the logs of your node, to verify that the transaction has been added to the transaction pool:

```
15:12:30.602Z  INFO lisk-framework: Verify->verifyBlock succeeded for block 752004853642534413 at height 1908.
15:12:30.626Z  INFO lisk-framework: Transaction pool - received size: 0 validated size: 0 verified size: 0 pending size: 0 ready size: 0
15:12:30.630Z  INFO lisk-framework: Forged new block id: 752004853642534413 height: 1908 round: 19 slot: 9615675 reward: 0
15:12:33.846Z  INFO lisk-framework: Transaction pool - added transactions to verified queue on action: addTransactions with ID(s): 7885526580000209472
15:12:33.872Z  INFO lisk-framework: Transaction pool - received size: 0 validated size: 0 verified size: 0 pending size: 0 ready size: 1
15:12:38.829Z  INFO lisk-framework: Broadcasts released: 1
15:12:40.647Z  INFO lisk-framework: Broadhash consensus before forging a block: 0 %
15:12:40.662Z  INFO lisk-framework: Verify->verifyBlock succeeded for block 9532247529504404125 at height 1909.
15:12:40.728Z  INFO lisk-framework: Transaction pool - removed transactions on action: removeConfirmedTransactions with ID(s): 7885526580000209472
15:12:40.729Z  INFO lisk-framework: Transaction pool - received size: 0 validated size: 0 verified size: 0 pending size: 0 ready size: 0
15:12:40.737Z  INFO lisk-framework: Forged new block id: 9532247529504404125 height: 1909 round: 19 slot: 9615676 reward: 0
15:12:50.753Z  INFO lisk-framework: Broadhash consensus before forging a block: 0 %
15:12:50.756Z  INFO lisk-framework: Verify->verifyBlock succeeded for block 8025723351893303634 at height 1910.
```

For further interaction with the network, you can run the process in the background by executing:

```bash
npx pm2 start --name cashback index.js # add the application to pm2 under the name 'cashback'
npx pm2 stop cashback # stop the cashback app
npx pm2 start cashback # start the cashback app
```

To verify, that the transaction got included in the blockchain as well, query the database of your node, where the blockchain data is stored:

Check the account balances of sender and recipient, before posting the transaction to the node:
```
psql lisk_dev
lisk_dev=> SELECT address, balance from mem_accounts WHERE address = '16313739661670634666L';
        address        |     balance      
-----------------------+------------------
 16313739661670634666L | 9999999800000000
(1 row)

lisk_dev=> SELECT address, balance from mem_accounts WHERE address = '10881167371402274308L';
        address        |  balance  
-----------------------+-----------
 10881167371402274308L | 101089108
(1 row)
```

After posting the transaction to the node, check if it got included in the blockchain by querying the database:

> Use as id the id of your transaction object, that gets created by the script `print_sendable_cashback.js`

```
SELECT id, "blockId", type, amount, fee, "senderId", "recipientId" from trs WHERE id = '7885526580000209472';
         id          |       blockId       | type |  amount   |   fee    |       senderId        |      recipientId      
---------------------+---------------------+------+-----------+----------+-----------------------+-----------------------
 7885526580000209472 | 9532247529504404125 |   11 | 100000000 | 10000000 | 16313739661670634666L | 10881167371402274308L
```

And compare the account balances of sender and recipient, to verify that the sender account received the cashback and the token were transferred:

```
lisk_dev=> SELECT address, balance from mem_accounts WHERE address = '16313739661670634666L';
        address        |     balance      
-----------------------+------------------
 16313739661670634666L | 9999999700000000

lisk_dev=> SELECT address, balance from mem_accounts WHERE address = '10881167371402274308L';
        address        |  balance  
-----------------------+-----------
 10881167371402274308L | 201089108
```

In this example, the sender gets paid back the transaction fee as cashback:
The sender was sending 1 LSK to the recipient, and paid a transaction fee of 0.1 LSK.
At the same time, the sender gets a cashback of 10% of the transaction amount: 1 LSK * 10% = 0.1 LSK.

## 7. Customize the default configuration

To run the script from remote, change the configuration before creating the `Application` instance, to make the API accessible:

> For more configuration options, check out the [full list of configurations](../../lisk-sdk/configuration.md#list-of-configuration-options) for Lisk SDK

```js
//server/index.js
const { Application, genesisBlockDevnet, configDevnet} = require('lisk-sdk'); // require application class, the default genesis block and the default config for the application
const CashbackTransaction = require('./cashback_transaction'); // require the newly created transaction type 'CashbackTransaction'

let customConfig = configDevnet;
customConfig.modules.http_api.access.public = true; // make the API accessible from everywhere
//customConfig.modules.http_api.access.whitelist.push('1.2.3.4'); // example how to make the API accessible for specific IPs: add the host 1.2.3.4 to the whitelist of hosts

const app = new Application(genesisBlockDevnet, customConfig); // create the application instance

app.registerTransaction(11, CashbackTransaction); // register the 'HelloTransaction' 

// the code block below starts the application and doesn't need to be changed
app
    .run()
    .then(() => app.logger.info('App started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(1);
    });
```
> *See the complete file on Github: [cashback/server/index.js](https://github.com/LiskHQ/lisk-sdk-test-app/tree/development/cashback/server/index.js).*


> __Optional:__ After first successful verification, you may wan to reduce the default console log level (info) and file log level (debug).<br> 
> You can do so, by passing a copy of the config object `configDevnet` with customized config for the logger component:

```js
configDevnet.components.logger.fileLogLevel = "error"; // will only log errors and fatal errors in the log file
configDevnet.components.logger.consoleLogLevel = "none"; // no logs will be shown in console
```

As next step, you can use a wallet software like e.g. a customized [Lisk Hub](https://lisk.io/hub), so that users can utlize the new transaction type.

See also section [Interact with the network](interact-with-network.md).
