# Lisk Core Configuration

- [Structure](#structure)
- [API access control](#api-access-control)
- [Forging](#forging)
  - [Check forging](#check-forging)
  - [Enable/Disable forging](#enable-disable-forging)
- [SSL](#ssl)
- [Logging](#logging)

## Structure

The root folder for all configurations is `config/`.
The **default** network is `devnet`. If you want to connect to another network, specify the `network` when starting Lisk Core, as described in [Source Administration](administration/source.md#command-line-options).
You can find **network specific configurations** under `config/<network>/config.json`, where `<network>` can be any of these values:

   - `devnet`
   - `alphanet`
   - `betanet`
   - `testnet`
   - `mainnet`
   
> Don't override any value in files mentioned above if you need custom configuration. The changes will be overwritten everytime you upgrade Lisk Core.
> To use a custom configuration use environment variables or create your own `.json` file and pass it as [command line option](administration/source.md#command-line-options)
   
Configurations will be loaded in the following order, each one will override the previous one:
   1. Default configuration values of modules and components of the [Lisk Framework](https://github.com/LiskHQ/lisk-sdk/tree/development/framework)
   2. Network specific configuration file
   3. A [custom configuration file](administration/source.md#command-line-options) (if specified by the user)
   4. [Command line configurations](administration/source.md#command-line-options), specified as command-line flags or `ENV` variables.

For development purposes, use `devnet` as the network option. Other networks are specific to public Lisk networks.

The `config.json` file and a description of each parameter.

```js
{
    "app": { // Contains general application configurations.
        "genesisConfig": {
            "BLOCK_TIME": 10, // Slot time interval in seconds
            "EPOCH_TIME": "2016-05-24T17:00:00.000Z", // Timestamp indicating the initial network start (`Date.toISOString()`).
            "MAX_TRANSACTIONS_PER_BLOCK": 25, // Maximum number of transactions allowed per block.
            "REWARDS": {
                "DISTANCE": 1000, // Distance between each milestone.
                "MILESTONES": [ // Initial 5, and decreasing until 1.
                    "500000000", // Initial Reward
                    "400000000", // Milestone 1
                    "300000000", // Milestone 2
                    "200000000", // Milestone 3
                    "100000000" // Milestone 4
                ],
                "OFFSET": 1451520 // Start rewards at block (n).
            }
        },
        "ipc": {
            "enabled": true // If true, allows modules to communicate over IPCs (inter-process-channels).
        }
    },
    "components": { // Contains configurations related to components.
        "logger": { // Contains options for the logger component.
            "fileLogLevel": "debug", // Minimum loglevel, that should be logged in the log file. Available values: trace, debug, log, info(default), warn, error, fatal, none.
            "logFileName": "logs/devnet/lisk.log", // define name and path of the log file. Default: logs/lisk.log
            "consoleLogLevel": "info" // Minimum loglevel, that should be logged in the console, when starting the node. Available values: trace, debug, log, info, warn, error, fatal, none(default).
        },
        "storage": { // Contains options for the storage component.
            "database": "lisk_dev", // The name of the database to use.
            "host": "localhost", // The host address of the database.
            "port": 5432, // The port of the database.
            "user": "lisk", // Name of the database user.
            "password": "password", // Password of the datbase user.
            "min": 10, // Specifies the minimum amount of database handles.
            "max": 95, // Specifies the maximum amount of database handles.
            "poolIdleTimeout": 30000, // This parameter sets how long to hold connection handles open
            "reapIntervalMillis": 1000, // Closes & removes clients which have been idle > 1 second
            "logEvents": ["error"], // Specify the minimal log level for database logs.
            "logFileName": "logs/lisk_db.log" // Relative path of the database log file.
        },
        "cache": { // Contains options for the cache component.
            "db": 0, // Set the number of databases for Redis to use. Min: 0 (default), Max: 15
            "enabled": true, // If true, enables cache. Default: false
            "host": "127.0.0.1", // Redis host IP. Default: 127.0.0.1
            "port": 6380 // Redis host port. Default: 6380
        }
    },
    "modules": { // Contains configurations related to modules.
        "http_api": { // Contains options for the API module.
            "httpPort": 4000, // HTTP port, the node listens on.
            "address": "0.0.0.0", // Address of the API of the node.
            "enabled": true, // Controls the API's availability. If disabled, no API access is possible.
            "trustProxy": false, // For nodes that sit behind a proxy. If true, client IP addresses are understood as the left-most entry in the X-Forwarded-* header.
            "access": { // Contains API access options.
                "public": false, // If true, the API endpoints of the node are available to public.
                "whiteList": ["127.0.0.1"], // This parameter allows connections to the API by IP. Defaults to only allow local host.
            },
            "ssl": {
                "enabled": false, // Enables SSL for HTTP requests - Default is false.
                "options": {
                    "port": 443, // Port to host the Lisk Wallet on, default is 443 but is recommended to use a port above 1024 with iptables.
                    "address": "0.0.0.0", // Interface to listen on for the Lisk Wallet.
                    "key": "./ssl/lisk.key", // Required private key to decrypt and verify the SSL Certificate.
                    "cert": "./ssl/lisk.crt", // SSL certificate to use with the Lisk Wallet.
                },
            },
            "options": {
                "limits": {
                    "max": 0, // Maximum of API conncections.
                    "delayMs": 0, // Minimum delay between API calls in ms.
                    "delayAfter": 0, // Minimum delay after an API call in ms.
                    "windowMs": 60000, // Minimum delay between API calls from the same window.
                    "headersTimeout": 5000, // Indicating the minimum amount of time an idle connection has to be kept opened (in seconds).
                    "serverSetTimeout": 20000, // Time to wait for response from server before timing out.
                },
                "cors": { 
                    "origin": "*", // Defines the domains, that the resource can be accessed by in a cross-site manner. Defaults to all domains.
                    "methods": ["GET", "POST", "PUT"], // Defines the allowed methods for CORS.
                },
            },
            "forging": {
                "access": {
                    "whiteList": ["127.0.0.1"], // This parameter allows connections to the Forging API by IP. Defaults to allow only local connections.
                },
            },
        },
        "chain": { // Contains options for the chain module.
            "broadcasts": {
                "active": true, // If true, enables broadcasts.
                "broadcastInterval": 5000, // Specifies how often the node will broadcast transaction bundles.
                "broadcastLimit": 25, // How many nodes will be used in a single broadcast.
                "parallelLimit": 20, // Specifies how many parallel threads will be used to broadcast transactions.
                "releaseLimit": 25, // How many transactions can be included in a single bundle.
                "relayLimit": 3, // Specifies how many times a transaction broadcast from the node will be relayed.
            },
            "transactions": {
                "maxTransactionsPerQueue": 1000, // Sets the maximum size of each transaction queue. Default: 1000
            },
            "forging": { // Contains forging options for delegates.
                "force": false, // Forces forging to be on, only used on local development networks.
                "delegates": [ // List of delegates, who are allowed to forge on this node. To successfully enable forging for a delegate, the publickey and the encrypted passphrase need to be deposited here as JSON object.
                    {
                    "encryptedPassphrase": "iterations=1&salt=476d4299531718af8c88156aab0bb7d6&cipherText=663dde611776d87029ec188dc616d96d813ecabcef62ed0ad05ffe30528f5462c8d499db943ba2ded55c3b7c506815d8db1c2d4c35121e1d27e740dc41f6c405ce8ab8e3120b23f546d8b35823a30639&iv=1a83940b72adc57ec060a648&tag=b5b1e6c6e225c428a4473735bc8f1fc9&version=1",
                    "publicKey": "9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f"
                    }
                ],
                "defaultPassword": "elephant tree paris dragon chair galaxy" // Default password for dummy delegates, only used on local development networks.
            },
            "syncing": {
                "active": true, // If true, enables syncing (fallback for broadcasts).
            },
            "loading": {
                "loadPerIteration": 5000, // How many blocks to load from a peer or the database during verification.
                "rebuildUpToRound": null, // Integer. If this value is defined, the node will start and rebuild up to the defined round (set to 0 to rebuild until current round). Otherwise, the application continues normal execution.
            },
            "exceptions": { // Define network specific exceptions. More details about exceptions: https://github.com/LiskHQ/lisk-sdk/blob/development/lisk/EXCEPTIONS.md
                "blockRewards": [],
                "senderPublicKey": [],
                "signatures": [],
                "signSignature": [],
                "multisignatures": [],
                "votes": [],
                "inertTransactions": [],
                "rounds": {},
                "precedent": { "disableDappTransfer": 0 },
                "ignoreDelegateListCacheForRounds": [],
                "blockVersions": {},
                "roundVotes": [],
                "recipientLeadingZero": {},
                "recipientExceedingUint64": {},
                "duplicatedSignatures": {},
                "transactionWithNullByte": [],
            },
            "network": { // Contains network options for the node.
                "wsPort": 5000, // Websocket port of the node.
                "address": "0.0.0.0", // Address of the node.
                "discoveryInterval": 30000, // Time interval(ms), in that the nodes performs peer discovery.
                "seedPeers": [ // List of Seed Peers. On first startup, the node will initially connect to the Seed Peers in order to discover the rest of the network.
                    {
                    "ip": "1.2.3.4", // IP or address of the Seed Peer.
                    "wsPort": 4000 // Port of the Seed Peer.
                    }
                ],
                "blacklistedPeers": [ // List of peers to exclude from communicating with.
                    "9.8.7.6:4000" // IP or address of the blacklisted peer.
                ],
                "ackTimeout": 20000, // When a node tries to make an RPC against a peer (and expects a response), this value determines the maximum amount of time (in milliseconds) that the node will wait to receive a response from the peer. If the peer does not respond in time, then the RPC will fail with an error.
                "connectTimeout": 5000, // When a node tries to connect to a peer, this value determines the maximum amount of time (in milliseconds) that the node will wait to complete the handshake with the peer. If the peer does not complete the handshake in time, then the connection will be closed.
                "wsEngine": "ws", //  Represents the low-level WebSocket engine which the node should use (for advanced users). Possible values are "ws" (default, recommended) and "uws" (more performant, but not compatible with all systems).
                "list": [ // List of seed nodes, the node will connect to on first startup.
                    {
                    "ip": "127.0.0.1", // IP of the seed node.
                    "wsPort": 5000 // Websocket port of the seed node.
                    }
                ]
            }
        }
    }
}
```

## API Access Control

Controlling access to a node plays a vital role in security. The following configurable flags are available to control the access to your node:

```js

"http_api": { // Contains options for the API module.
    "enabled": true, // Controls the API's availability. If disabled, no API access is possible.
    "access": { // Contains API access options.
        "public": false, // If true, the API endpoints of the node are available to public.
        "whiteList": ["127.0.0.1"], // This parameter allows connections to the API by IP. Defaults to only allow local host.
    },
```

The recommended setup is to configure a whitelist for only trusted IP addresses, such as your home connection. Use IPV4 addresses only as the whitelist does not support IPV6. 

To set up a public wallet, simply leave the `modules.http_api.access.whitelist` array empty.

For best security, disable all access setting `modules.http_api.enabled` to `false`.

> Note: This last configuration may prevent monitoring scripts from functioning.

## Forging

To enable your node to forge, you need first to insert some encrypted data into the config file under the `chain.forging.delegates` array.
To encrypt your passphrase, we offer and recommend one of the following alternatives:

- [Lisk Commander](/lisk-commander/user-guide/commands/commands.md) via `encrypt passphrase` command
- [Cryptography module from Lisk Elements](/lisk-elements/user-guide/cryptography/cryptography.md)

We explain further the first alternative. First, make sure you have installed Lisk Commander in a secure environment. Upon completion, please follow the commands below to generate the encrypted passphrase:

```bash
$ lisk
lisk passphrase:encrypt --output-public-key
Please enter your secret passphrase: *****
Please re-enter your secret passphrase: *****
Please enter your password: ***
Please re-enter your password: ***
{
        "encryptedPassphrase": "iterations=1000000&cipherText=30a3c8&iv=b0d7322bf24e0dfe08462f4f&salt=aa7e26c9f4317b61b4f45b5c6909f941&tag=a2e0eadaf1f11a10b342965bc3bafc68&version=1",
        "publicKey": "a4465fd76c16fcc458448076372abf1912cc5b150663a64dffefe550f96feadd"
}
```

 1. In the first step, type in your passphrase and then type in the password you want to use for encryption. 
 2.  Afterward, you will get an `encryptedPassphrase` key-value pair. 
 3. Create the JSON object and add it to your `config.json` under `chain.forging.delegates`:

```js
"chain": { // Contains options for the chain module.
    "forging": { // Contains forging options for delegates.
        "force": false, // Forces forging to be on, - only used on local development networks.
        "delegates": [ // List of delegates, who are allowed to forge on this node. To successfully enable forging for a delegate, the publickey and the encrypted passphrase need to be deposited here as JSON object.
            {
                "encryptedPassphrase": "iterations=1&salt=476d4299531718af8c88156aab0bb7d6&cipherText=663dde611776d87029ec188dc616d96d813ecabcef62ed0ad05ffe30528f5462c8d499db943ba2ded55c3b7c506815d8db1c2d4c35121e1d27e740dc41f6c405ce8ab8e3120b23f546d8b35823a30639&iv=1a83940b72adc57ec060a648&tag=b5b1e6c6e225c428a4473735bc8f1fc9&version=1",
                "publicKey": "9d3058175acab969f41ad9b86f7a2926c74258670fe56b37c429c01fca9f2f0f"
            }
        ], 
    },

"http_api": { // Contains options for the API module.
            "forging": {
                "access": {
                    "whiteList": ["127.0.0.1", "REPLACE_ME"], // Replace with the IP you will use to access your node
                },
            },
```

4. Reload your Lisk Core process to make the changes in the config effective, e.g. for Binary install, run: `bash lisk.sh reload`

### Check Forging
Use the following curl command to verify the forging  status of your delegate:

```bash
curl \
  http://127.0.0.1:7000/api/node/status/forging \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' 
```

The result should be something like this:

```json
{
  "meta": {},
  "data": [
    {
      "forging": true,
      "publicKey": "9bc945f92141d5e11e97274c275d127dc7656dda5c8fcbf1df7d44827a732664"
    }
  ],
  "links": {}
}
```

### Enable/Disable Forging

> Important: Remember that after restarting your Lisk node, you need to re-enable forging again.
> The endpoint to perform this action is **idempotent**. That means, the result is the same, no matter how many times you execute the query. 

If you are running your Lisk Node from a local machine, you can enable forging through the API client, without further interruption.

Use the following curl command to **enable the forging** for your delegate:
```bash
curl -X PUT \
  http://127.0.0.1:7000/api/node/status/forging \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
          "publicKey": "YYYYYYYYY",
          "password": "XXX",
          "forging": true
      }'
```
Use the following curl command to **disable the forging** for your delegate:
```bash
curl -X PUT \
  http://127.0.0.1:7000/api/node/status/forging \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
          "publicKey": "YYYYYYYYY",
          "password": "XXX",
          "forging": false
      }'
```
- Where `publicKey` is the key for the delegate you want to enable/disable
- `password` is the password used to encrypt your passphrase in `config.json`
-  `forging` is the boolean value to enable or disable the forging
- HTTP Port can be different based on your configuration, so check `httpPort` in your `config.json`

## SSL

> We recommend to use a webserver like [NGINX](https://www.nginx.com/) or [Apache](https://httpd.apache.org/) to set up SSL for Lisk Core.
> If you don't have that opportunity, it's possible to configure Lisk Core to handle SSL connections like described below.

> This step requires a signed certificate (from a CA, such as [Let's Encrypt](https://letsencrypt.org)) or a self-signed certificate.
> You will need both the private and public keys in a location that is accessible to Lisk.

The next snippet highlights the essential parameters to enable SSL security on your node's connections:

**SSL Configuration**

```js
"http_api": {
    "ssl": {
        "enabled": false,           // Change FROM false TO true
        "options": {
            "port": 443,            // Default SSL Port
            "address": "0.0.0.0",   // Change only if you wish to block web access to the node
            "key": "path_to_key",   // Replace FROM path_to_key TO actual path to key file
            "cert": "path_to_cert"  // Replace FROM path_to_cert TO actual path to certificate file
        }
    }
```

> If the SSL Port configured above in `http_api.ssl.options.port` is a privileged port (below 1024), you must either allow the node to use the specified port with `setcap` or change the configuration to use a port outside of that range.

**Setcap:** Only required to grant Lisk access to port 443

```bash
 sudo setcap cap_net_bind_service=+ep bin/node
```

To verify all you have properly configured your node, open the web client using `https://MY_IP_OR_HOST`. You should now see a secure SSL connection.

## Logging 

For monitoring or debugging your node, Lisk Core tracks all activity that happens in the node by creating log messages for them.

These log messages are grouped in different log levels, which makes it easy to define the level of detail for the logs.

We use [Bunyan](https://github.com/trentm/node-bunyan) as logging library. Bunyan allows simple and fast JSON logging for Node.js services.

### Log Levels

| Log Level | Description                                                                                                                 |
| ----------| ----------------------------------------------------------------------------------------------------------------------------|
| None      | No events are logged.                                                                                                       |
| Fatal(60) | The node is going to stop or become unusable now. An operator should definitely look into this soon.                        |
| Error(50) | Fatal for a particular request, but the node continues servicing other requests. An operator should look at this soon(ish). |
| Warn(40)  | A note on something that should probably be looked at by an operator eventually.                                            |
| Info(30)  | Detail on a regular operation.                                                                                                |
| Debug(20) | Anything else, i.e. too verbose to be included in "info" level.                                                             |
| Trace(10) | Logging from external libraries used by your node or very detailed application logging.                                     |

### Logging destinations

There are two possible output sources for logs: The **"file log stream"** and the **"console log stream"**.
Each output source can be configured independently inside of `config.json` under the options for the `logger` component.

#### Console log stream

The console log level displays the logs directly to the console where the Lisk Core process is started from.
It is useful for quick debugging or verifying that Lisk Core starts correctly.
Default log level for the console log stream is `none`.

**Example: Display the console log stream:**
```bash
node dist/index.js | npx bunyan  # Pretty-prints console logs with log level equal or higher to the console log level.
```

For more information about the Bunyan CLI tool, please check out the official [Bunyan Documentation](http://trentm.com/node-bunyan/bunyan.1.html).

#### File log stream

All logs that have equal or higher log levels than the in `config.json` specified file log level are saved in a `.log`-file for further analysis.
By default, the generated log files are saved inside of the `logs` folder of Lisk Core.
Default log level for the file log stream is `info`.

The file log stream is perfect to [monitor the node via logs](monitoring.md#log-monitoring).

### Logrotation

It is recommended to set up some form of log rotation for the log files of Lisk Core.
If no log rotation is set up, the log files may grow very big over time (depending on the specified file log level), and will eventually exceed the servers' disk space limits.

Ubuntu systems, e.g. provide a service called `logrotate` for this purpose.
Please ensure Logrotate is installed on your system:

```bash
logrotate --version
```

Next, go to the logrotate config directory and create a new logrotate file for Lisk Core:

```bash
cd /etc/logrotate.d
touch lisk
```

Inside this file, define the parameters for the log rotation.

Example values:

```bash
/path/to/lisk/logs/mainnet/*.log { 
        daily                   # daily rotation
        rotate 5                # keep the 5 most recent logs
        maxage 14               # remove logs that are older than 14 days
        compress                # compress old log files
        delaycompress           # compress the data after it has been moved
        missingok               # if no log file is present, ignore
        notifempty              # do not rotate empty log files
}
```

After customizing the config to fit your needs and saving it, you can test it by doing a dry run:

```bash
sudo logrotate /etc/logrotate.conf --debug
```
