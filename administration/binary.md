# Lisk Core Binary Administration

This section details how to work with a Binary installation of Lisk Core. 
For further details, see each commands reference below.

## Table of contents
- [Basic commands](#basic-commands)
  * [Status of Lisk Core](#status)
  * [Start Lisk Core](#start)
  * [Stop Lisk Core](#stop)
  * [Reload Lisk Core](#reload)
  * [Reset Lisk Core](#reset--coldstart)
  * [Show logs](#logs)
  * [Show Help](#help)
- [Management tools](#management-tools)
  * [Update PATH environment variable](#update-path-environment-variable)
  * [pm2](#pm2)
  * [psql](#psql)
- [Utility scripts](#utility-scripts)
  * [Generate Config](#generate-config)
  * [Update Config](#update-config)
- [Advanced commands](#advanced-commands)
  * [Create Snapshot](#create-snapshot)
  * [Rebuild from Snapshot](#rebuild-from-snapshot)
  * [Start Lisk Core process only](#start-node-only)
  * [Stop Lisk Core process only](#stop-node-only)
  * [Start database only](#start-database-only)
  * [Stop database only](#stop-database-only)

## Basic Commands

Listed below are the available basic commands which can be used to manage your Lisk node.

### Status
Check the status of the Lisk Core Node.
```bash
bash lisk.sh status
```

### Start
Start Lisk Core and PostgreSQL.
```bash
bash lisk.sh start
```

### Stop
Stop Lisk Core and PostgreSQL.
```bash
bash lisk.sh stop
```

### Reload
Reload Lisk Core and pick up changes to config.json.
```bash
bash lisk.sh reload
```

### Reset / Coldstart
Initializes the PostgreSQL database and starts Lisk Core.
```bash
bash lisk.sh coldstart
```

### Logs
Monitor(tail) the log file of Lisk.
```bash
bash lisk.sh logs
```

### Help
Display all available commands.
```bash
bash lisk.sh help
```

## Management Tools

### Update PATH environment variable
If you have installed Lisk Core with the Binary package and want to use additional tools like `pm2` and `psql`, the corresponding PATH variables need to be set by typing the following:
```bash
source env.sh
```

### pm2

PM2 comes bundled with the Lisk Core Binary distribution and will be available after [Updating the PATH environment](#update-path-environment-variable).
For more information, how to manage your Node with PM2, go to the [Source Administration](administration/source.md) page. 

### psql 

The interactive terminal for postgreSQL comes bundled with the Lisk Core Binary distribution and will be available after [Updating the PATH environment](#update-path-environment-variable).
For more information about available commands, see the official [PostgreSQL Documentation](https://www.postgresql.org/docs/9.6/static/app-psql.html)

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

## Advanced Commands
Listed below are the available advanced commands which can be used to manage your Lisk node. 
For more detail, see each commands reference below.

### Create Snapshot
The snapshot script is used to take a backup of the whole blockchain. 
A snapshot can be used to speed up the sync process, instead of having to validate all transactions starting from block height 0 to current block height.
Lisk provides official snapshots of the blockchain, see [http://snapshots.lisk.io](http://snapshots.lisk.io).

In case you want to create your own, just run the following script. It will:
1. create a full database dump of the Lisk Blockchain
2. validate the correctness of the blockchain, and
3. compress the result and save it

> Note, that this process may take a long time, depending on the size of your snapshot.

```bash
bash lisk_snapshot.sh
```

### Rebuild from Snapshot
To replace the blockchain with a new snapshot from the Lisk Foundation
```bash
bash lisk.sh rebuild
```

#### Rebuild from a local snapshot
```bash
bash lisk.sh rebuild -f blockchain.db.gz
```

#### Rebuild form a remote hosts snapshot 
If the file is named `blockchain.db.gz`,  use this command
```bash
bash lisk.sh rebuild -u https://hostname/
```
To use a remote host snapshot with a different name issue this command instead
```bash
bash lisk.sh rebuild -u https://hostname/ -f filename.db.gz
```

#### Rebuild from the genesis block
```bash
bash lisk.sh rebuild -0
```

### Start node only
This command is used to start individual Node.JS processes apart from the database. 
It is designed to be used with customized config.json files to manage vertically stacked Lisk processes on one node.
```bash
bash lisk.sh start_node -c <config.json>
```

### Stop node only
This command is used to stop individual Node.JS processes apart from the database. 
It is designed to be used with customized `config.json` files to manage vertically stacked Lisk processes on one node.
```bash
bash lisk.sh stop_node -c <config.json>
```

### Start database
This command is used to start database instances apart from the Lisk process. 
It is designed to be used with customized `config.json` files to target specific instances.
```bash
bash lisk.sh start_db -c <config.json>
```

### Stop database only
This command is used to stop all database instances apart from the Lisk process.
```bash
bash lisk.sh stop_db
```
