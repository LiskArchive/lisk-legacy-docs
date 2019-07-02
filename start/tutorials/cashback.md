# Cashback App

A simple application which rewards its users for sending tokens. 
The cashback reward tokens are minted newly and increase the absolute amount of tokens in the network.

The Cashback App implementation goes as following:

- __Steps 1-5__ describe the node-side implementation of the blockchain application.
- __Step 6__  shows how to interact with the network from the (blockchain) client-side using a node script.
- __Step 7__ explains how to override specific config values.

> Check out the __full code example__ of the [Cashback App on Github](https://github.com/LiskHQ/lisk-sdk-examples/tree/development/cashback).

## 1. Set up Lisk SDK

First, let's create the root folder for the Cashback App and initialize the project:

```bash
mkdir cashback # create the root folder for the blockchain application
cd cashback # navigate into the root folder
```

As next step, we want to install the `lisk-sdk` package and add it to our projects' dependencies.

### Supported Platforms

- Ubuntu 16.04 (LTS) x86_64
- Ubuntu 18.04 (LTS) x86_64
- MacOS 10.13 (High Sierra)
- MacOS 10.14 (Mojave)

### Dependencies

| Dependencies     | Version |
| ---------------- | ------- |
| Node.js          | 10.15.3 |
| PostgreSQL       | 10+     |
| Redis (optional) | 5+      |
| Python           | 2       |


> If you miss some of the dependencies, please go to [Lisk SDK - Pre-Install](../../lisk-sdk/introduction.md#pre-installation) and follow the pre-installation steps for the SDK.

```bash
npm init --yes # initialize the manifest file of the project
npm install --save lisk-sdk@alpha # install lisk-sdk as dependency for the node server side
npm install --save @liskhq/validator @liskhq/cryptography # install lisk-elements dependencies for the client side scripts
```

Make sure to start with a fresh database:
```sh-session
psql
> DROP DATABASE lisk_dev;
> CREATE DATABASE lisk_dev OWNER lisk;
> \q
```

Create the file `index.js`, which will hold the logic to initialize and start the blockchain application.

```bash
touch index.js # create the index file
```

## 2. Configure the application

Next, let's configure the application, to provide basic information about the application we are going to build:

```js
//index.js
const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk'); // require application class, the default genesis block and the default config for the application

configDevnet.app.label = 'cashback-blockchain-application';

const app = new Application(genesisBlockDevnet, configDevnet); // create the application instance

// the code block below starts the application and doesn't need to be changed
app
    .run()
    .then(() => app.logger.info('App started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(1);
    });        
```
> *See the complete file on Github: [cashback/index.js](https://github.com/LiskHQ/lisk-sdk-examples/tree/development/cashback/index.js).*

On `line 2` we require the needed dependencies from the `lisk-sdk` package.
The most important one is the `Application` class, which is used in `line 6` to create the application instance.
The application instance is used to start the blockchain application at the bottom of `index.js`.

On `line 6`  the application instance gets initialized.
By passing the parameters for the [genesis block](../../lisk-sdk/configuration.md#the-genesis-block) and the [configuration template](https://github.com/LiskHQ/lisk-sdk/blob/development/sdk/src/samples/config_devnet.json), the application is configured with the most basic configurations to start the node.

> If you want to change any of the values for `configDevnet`, check out the [full list of configurations](../../lisk-sdk/configuration.md#list-of-configuration-options) for Lisk SDK and overwrite them like described in [step 7](#7-customize-the-default-configuration)

At this point, you already can start the node and the network, to verify that the setup was successful:

```bash
node index.js | npx bunyan -o short
```
`node index.js` will start the node, and `| npx bunyan -o short` will pretty-print the logs in the console.

If everything is ok, the following logs will be displayed:
```
$ node index.js | npx bunyan -o short
14:01:39.384Z  INFO lisk-framework: Booting the application with Lisk Framework(0.1.0)
14:01:39.391Z  INFO lisk-framework: Starting the app - cashback-blockchain-application
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

## 3. Create a new transaction type

Now, we want to create a new [custom transaction type](../custom-transactions.md) `CashbackTransaction`: 
It extends the pre-existing transaction type `TransferTransaction`.
The difference between the regular `TransferTransaction` and the `CashbackTransaction`, is that Cashback transaction type also pays out a 10% bonus reward to its sender.

So e.g. if Alice sends 100 token to Bob as a Cashback transaction, Bob would receive the 100 token and Alice would receive additional 10 tokens as a cashback.

![Business logic of a cashback transaction](../assets/cashback_diagram.png)

> If you compare the methods below with the methods we implemented in the `HelloTransaction`, you will notice, that we implement fewer methods for the `CashbackTransaction`.
> This is because we extend the `CashbackTransaction` from an already existing transaction type `TransferTransaction`.
> As a result, all required methods are implemented already inside the `TransferTransaction` class, and we only need to overwrite/extend explicitely the methods we want to customize.

Now, let's create a new file `cashback_transaction.js` which is defines the new transaction type `CashbackTransaction`:

```bash
touch cashback_transaction.js
```

```js
//cashback_transaction.js
const {
	TransferTransaction,
	BigNum,
} = require('lisk-sdk');


class CashbackTransaction extends TransferTransaction {

    /**
    * Set the Cashback transaction TYPE to `11`.
    * The first 10 types, from `0-9` is reserved for the default Lisk Network functions.
    * Type `10` was used previously for the `HelloTransaction`, so we set it to `11`, but any other integer value (that is not already used by another transaction type) is a valid value.
    */
	static get TYPE () {
		return 11;
	}

    /**
    * The CashbackTransaction adds an inflationary 10% to senders account.
    * Invoked as part of the apply() step of the BaseTransaction and block processing.  
    */
	applyAsset(store) {
		super.applyAsset(store);

		const sender = store.account.get(this.senderId);
		const updatedSenderBalanceAfterBonus = new BigNum(sender.balance).add(
			new BigNum(this.amount).div(10)
		);
		const updatedSender = {
			...sender,
			balance: updatedSenderBalanceAfterBonus.toString(),
		};
		store.account.set(sender.address, updatedSender);

		return [];
	}

    /**
    * Inverse of applyAsset().
    * Undoes the changes made in `applyAsset` step: It sends the transaction amount back to the sender and substracts 10% of the transaction amount from the senders account balance.
    */
	undoAsset(store) {
		super.undoAsset(store);

		const sender = store.account.get(this.senderId);
		const updatedSenderBalanceAfterBonus = new BigNum(sender.balance).sub(
			new BigNum(this.amount).div(10)
		);
		const updatedSender = {
			...sender,
			balance: updatedSenderBalanceAfterBonus.toString(),
		};
		store.account.set(sender.address, updatedSender);

		return [];
	}
}

module.exports = CashbackTransaction;
``` 
> *See the file on Github: [cashback/cashback_transaction.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/cashback/cashback_transaction.js)*

## 4. Register the new transaction type

Right now, your project should have the following file structure:

```
cashback
├── cashback_transaction.js
├── index.js
├── node_modules
└──package.json
```

Add the new transaction type to your application, by registering it to the application instance:

```js
//index.js
const { Application, genesisBlockDevnet, configDevnet} = require('lisk-sdk'); // require application class, the default genesis block and the default config for the application
const CashbackTransaction = require('./cashback_transaction'); // require the newly created transaction type 'CashbackTransaction'

configDevnet.app.label = 'cashback-blockchain-application';

const app = new Application(genesisBlockDevnet, configDevnet); // create the application instance

app.registerTransaction(CashbackTransaction.TYPE, CashbackTransaction); // register the 'CashbackTransaction' 


// the code block below starts the application and doesn't need to be changed
app
    .run()
    .then(() => app.logger.info('App started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(1);
    });
```
> *See the file on Github: [cashback/index.js](https://github.com/LiskHQ/lisk-sdk-examples/tree/development/cashback/index.js).*

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

Check the logs to verify the network has started successfully.

If an error occurs the process should stop, and the error with debug information will be displayed.

## 6. Interact with the network

Now that your network is running, let's try to send a `CashbackTransaction` to our node to see if it gets accepted.

As first step, create the transaction object.

First, let's reuse the script [create_sendable_transaction_base_trs.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/hello_world/client/create_sendable_transaction_base_trs.js) which we already described in [step 6 of Hello World app](hello-world.md#6-interact-with-the-network).

We can call `createSendableTransaction()` to print a sendable `CashbackTransaction` object:

```bash
mkdir client # create the folder for the client-side scripts
cd client # navigate into the client folder
touch print_sendable_cashback.js
```

```js
//client/print_sendable_cashback.js
const createSendableTransaction = require('./create_sendable_transaction_base_trs');
const CashbackTransaction = require('../cashback_transaction');


const getTimestamp = () => {
	const epochTime = "2016-05-24T17:00:00.000Z" //default epoch time
	// check config file or curl localhost:4000/api/node/constants to verify your epoc time
	const millisSinceEpoc = Date.now() - Date.parse(epochTime); 
	const inSeconds = ((millisSinceEpoc) / 1000).toFixed(0);
	return  parseInt(inSeconds);
}

let c = createSendableTransaction(CashbackTransaction, { // the desired transaction gets created and signed
	type: 11, // we want to send a transaction type 11 (= CashbackTransaction)
	data: null,
	amount: `${2 * (10 ** 8)}`, // we set the amount to 2 LSK
	fee: `${10 ** 7}`, // we set the fee to 0.1 LSK
 	recipientId: '10881167371402274308L', // recipient address: dummy delegate genesis_100
 	recipientPublicKey: 'addb0e15a44b0fdc6ff291be28d8c98f5551d0cd9218d749e30ddb87c6e31ca9', // public key of the recipient 
 	senderPublicKey: 'c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f', // the senders publickey
 	passphrase: 'wagon stock borrow episode laundry kitten salute link globe zero feed marble', // the senders passphrase, needed to sign the transaction
 	secondPassphrase: null,
 	timestamp: getTimestamp(),
});

console.log(c); // the transaction is displayed as JSON object in the console
process.exit(1); // stops the process after the transaction object has been printed
```
> *See the complete file on Github: [cashback/client/print_sendable_cashback.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/cashback/client/print_sendable_cashback.js).*

This script will print the transaction in the console, when executed:

```bash
node print_sendable_cashback.js
```

The generated transaction object should look like this:
```json
{  
   "id":"5372254888441494149",
   "amount":"200000000",
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

For this, we utilize the HTTP API of the node and post the created transaction object to the transaction endpoint of the API.

Before posting the transaction, let's check the balances of sender and recipient, to verify later that the transaction was applied correctly:

> Make sure your node is running, before sending API requests to it.

To check the account balance of the sender:
```bash
curl -X GET "http://localhost:4000/api/accounts?address=16313739661670634666L" -H "accept: application/json"
```
```json
{
  "meta": {
    "offset": 0,
    "limit": 10
  },
  "data": [
    {
      "address": "16313739661670634666L",
      "publicKey": "c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f",
      "balance": "10000000000000000",
      "secondPublicKey": ""
    }
  ],
  "links": {}
}
```

Checking the account balance of the recipient:
```bash
curl -X GET "http://localhost:4000/api/accounts?address=10881167371402274308L" -H "accept: application/json"
```
```json
{
  "meta": {
    "offset": 0,
    "limit": 10
  },
  "data": [
    {
      "address": "10881167371402274308L",
      "publicKey": "addb0e15a44b0fdc6ff291be28d8c98f5551d0cd9218d749e30ddb87c6e31ca9",
      "balance": "0",
      "secondPublicKey": "",
      "delegate": {
        "username": "genesis_100",
        "vote": "9999999680000000",
        "rewards": "1500000000",
        "producedBlocks": 26,
        "missedBlocks": 0,
        "rank": 70,
        "productivity": 100,
        "approval": 100
      }
    }
  ],
  "links": {}
}
```

Because the API of every node is only accessible from localhost by default, you need to execute this query on the same server that your node is running on, unless you changed the config to [make your API accessible](#7-customize-the-default-configuration) to others or to the public.

> Make sure your node is running, before sending the transaction

```bash
node print_sendable_cashback.js | tee >(curl -X POST -H "Content-Type: application/json" -d @- localhost:4000/api/transactions) # displays a raw transaction on the console
```

If the node accepted the transaction, it should respond with: 
```
{"meta":{"status":true},"data":{"message":"Transaction(s) accepted"},"links":{}}
```

To verify that the transaction was included in a block:

```bash
curl -X GET "http://localhost:4000/api/transactions?id=5372254888441494149" -H "accept: application/json"
```

```json
{
  "meta": {
    "offset": 0,
    "limit": 10,
    "count": 1
  },
  "data": [
    {
      "id": "5372254888441494149",
      "height": 2048,
      "blockId": "12427514488773581697",
      "type": 11,
      "timestamp": 3,
      "senderPublicKey": "c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f",
      "recipientPublicKey": "addb0e15a44b0fdc6ff291be28d8c98f5551d0cd9218d749e30ddb87c6e31ca9",
      "senderId": "16313739661670634666L",
      "recipientId": "10881167371402274308L",
      "amount": "100000000",
      "fee": "10000000",
      "signature": "0a3f41cc529f9de523cadc7db64e9436014d1b10ca2158bbce0469e8e76dfd021358496440da43acaf64d0223d3514609fc1aa41646be56353207d88a03b1305",
      "signatures": [],
      "asset": {},
      "confirmations": 5
    }
  ],
  "links": {}
}
```

In this example, the sender was sending 2 LSK to the recipient, and paid a transaction fee of 0.1 LSK.
At the same time, the sender gets a cashback of 10% of the transaction amount: 2 LSK * 10% = 0.2 LSK.

__As a result, the recipient should get a credit of 2 LSK, and the sender s' balance should be reduced by 1.9 LSK (-2 LSK, plus a credit of 0.1 LSK \[= 0.2 LSK (cashback) - 0.1 LSK (tx fee)]).__

> Note, that the balance of an account is stored in Beddows. 1 LSK = 100000000(= 10^8) Beddows.

Verify, that the sender account balance is reduced by 1.9 LSK:
```bash
curl -X GET "http://localhost:4000/api/accounts?address=16313739661670634666L" -H "accept: application/json"
```
```json
{
  "meta": {
    "offset": 0,
    "limit": 10
  },
  "data": [
    {
      "address": "16313739661670634666L",
      "publicKey": "c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f",
      "balance": "9999999810000000",
      "secondPublicKey": ""
    }
  ],
  "links": {}
}
```

Verify, that the recipient account got the credit of 2 LSK:
```bash
curl -X GET "http://localhost:4000/api/accounts?address=10881167371402274308L" -H "accept: application/json"
```
```json
{
  "meta": {
    "offset": 0,
    "limit": 10
  },
  "data": [
    {
      "address": "10881167371402274308L",
      "publicKey": "addb0e15a44b0fdc6ff291be28d8c98f5551d0cd9218d749e30ddb87c6e31ca9",
      "balance": "200000000",
      "secondPublicKey": "",
      "delegate": {
        "username": "genesis_100",
        "vote": "9999999680000000",
        "rewards": "1500000000",
        "producedBlocks": 26,
        "missedBlocks": 0,
        "rank": 70,
        "productivity": 100,
        "approval": 100
      }
    }
  ],
  "links": {}
}
```

If the balances equal the expected values, it is verified the new custom transaction type `CashbackTransaction` is successfully integrated into the application.

For further interaction with the network, it is possible to run the process in the background by executing:

```bash
pm2 start --name cashback index.js # add the application to pm2 under the name 'cashback'
pm2 stop cashback # stop the cashback app
pm2 start cashback # start the cashback app
```

> PM2 needs to be installed on the system in order to run these commands. See [SDK Pre-Install section](../../lisk-sdk/introduction.md#pre-installation).

## 7. Customize the default configuration

Your project should have now the following file structure:

```
cashback
├── client
│   ├── create_sendable_transaction_base_trs.js
│   └── print_sendable_cashback.js
├── cashback_transaction.js
├── index.js
├── node_modules
└── package.json
```

To run the script from remote, change the configuration before creating the `Application` instance, to make the API accessible:

> For more configuration options, check out the [full list of configurations](../../lisk-sdk/configuration.md#list-of-configuration-options) for Lisk SDK

```js
//index.js
const { Application, genesisBlockDevnet, configDevnet} = require('lisk-sdk'); // require application class, the default genesis block and the default config for the application
const CashbackTransaction = require('./cashback_transaction'); // require the newly created transaction type 'CashbackTransaction'

configDevnet.app.label = 'cashback-blockchain-application';
configDevnet.modules.http_api.access.public = true; // make the API accessible from everywhere
//customConfig.modules.http_api.access.whitelist.push('1.2.3.4'); // example how to make the API accessible for specific IPs: add the host 1.2.3.4 to the whitelist of hosts

const app = new Application(genesisBlockDevnet, configDevnet); // create the application instance

app.registerTransaction(CashbackTransaction.TYPE, CashbackTransaction); // register the 'CashbackTransaction' 

// the code block below starts the application and doesn't need to be changed
app
    .run()
    .then(() => app.logger.info('App started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(1);
    });
```
> *See the complete file on Github: [cashback/index.js](https://github.com/LiskHQ/lisk-sdk-examples/tree/development/cashback/index.js).*

> __Optional:__ After first successful verification, you may wan to reduce the default console log level (info) and file log level (debug).<br> 
> You can do so, by passing a copy of the config object `configDevnet` with customized config for the logger component:

```js
configDevnet.components.logger.fileLogLevel = "error"; // will only log errors and fatal errors in the log file
configDevnet.components.logger.consoleLogLevel = "none"; // no logs will be shown in console
```

As next step, you can use a wallet software like e.g. a customized [Lisk Hub](https://lisk.io/hub), so that users can utlize the new transaction type.

See also section [Interact with the network](../interact-with-network.md).
