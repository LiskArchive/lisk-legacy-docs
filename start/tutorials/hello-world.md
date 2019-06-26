# Hello World App

Welcome to the step-by-step guide of creating the Hello World application with Lisk Alpha SDK.
A simple App, showcasing a minimal setup of a blockchain application with 1 [custom transaction](../custom-transactions.md) type: the "Hello" transaction.

The purpose of Hello World application is to explain how to use and how to implement custom transaction with the Lisk SDK. 
This custom transaction will extract the "hello" key value from the transaction asset property and save to the senders account.

The Hello World implementation goes as following:

- __Steps 1-5__ describe what needs to be implemented on the node-side of the blockchain application.
- __Step 6__ explains how to interact with the network from the client-side.
- __Step 7__ explains how to override specific config values.

> Check out the __full code example__ for the [Hello World App on Github](https://github.com/LiskHQ/lisk-sdk-examples/tree/development/hello_world).

## 1. Set up the project

First, let's create the root folder for the Hello World App and initialize the project:

```bash
mkdir hello_world # create the root folder for the blockchain application
cd hello_world # navigate into the root folder
npm init --yes # initialize the manifest file of the project
```

As next step, we want to install the `lisk-sdk` package and add it to our projects' dependencies.

> Before installing the Lisk SDK, make sure to follow the instructions in the [Lisk SDK - Pre-Install](../../lisk-sdk/introduction.md#pre-installation) section.

```bash
npm install --save lisk-sdk@alpha # install lisk-sdk as dependency for the node server side
npm install --save @liskhq/validator @liskhq/cryptography # install lisk-elements dependencies for the client side scripts
```

Create the file `index.js`, which will hold the logic to initialize and start the blockchain application.

```bash
dropdb lisk_dev && createdb lisk_dev # start with a fresh database
touch index.js # create the index file
```

## 2. Configure the application

Next, let's configure the application, to provide basic information about the app we are going to build:

```js
//index.js
const { Application, genesisBlockDevnet, configDevnet } = require('lisk-sdk'); // require application class, the default genesis block and the default config for the application

configDevnet.app.label = 'helloWorld-blockchain-application';

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

> *See the complete file on Github: [hello_world/index.js](https://github.com/LiskHQ/lisk-sdk-examples/tree/development/hello_world/index.js).*

In the `line 2`, we require the needed dependencies from the `lisk-sdk` package.
The most important one is the `Application` class, which is used in `line 4` to create the application instance.
The application instance will start the whole application at the bottom of `index.js`.

In `line 4` , the application instance gets initialized.
By passing the parameters for the [genesis block](../../lisk-sdk/configuration.md#the-genesis-block) and the [configuration template](https://github.com/LiskHQ/lisk-sdk/blob/development/sdk/src/samples/config_devnet.json), the application is configured with most basic configurations to start the node.

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
14:01:39.391Z  INFO lisk-framework: Starting the app - helloWorld-blockchain-application
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

For the Hello World App, we want to create a [custom transaction type](../custom-transactions.md) `HelloTransaction`: 
If an account has enough balance to process `HelloTransaction` transaction (fee is set to 1 LSK by default), the new "hello" property appears into this account's asset field.
So after sending a valid `{"type": 10, "senderId": "16313739661670634666L", ... "asset": { "hello": "world" } }` transaction, the sender's account changes from e.g.: `{ address: "16313739661670634666L", ..., asset: null }`, to `{ "address": "16313739661670634666L", ..., "asset": {"hello": "world"}} }`.

Now, let's create a new file `hello_transaction.js`, which is defining the new transaction type `HelloTransaction`:

```bash
touch hello_transaction.js
```

```js
//hello_transaction.js
const {
	BaseTransaction,
	TransactionError,
} = require('lisk-sdk');

class HelloTransaction extends BaseTransaction {

    /**
    * Set the `HelloTransaction` transaction TYPE to `10`.
    * Every time a transaction is received, it gets differentiated by the type.
    * The first 10 types, from 0-9 is reserved for the default Lisk Network functions. 
    */
	static get TYPE () {
		return 10;
	}
	
    /**
    * Prepares the necessary data for the `apply` and `undo` step.
    * The "hello" property will be added only to sender's account, therefore it's the only resource needed in the `applyAsset` and `undoAsset` steps. 
    */
    async prepare(store) {
        await store.account.cache([
            {
                address: this.senderId,
            },
        ]);
    }
    	
    /**
    * Validation of the value of the "hello" property, defined by the `HelloTransaction` transaction signer.
    * The implementation below checks, that the value of the "hello" property needs to be a string, no longer than 64 characters. 
    */
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
    
    /**
    * applyAsset is where the custom logic of the Hello World app is implemented. 
    * applyAsset() and undoAsset() use the information about the sender's account from the `store`.
    * Here we can store additional information about accounts using the `asset` field. The content of property of "hello" transaction's asset gets saved into the "hello" property of the account's asset.
    */
	applyAsset(store) {
        const errors = [];
        const sender = store.account.get(this.senderId);
        const newObj = { ...sender, asset: { hello: this.asset.hello } };
        store.account.set(sender.address, newObj);
        if (sender.asset && sender.asset.hello) {
            errors.push(
                new TransactionError(
                    'You cannot send a hello transaction multiple times',
                    this.id,
                    '.asset.hello',
                    this.amount.toString()
                )
            );
        } else {
            const newObj = { ...sender, asset: { hello: this.asset.hello } };
            store.account.set(sender.address, newObj);
        }
        return errors; // array of TransactionErrors, returns empty array if no errors are thrown
	}

    /**
    * Inverse of `applyAsset`.
    * Undoes the changes made in applyAsset() step - reverts to the previous value of "hello" property, if not previously set this will be null.
    */
	undoAsset(store) {
		const sender = store.account.get(this.senderId);
		const oldObj = { ...sender, asset: null };
		store.account.set(sender.address, oldObj);
		return [];
	}

}

module.exports = HelloTransaction;
``` 

> *See the file on Github: [hello_world/hello_transaction.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/hello_world/hello_transaction.js)*

## 4. Register the new transaction type

Right now, your project should have the following file structure:

```
hello_world
├── hello_transaction.js
├── index.js
├── node_modules
└── package.json
```

Add the new transaction type to your application, by registering it to the application instance:

```js
//index.js
const { Application, genesisBlockDevnet, configDevnet} = require('lisk-sdk'); // require application class, the default genesis block and the default config for the application
const HelloTransaction = require('./hello_transaction'); // require the newly created transaction type 'HelloTransaction'

configDevnet.app.label = 'helloWorld-blockchain-application';

const app = new Application(genesisBlockDevnet, configDevnet); // create the application instance

app.registerTransaction(HelloTransaction.TYPE, HelloTransaction); // register the 'HelloTransaction' 


// the code block below starts the application and doesn't need to be changed
app
    .run()
    .then(() => app.logger.info('App started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(1);
    });
```
> *See the file on Github: [hello_world/index.js](https://github.com/LiskHQ/lisk-sdk-examples/tree/development/hello_world/index.js).*

## 5. Start the network

Now, let's start our customized blockchain network for the first time.

The parameter `configDevnet`, which we pass to our `Application` instance in [step 3](#3-create-a-new-transaction-type), is preconfigured to start the node with a set of dummy delegates, that have enabled forging by default.
These dummy delegates stabilize the new network and make it possible to test out the basic functionality of the network with only one node immediately.

This creates a simple Devnet, which is beneficial during development of the blockchain application.
The dummy delegates can be replaced by real delegates later on.

To start the network, execute the following command:

```bash
node index.js | npx bunyan -o short
```

Check the logs, to verify the network has started successfully.

If something went wrong, the process should stop and an error with debug information is displayed.

## 6. Interact with the network

Now that the network is started, let's try to send a `HelloTransaction` to our node to see if it gets accepted.

As first step, create the transaction object.

First, we create a script [createSendableTransaction](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/hello_world/client/create_sendable_transaction_base_trs.js).

```bash
mkdir client # create the folder for the client-side scripts
cd client # navigate into the client folder
touch create_sendable_transaction_base_trs.js
```

The purpose of this script is to offer a function `createSendableTransaction(Transaction, inputs)` that accepts two parameters: 1) `Transaction`: the *transaction type* and 2) `inputs`: the *corresponding transaction object*.

To view a full code example of this file, please click on the link above.
We present the most important parts of the script below:

> Go to Github to see the complete code of [create_sendable_transaction_base_trs.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/hello_world/client/create_sendable_transaction_base_trs.js)

```js
//client/create_sendable_transaction_base_trs.js
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
    
    // the signed transaction object is returned in JSON format
    return asJSON(skipUndefined(transaction.toJSON()));
}
```
> *See the complete file on Github: [hello_world/client/create_sendable_transaction_base_trs.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/hello_world/client/create_sendable_transaction_base_trs.js).*

The second script simply will print a sendable `HelloTransaction` when executed.

```bash
touch print_sendable_hello-world.js
```

Therefore, it will make use of the function `createSendableTransaction()`, which we have created above:

```js
//client/print_sendable_hello-world.js
const createSendableTransaction = require('./create_sendable_transaction_base_trs');
const HelloTransaction = require('../hello_transaction');

const getTimestamp = () => {
	const epochTime = "2016-05-24T17:00:00.000Z" //default epoch time
	// check config file or curl localhost:4000/api/node/constants to verify your epoc time
	const millisSinceEpoc = Date.now() - Date.parse(epochTime); 
	const inSeconds = ((millisSinceEpoc) / 1000).toFixed(0);
	return  parseInt(inSeconds);
}

let h = createSendableTransaction(HelloTransaction, { // the desired transaction gets created and signed
	type: 10, // we want to send a transaction type 10 (= HelloTransaction)
	asset: {
		hello: 'world', // we save the string 'world' into the 'hello' asset
	},
	fee: `${10 ** 8}`, // we set the fee to 1 LSK
	recipientId: '10881167371402274308L', // address of dummy delegate genesis_100
	senderPublicKey: 'c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f', // the senders publicKey
	passphrase: 'wagon stock borrow episode laundry kitten salute link globe zero feed marble', // the senders passphrase, needed to sign the transaction
	timestamp: getTimestamp(),
});

console.log(h); // the transaction is displayed as JSON object in the console
process.exit(1); // stops the process after the transaction object has been printed
```
> *See the complete file on Github: [hello_world/client/print_sendable_hello-world.js](https://github.com/LiskHQ/lisk-sdk-examples/blob/development/hello_world/client/print_sendable_hello-world.js).*

This script will print the transaction in the console, when executed:

```bash
node print_sendable_hello-world.js
```

The generated transaction object should look like this:
```json
{  
   "id":"1199714748623931346",
   "amount":"0",
   "type":10,
   "timestamp":0,
   "senderPublicKey":"c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f",
   "senderId":"16313739661670634666L",
   "recipientId":"10881167371402274308L",
   "fee":"100000000",
   "signature":"e6da5923ee9b769bd5624612af536ca4348d5b32c4552a05161a356e472b8708487022fd4e9787a1b7e548a98c64341f52f2b8b12a39d4115f820b8f01064003",
   "signatures":[],
   "asset":{  
      "hello":"world"
   }
}
```

Now that we have a sendable transaction object, let's send it to our node and see how it gets processed by analyzing the logs.

For this, we utilize the API of the node and post the created transaction object to the transaction endpoint of the API.

Because the API of every node is only accessible from localhost by default, you need to execute this query on the same server that your node is running on, unless you changed the config to [make your API accessible](#7-customize-the-default-configuration) to others or to the public.

> Make sure your node is running, before sending the transaction

```bash
node print_sendable_hello-world.js | curl -X POST -H "Content-Type: application/json" -d @- localhost:4000/api/transactions
```

If the node accepted the transaction, it should respond with: 
```
{"meta":{"status":true},"data":{"message":"Transaction(s) accepted"},"links":{}}
```

To verify, that the transaction got included in the blockchain as well, query the database of your node, where the blockchain data is stored:

> Use as id the id of your transaction object, that gets created by the script `print_sendable_hello-world.js`

```
psql lisk_dev
lisk_dev=> SELECT id, "blockId", type, asset, "senderId" from trs WHERE id = '1199714748623931346';
         id          |       blockId       | type |       asset        |       senderId        
---------------------+---------------------+------+--------------------+-----------------------
 1199714748623931346 | 7665982141323077011 |   10 | {"hello": "world"} | 16313739661670634666L
```

```
lisk_dev=> SELECT address, "publicKey", asset from mem_accounts WHERE address = '16313739661670634666L';
        address        |                             publicKey                              |       asset        
-----------------------+--------------------------------------------------------------------+--------------------
 16313739661670634666L | \xc094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f | {"hello": "world"}
```

For further interaction with the network, it is possible to run the process in the background by executing:

```bash
npx pm2 start --name hello index.js # add the application to pm2 under the name 'hello'
npx pm2 stop hello # stop the hello app
npx pm2 start hello # start the hello app
```

## 7. Customize the default configuration

Your project should have now the following file structure:

```
hello_world
├── client
│   ├── create_sendable_transaction_base_trs.js
│   └── print_sendable_hello-world.js
├── hello_transaction.js
├── index.js
├── node_modules
└── package.json
```

To run the script from remote, change the configuration before creating the `Application` instance, to make the API accessible:

> For more configuration options, check out the [full list of configurations](../../lisk-sdk/configuration.md#list-of-configuration-options) for Lisk SDK

```js
//index.js
const { Application, genesisBlockDevnet, configDevnet} = require('lisk-sdk'); // require application class, the default genesis block and the default config for the application
const HelloTransaction = require('./hello_transaction'); // require the newly created transaction type 'HelloTransaction'

configDevnet.app.label = 'helloWorld-blockchain-application';
configDevnet.modules.http_api.access.public = true; // make the API accessible from everywhere
//configDevnet.modules.http_api.access.whitelist.push('1.2.3.4'); // example how to make the API accessible for specific IPs: add the host 1.2.3.4 to the whitelist of hosts

const app = new Application(genesisBlockDevnet, configDevnet); // create the application instance

app.registerTransaction(HelloTransaction.TYPE, HelloTransaction); // register the 'HelloTransaction' 

// the code block below starts the application and doesn't need to be changed
app
    .run()
    .then(() => app.logger.info('App started...'))
    .catch(error => {
        console.error('Faced error in application', error);
        process.exit(1);
    });
```
> *See the complete file on Github: [hello_world/index.js](https://github.com/LiskHQ/lisk-sdk-examples/tree/development/hello_world/index.js).*


> __Optional:__ After first successful verification, you may want to reduce the default console log level (info) and file log level (debug).<br> 
> You can do so, by passing a copy of the config object `configDevnet` with customized config for the logger component:

```js
configDevnet.components.logger.fileLogLevel = "error"; // will only log errors and fatal errors in the log file
configDevnet.components.logger.consoleLogLevel = "none"; // no logs will be shown in console
```

As next step, you can design a nice frontend application like [Lisk Explorer](https://explorer.lisk.io/), which is showing users assets data inside of their account page. 

See also section [Interact with the network](../interact-with-network.md).
