# Lisk SDK Configuration

## Pass and modify default values

```js
const app = new Application(genesisBlockDevnet); // uses predefined values, see full list below
const app = new Application(genesisBlockDevnet, configDevnet); // start the node in a fully functional devnet
```
The configuration object `configDevnet` has the same structure like shown in the [list of configuration options](#list-of-configuration-options).
It can be modified accordingly, before passing the config to the `Application` instance:

```js
const { Application, genesisBlockDevnet, configDevnet} = require('lisk-sdk'); // require the lisk-sdk package

let customConfig = configDevnet;
customConfig.components.storage.database = 'my-custom-db' //change the db name to my-custom-db
customConfig.modules.http_api.access.public = true; // make the API accessible from everywhere


const app = new Application(genesisBlockDevnet, customConfig);
```

## List of configuration options

Here is a complete list of all the available configuration options of the Lisk SDK.

The values below are the default values. They will be used automatically when starting the application as described in [start with default values](#start-with-default-values).
To change them, override the specific default values with custom ones, when initializing the application.

```js
const app = new Application(genesisBlockDevnet, {
	app:{
	    ipc: { enabled: false}, // If true, allows modules to communicate over IPCs (inter-process-channels).
	    genesisConfig: { // Network specific constants
	        EPOCH_TIME: new Date(Date.UTC(2016, 4, 24, 17, 0, 0, 0)).toISOString(), // Timestamp indicating the initial network start (`Date.toISOString()`).
	        BLOCK_TIME: 10, // Slot time interval in seconds
	        MAX_TRANSACTIONS_PER_BLOCK: 25, // Maximum number of transactions allowed per block.
	        REWARDS: {
	            MILESTONES: [ // Initial 5 LSK, and decreasing until 1 LSK.
	                '500000000', // Initial Reward
	                '400000000', // Milestone 1
	                '300000000', // Milestone 2
	                '200000000', // Milestone 3
	                '100000000', // Milestone 4
	            ],
	            OFFSET: 2160, // Start rewards at first block of the second round
	            DISTANCE: 3000000, // Distance between each milestone
	        },
	    },
	},
	components: {
	    logger: { // Contains all options for the logger component.
	        fileLogLevel: "debug", // Minimum loglevel, that should be logged in the log file. Available values: trace, debug, log, info(default), warn, error, fatal, none.
	        logFileName: "logs/devnet/lisk.log", // define name and path of the log file. Default: logs/lisk.log
	        consoleLogLevel: "info" // Minimum loglevel, that should be logged in the console, when starting the node. Available values: trace, debug, log, info, warn, error, fatal, none(default).
	    },
	    storage: { // Contains all options for the storage component.
	        database: "lisk_dev", // The name of the database to use.
	        host: "localhost", // The host address of the database.
	        port: 5432, // The port of the database.
	        user: 'lisk', // Name of the database user.
	        password: 'password', // Password of the datbase user.
	        min: 10, // Specifies the minimum amount of database handles.
	        max: 95, // Specifies the maximum amount of database handles.
	        poolIdleTimeout: 30000, // This parameter sets how long to hold connection handles open
	        reapIntervalMillis: 1000, // Closes & removes clients which have been idle > 1 second
	        logEvents: ['error'], // Specify the minimal log level for database logs.
	        logFileName: "logs/lisk_db.log" // Relative path of the database log file.
	    },
	    cache: { // Contains options for the cache component.
	        db: 0, // Set the number of databases for Redis to use. Min: 0 (default), Max: 15
	        enabled: true, // If true, enables cache. Default: false
	        host: "127.0.0.1", // Redis host IP. Default: 127.0.0.1
	        port: 6380 // Redis host port. Default: 6380
	    }
	},
	modules: {
	    http_api: { // List of all available option for the api module.
	        httpPort: 4000, // HTTP port, the node listens on.
	        address: "0.0.0.0", // Address of the API of the node.
	        enabled: true, // Controls the API's availability. If disabled, no API access is possible.
	        trustProxy: false, // For nodes that sit behind a proxy. If true, client IP addresses are understood as the left-most entry in the X-Forwarded-* header.
	        access: { // Contains API access options.
	            public: false, // If true, the API endpoints of the node are available to public.
	            whiteList: ['127.0.0.1'], // This parameter allows connections to the API by IP. Defaults to only allow local host.
	        },
	        ssl: {
	            enabled: false, // Enables SSL for HTTP requests - Default is false.
	            options: {
	                port: 443, // Port to host the Lisk Wallet on, default is 443 but is recommended to use a port above 1024 with iptables.
	                address: '0.0.0.0', // Interface to listen on for the Lisk Wallet.
	                key: './ssl/lisk.key', // Required private key to decrypt and verify the SSL Certificate.
	                cert: './ssl/lisk.crt', // SSL certificate to use with the Lisk Wallet.
	            },
	        },
	        options: {
	            limits: {
	                max: 0, // Maximum of API conncections.
	                delayMs: 0, // Minimum delay between API calls in ms.
	                delayAfter: 0, // Minimum delay after an API call in ms.
	                windowMs: 60000, // Minimum delay between API calls from the same window.
	                headersTimeout: 5000, // Indicating the minimum amount of time an idle connection has to be kept opened (in seconds).
	                serverSetTimeout: 20000, // Time to wait for response from server before timing out.
                },
                cors: {
	                origin: '*', // Defines the domains, that the resource can be accessed by in a cross-site manner. Defaults to all domains.
	                methods: ['GET', 'POST', 'PUT'], // Defines the allowed methods for CORS.
                },
            },
            forging: {
	            access: {
	                whiteList: ['127.0.0.1'], // This parameter allows connections to the Forging API by IP. Defaults to allow only local connections.
                },
            },
        },
        chain: { // List of all available option for the chain module.
            broadcasts: {
                active: true, // If true, enables broadcasts.
                broadcastInterval: 5000, // Specifies how often the node will broadcast transaction bundles.
                broadcastLimit: 25, // How many nodes will be used in a single broadcast.
                parallelLimit: 20, // Specifies how many parallel threads will be used to broadcast transactions.
                releaseLimit: 25, // How many transactions can be included in a single bundle.
                relayLimit: 3, // Specifies how many times a transaction broadcast from the node will be relayed.
            },
            transactions: {
                maxTransactionsPerQueue: 1000, // Sets the maximum size of each transaction queue. Default: 1000
            },
            forging: { // Contains forging options for delegates.
                force: false, // Forces forging to be on, only used on local development networks.
                delegates: [ // List of delegates, who are allowed to forge on this node. To successfully enable forging for a delegate, the publickey and the encrypted passphrase need to be deposited here as JSON object.
                    {
                        encryptedPassphrase: "iterations=1&salt=476d4299531718af8c88156aab0bb7d6&cipherText=663dde611776d87029ec188dc616d96d813ecabcef62ed0ad05ffe30528f5462c8d499db943ba2ded55c3b7c506815d8db1c2d4c35121e1d27e740dc41f6c405ce8ab8e3120b23f546d8b35823a30639&iv=1a83940b72adc57ec060a648&tag=b5b1e6c6e225c428a4473735bc8f1fc9&version=1",
                        publicKey: "9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f"
                    }
                ],
                defaultPassword: "elephant tree paris dragon chair galaxy" // Default password for dummy delegates, only used on local development networks.
            },
            syncing: {
                active: true, // If true, enables syncing (fallback for broadcasts).
            },
            loading: {
                loadPerIteration: 5000, // How many blocks to load from a peer or the database during verification.
                rebuildUpToRound: null, // Integer. If this value is defined, the node will start and rebuild up to the defined round (set to 0 to rebuild until current round). Otherwise, the application continues normal execution.
            },
        },
        network: { // Contains network options for the node.
            wsPort: 5000, // Websocket port of the node.
            address: '0.0.0.0', // Address of the node.
            discoveryInterval: 30000, // Time interval(ms), in that the nodes performs peer discovery.
            seedPeers: [ // List of Seed Peers. On first startup, the node will initially connect to the Seed Peers in order to discover the rest of the network.
                {
                    ip: "1.2.3.4", // IP or address of the Seed Peer.
                    wsPort: 4000 // Port of the Seed Peer.
                }
            ],
            blacklistedPeers: [ // List of peers to exclude from communicating with.
                "9.8.7.6:4000" // IP or address of the blacklisted peer.
            ],
            ackTimeout: 20000, // When a node tries to make an RPC against a peer (and expects a response), this value determines the maximum amount of time (in milliseconds) that the node will wait to receive a response from the peer. If the peer does not respond in time, then the RPC will fail with an error.
            connectTimeout: 5000, // When a node tries to connect to a peer, this value determines the maximum amount of time (in milliseconds) that the node will wait to complete the handshake with the peer. If the peer does not complete the handshake in time, then the connection will be closed.
            wsEngine: 'ws', //  Represents the low-level WebSocket engine which the node should use (for advanced users). Possible values are "ws" (default, recommended) and "uws" (more performant, but not compatible with all systems).
            wsPort: 5000, // Websocket port, the node communicates over.
            list: [ // List of seed nodes, the node will connect to on first startup.
                {
                    ip: "127.0.0.1", // IP of the seed node.
                    wsPort: 5000 // Websocket port of the seed node.
                }
            ]
		}
	}
}); 
```

## Constants

Inside `app.genesisConfig` specific constants for the blockchain application are set.

In the alpha version of the Lisk SDK, not all available constants are configurable by the user.
Only the configurable constants are listed above.
In future versions of the Lisk SDK, more constants will become configurable.

To see a full list of all constants and their predefined values, check out [Lisk SDK on Github](https://github.com/LiskHQ/lisk-sdk/blob/development/framework/src/controller/schema/constants_schema.js).

# The Genesis block

The genesis block describes the very first block in the blockchain.
It defines the initial state of the blockchain on start of the network.

The genesis block is not forged by a delegate, like all other blocks, which come after the genesis block.
Instead, it is defined by the blockchain application developer, when creating the `Application` instance of the blockchain app (see section [start with default values](#start-with-default-values)).

> Go to Github, to see the full file [genesis_block_devnet.json](https://github.com/LiskHQ/lisk-sdk/blob/development/sdk/src/samples/genesis_block_devnet.json)

A genesis block generator to create genesis blocks conveniently will be included in the Lisk SDK eventually. For Lisk Alpha SDK, you can use the exposed `genesisBlockDevnet` as a template, and customize it to your needs.

It's possible and recommended to customize the genesis block to suit the use case of your blockchain application. The following template describes all available options for the genesis block.

```js
{
	"version": 0, // block version
	"totalAmount": "10000000000000000", // the total amount of tokens that are transferred in this block
	"totalFee": "0", // the total amount of fees associated with the block
	"reward": "0", // reward for forging the block
	"payloadHash": "198f2b61a8eb95fbeed58b8216780b68f697f26b849acf00c8c93bb9b24f783d", // hashes of the combined transactional data blocks
	"timestamp": 0, // epoch timestamp of when the block was created
	"numberOfTransactions": 103, // number of transactions processed in the block
	"payloadLength": 19619, // sum of data blocks of all transaction in this block in bytes
	"previousBlock": null, // null, because the genesis block has no previous block by definition
	"generatorPublicKey": "c96dec3595ff6041c3bd28b76b8cf75dce8225173d1bd00241624ee89b50f2a8", // public key of the delegate who forged the block
	"transactions": [], // list of transactions in the genesis block
	"height": 1, // current height of the blockchain, always equals 1 for the genesis block
	"blockSignature": "c81204bf67474827fd98584e7787084957f42ce8041e713843dd2bb352b73e81143f68bd74b06da8372c43f5e26406c4e7250bbd790396d85dea50d448d62606", // signature of the block, signed by the delegate
	"id": "6524861224470851795" // block id
}
```
