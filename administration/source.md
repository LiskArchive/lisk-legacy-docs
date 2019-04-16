# Lisk Core Source Administration

This section details how to manage a Source installation of Lisk Core.

- [Basic Commands](#basic-commands)
  * [Status of Lisk Core](#status)
  * [Start Lisk Core](#start)
  * [Stop Lisk Core](#stop)
  * [Restart Lisk Core](#restart)
  * [Delete Lisk Core](#delete)
  * [Add Lisk Core](#add)
  * [Logs](#logs)
- [Command Line Options](#command-line-options)
- [Utility scripts](#utility-scripts)
  - [Generate Config](#generate-config)
  - [Update Config](#update-config)
  - [Console](#console)
- [Creating Snapshots](#creating-snapshots)
- [Rebuild from Snapshot](#rebuild-from-a-snapshot)
- [Code documentation in Lisk Core](#code-documentation-in-lisk-core)

## Basic Commands

### Status
Check the status of the Lisk Core Node.
```bash
npx pm2 status lisk
```

### Start
Start Lisk Core.
```bash
npx pm2 start lisk
```

### Stop
Stop Lisk Core.
```bash
npx pm2 stop lisk
```

### Restart
Restart Lisk Core.
```bash
npx pm2 restart lisk
```

### Delete
Remove Lisk Core process from npx pm2 list.
```bash
npx pm2 delete lisk
```

### Add
In case you haven't done this during the Installation process, add your Lisk Core process to pm2 under the name `lisk`.
```bash
npx pm2 start --name lisk src/index.js -- --network [network]
```
Where `[network]` might be either `testnet` or `mainnet`.

### Logs
Display Lisk Core logs in streaming.
```bash
npx pm2 logs
```

## Command Line Options

There are plenty of options available that you can use to override configuration on runtime while starting Lisk Core.

How to overwrite config options from the Command Line:
```bash
# recommended: Pass options as environment variables
LISK_NETWORK=[network] LISK_CONFIG_FILE=[config-path] LISK_ADDRESS=[address] LISK_WS_PORT=[port] npm start

# alternative (deprecated): Pass options as flags
npm start -- -p [port] -a [address] -c [config-path] -n [network]
```
or with pm2, e.g.:
```bash
LISK_NETWORK=[network] LISK_CONFIG_FILE=[config-path] LISK_ADDRESS=[address] LISK_WS_PORT=[port] npx pm2 start lisk
```
You can pass `devnet` (default), `alphanet`, `betanet`, `testnet` or `mainnet` for the `[network]` option.


Each of these options can be appended on the command line. There are also a few `ENV` variables that can be utilized for this purpose.

| Command-line Option                  | ENV Variable             | Config Option            | Description                                                                                                                                                                       |
| ------------------------------------ | ----------------------   | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <pre nowrap>--network<br>-n</pre>    | LISK_NETWORK             |                          | Which configurations set to use, associated to lisk networks. Any of this option can be used `devnet`, `alphanet`, `betanet`, `testnet` and `mainnet`. Default value is `devnet`. |
| <pre nowrap>--config<br> -c</pre>    | LISK_CONFIG_FILE         |                          | Path the custom configuration file, which will override values of `config/default/config.json`                                                                                    |
| <pre nowrap>--port<br> -p</pre>      | LISK_WS_PORT             | wsPort                   | TCP port for P2P layer                                                                                                                                                            |
| <pre nowrap>--http-port<br> -h</pre> | LISK_HTTP_PORT           | httpPort                 | TCP port for HTTP API                                                                                                                                                             |
| <pre nowrap>--address<br> -a</pre>   | LISK_ADDRESS             | address                  | Listening host name or ip                                                                                                                                                         |
| <pre nowrap>--log<br> -l</pre>       | LISK_FILE_LOG_LEVEL      | fileLogLevel             | Log level for file output                                                                                                                                                         |
|                                      | LISK_CONSOLE_LOG_LEVEL   | consoleLogLevel          | Log level for console output                                                                                                                                                      |
|                                      | LISK_CACHE_ENABLED       | cacheEnabled             | Enable or disable cache. Must be set to true/false                                                                                                                                |
| <pre nowrap>--database<br> -d</pre>  | LISK_DB_NAME             | db.database              | PostgreSQL database name to connect to                                                                                                                                            |
|                                      | LISK_DB_HOST             | db.host                  | PostgreSQL database host name                                                                                                                                                     |
|                                      | LISK_DB_PORT             | db.port                  | PostgreSQL database port                                                                                                                                                          |
|                                      | LISK_DB_USER             | db.user                  | PostgreSQL database username to connect to                                                                                                                                        |
|                                      | LISK_DB_PASSWORD         | db.password              | PostgreSQL database password to connect to                                                                                                                                        |
| <pre nowrap>--redis<br> -r</pre>     | LISK_REDIS_HOST          | redis.host               | Redis host name                                                                                                                                                                   |
|                                      | LISK_REDIS_PORT          | redis.port               | Redis port                                                                                                                                                                        |
|                                      | LISK_REDIS_DB_NAME       | redis.db                 | Redis database name to connect to                                                                                                                                                 |
|                                      | LISK_REDIS_DB_PASSWORD   | redis.password           | Redis database password to connect to                                                                                                                                             |
| <pre nowrap>--peers<br> -p</pre>     | LISK_PEERS               | peers.list               | Comma separated list of peers to connect to in the format `192.168.99.100:5000,172.169.99.77:5000`                                                                                |
|                                      | LISK_API_PUBLIC          | api.access.public        | Enable or disable public access of http API. Must be set to true/false                                                                                                            |
|                                      | LISK_API_WHITELIST       | api.access.whiteList     | Comma separated list of IPs to enable API access. Format `192.168.99.100,172.169.99.77`                                                                                           |
|                                      | LISK_FORGING_DELEGATES   | forging.delegates        | Comma separated list of delegates to load in the format _publicKey&#x7c;encryptedPassphrase,publicKey2&#x7c;encryptedPassphrase2_                                                 |
|                                      | LISK_FORGING_WHITELIST   | forging.access.whiteList | Comma separated list of IPs to enable access to forging endpoints. Format `192.168.99.100,172.169.99.77`                                                                          |
| <pre nowrap>--snapshot<br> -s</pre>  |                          |                          | Number of round for which take the snapshot. If none specified it will use the highest round available.                                                                           |
|                                      |LISK_CHILD_PROCESS_MODULES|                          | Comma separated list of modules, that shall be loaded in a separate process. To enable inter process communication, set `ipc.enabled` to `true` inside the `config.json` file.    |

#### Note

* All `ENV` variables restricted with operating system constraint of `ENV` variable maximum length.
* Comma-separated lists will replace the original config values. e.g. If you specify `LISK_PEERS`, original `peers.list` specific to the network will be replaced completely.

## Utility scripts

There are a couple of command line scripts that facilitate users of lisk to perform handy operations.

All scripts are located under `./scripts/` directory and can be executed directly by `node scripts/<file_name>`.

### Generate Config

This script will help you to generate a unified version of the configuration file for any network. Here is the usage of the script:

```bash
Usage: node scripts/generate_config.js [options]

Options:

-h, --help               output usage information
-V, --version            output the version number
-c, --config [config]    custom config file
-n, --network [network]  specify the network or use LISK_NETWORK
```

Argument `network` is required and can by `devnet`, `testnet`, `mainnet` or any other network folder available under `./config` directory.

### Update Config

This script keeps track of all changes introduced in Lisk over time in different versions. 
If you have one config file in any of specific version and you want to make it compatible with other versions of the Lisk, this scripts will do it for you.

```bash
Usage: node scripts/update_config.js [options] <input_file> <from_version> [to_version]

Options:

-h, --help               output usage information
-V, --version            output the version number
-n, --network [network]  specify the network or use LISK_NETWORK
-o, --output [output]    output file path
```

As you can see from the usage guide, `input_file` and` from_version` are required.
If you skip `to_version` argument changes in config.json will be applied up to the latest version of Lisk Core.
If you do not specify `--output` path the final config.json will be printed to stdout.
If you do not specify `--network` argument you will have to load it from `LISK_NETWORK` env variable.


### Console

This script is useful in development. It will initialize the components of Lisk and load these into Node.JS REPL.

```bash
Usage: node scripts/console.js

initApplication: Application initialization inside test environment started...
initApplication: Target database - lisk_dev
initApplication: Rewired modules available
initApplication: Fake onBlockchainReady event called
initApplication: Loading delegates...
initApplication: Delegates loaded from config file - 101
initApplication: Done
lisk-core [lisk_dev] >
```

Once you get the prompt, you can use `modules`, `helpers`, `logic`, `db` and `config` objects and play with these in REPL.

## Creating snapshots

> For creating snapshots the most convenient way, it is recommended to use Lisk Core from [binary distribution](binary.md#create-snapshot).
> Just execute the script `lisk-snapshot.sh`, what will perform all necessary steps to create a snapshot of the blockchain.

To create a snapshot manually, perform the following steps:

> The template database should be the one defined in `components.storage.database` in the `config.json` file of Lisk Core.

Exmaple: Creating a snapshot for Mainnet.

```bash
npx pm2 stop lisk # stop Lisk Core node
createdb --template="lisk_main" lisk_snapshot # create template from Lisk Mainnet database
npx pm2 start lisk # start Lisk Core node
psql --dbname=lisk_snapshot --command='TRUNCATE peers, mem_accounts2u_delegates, mem_accounts2u_multisignatures;' # Remove unneccessary tables (they will be recreated during rebuild from snapshot)
pg_dump --no-owner lisk_snapshot |gzip -9 > snapshot-lisk_mainnet-8852728.gz # Dump the database and compress it

```

> Its recommended to document the current block height of the snapshot, and include it in the snapshots' filename.
> This query will return the current block height in the database for Mainnet: 
> ```
> psql --dbname=lisk_main --tuples-only --command='SELECT height FROM blocks ORDER BY height DESC LIMIT 1;' | xargs`
> ```

## Rebuild from a snapshot

In some scenarios, it is recommended to restore the blockchain from a snapshot.
The command blocks below will perform this process.
The URL can be substituted for another `blockchain.db.gz` snapshot file if desired.

### Mainnet

```bash
npx pm2 stop lisk # stop Lisk Core node
dropdb lisk_main # delete Lisk Mainnet database
wget https://downloads.lisk.io/lisk/main/blockchain.db.gz # download Lisk snapshot
createdb lisk_main # create fresh Lisk Mainnet database
gunzip -fcq blockchain.db.gz | psql -d lisk_main # import the downloaded snapshot into the new databse
npx pm2 start lisk # start Lisk Core node again
```

### Testnet

```bash
npx pm2 stop lisk # stop Lisk Core node
dropdb lisk_test # delete Lisk Testnet database
wget https://downloads.lisk.io/lisk/test/blockchain.db.gz # download Lisk snapshot
createdb lisk_test # create fresh Lisk Testnet database
gunzip -fcq blockchain.db.gz | psql -d lisk_test # import the downloaded snapshot into the new databse
npx pm2 start lisk # start Lisk Core node again
```

## Code documentation in Lisk Core

For code documentation, Lisk Core uses [JSDoc](http://usejsdoc.org/).
JSDoc generates a static HTML documentation site.
To build the documentation site, run the following command inside the lisk installation directory:

```bash
npm run docs:build
```

The JSDoc documentation is generated inside of `docs/jsdoc/`.

To host the documentation site (e.g. for easy access via a browser), use the following command:

```bash
npm run docs:serve
```

This will start a web server, and the documentation will be accessible through the browser on port 8080, e.g. `localhost:8080`.
The process will be started inside the terminal. To stop the web server again, hit `CTRL + C`.

For more information please have a look in the [Contribution Guidelines](https://github.com/LiskHQ/lisk/blob/development/docs/CONTRIBUTING.md) for Lisk Core on Github.
