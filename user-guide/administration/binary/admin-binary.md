# Lisk Core Binary Administration

## Table of contents
- [Basic commands](#basic-commands)
  * [Status of Lisk Core](#status)
  * [Start Lisk Core](#start)
  * [Stop Lisk Core](#status)
  * [Reload Lisk Core](#reload)
  * [Reset Lisk Core](#reset---coldstart)
  * [Show logs](#logs)
  * [Show Help](#help)
- [Management tools](#management-tools)
  * [Update PATH environment variable](#update-path-environment-variable)
  * [pm2](#pm2)
  * [psql](#psql)
- [Advanced commands](#advanced-commands)
  * [Create Snapshot](#create-snapshot)
  * [Rebuild from Snapshot](#rebuild-from-snapshot)
  * [Start Lisk Core process only](#start-node-only)
  * [Stop Lisk Core process only](#stop-node-only)
  * [Start database only](#start-database-only)
  * [Stop database only](#stop-database-only)

This section details how to work with a Binary installation of Lisk Core. 
For further details, see each commands reference below.

## Basic Commands

Listed below are the available basic commands which can be used to manage your Lisk node.

### Status
Check the status of the Lisk Core Node.
```
bash lisk.sh status
```

### Start
Start Lisk Core and PostgreSQL.
```
bash lisk.sh start
```

### Stop
Stop Lisk Core and PostgreSQL.
```
bash lisk.sh stop
```

### Reload
Reload Lisk Core and pick up changes to config.json.
```
bash lisk.sh reload
```

### Reset / Coldstart
Initializes the PostgreSQL database and starts Lisk Core.
```
bash lisk.sh coldstart
```

### Logs
Monitor(tail) the log file of Lisk.
```
bash lisk.sh logs
```

### Help
Display all available commands.
```
bash lisk.sh help
```

## Management Tools

### Update PATH environment variable
If you have installed Lisk Core with the Binary package and want to use additional tools like `pm2` and `psql`, the corresponding PATH variables need to be set by typing the following:
```
source env.sh
```

### pm2

PM2 comes bundled with the Lisk Core Binary distribution and will be available after [Updating the PATH environment](#update-path-environment-variable).
For more information, how to manage your Node with PM2, go to the [Source Administration](../../user-guide/administration/source/admin-source.md) page. 

### psql 

The interactive terminal for postgreSQL comes bundled with the Lisk Core Binary distribution and will be available after [Updating the PATH environment](#update-path-environment-variable).
For more information about available commands, see the official [PostgreSQL Documentation](https://www.postgresql.org/docs/9.6/static/app-psql.html)

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

Info | Note 
--- | --- 
![info note](info-icon.png "Info Note") | Note, that this process may take a long time, depending on the size of your snapshot.

```shell
bash lisk_snapshot.sh
```

### Rebuild from Snapshot
To replace the blockchain with a new snapshot from the Lisk Foundation
```shell
bash lisk.sh rebuild
```

#### Rebuild from a local snapshot
```shell
bash lisk.sh rebuild -f blockchain.db.gz
```

#### Rebuild form a remote hosts snapshot 
If the file is named `blockchain.db.gz`,  use this command
```shell
bash lisk.sh rebuild -u https://hostname/
```
To use a remote host snapshot with a different name issue this command instead
```shell
bash lisk.sh rebuild -u https://hostname/ -f filename.db.gz
```

#### Rebuild from the genesis block
```shell
bash lisk.sh rebuild -0
```

### Start node only
This command is used to start individual nodejs processes apart from the database. 
It is designed to be used with customized config.json files in order to manage vertically stacked Lisk processes on one node.
```shell
bash lisk.sh start_node -c <config.json>
```

### Stop node only
This command is used to stop individual nodejs processes apart from the database. 
It is designed to be used with customized `config.json` files in order to manage vertically stacked Lisk processes on one node.
```shell
bash lisk.sh stop_node -c <config.json>
```

### Start database
This command is used to start database instances apart from the Lisk process. 
It is designed to be used with customized `config.json` files to target specific instances.
```shell
bash lisk.sh start_db -c <config.json>
```

### Stop database only
This command is used to stop all database instances apart from the Lisk process.
```shell
bash lisk.sh stop_db
```
