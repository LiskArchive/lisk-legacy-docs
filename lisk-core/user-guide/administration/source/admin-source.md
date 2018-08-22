# Lisk Core Source Administration

This section details how to manage a Source installation of Lisk Core. Source installations for use in production are recommended to use a process manager. PM2 is included in the installation document and will be used in this reference.

Command | Description
--- | ---
pm2 start --name lisk app.js | Starts Lisk using app.js
pm2 stop lisk | Stop Lisk using app.js
pm2 restart lisk | Restarts Lisk using app.js
pm2 delete lisk | Stops Lisk processes and cleans up pm2 entries for Lisk
pm2 logs | Displays the logs of the Lisk process

Start Source Install with PM2

```shell
pm2 start --name lisk app.js
```

After the process is started, its runtime status and log location can be retrieved by issuing the following command:

```shell
pm2 show lisk
```

To stop Lisk after it has been started with pm2, issue the following command:

```shell
pm2 stop lisk
```

Restart Source Install with PM2 (useful for reloading changes to `config.json`)

```shell
pm2 restart lisk
```

Delete Source Installation with PM2 (useful if removing Lisk Core or rebuilding the source installation entirely)

```shell
pm2 delete lisk
```

View Realtime Logs (useful for troubleshooting issues)

```shell
pm2 logs
```

**NOTE:** The **port, address** and **config-path** can be overridden by providing the relevant command switch:

```shell
pm2 start --name lisk app.js -- -p [port] -a [address] -c [config-path]
```

## Rebuild source installation from a snapshot

In some scenarios it is recommended to restore the blockchain from a snapshot. The command blocks below will perform this process. The URL can be substituted for another `blockchain.db.gz` snapshot file if desired.

### Mainnet

```shell
pm2 stop lisk
dropdb lisk_main
wget https://downloads.lisk.io/lisk/main/blockchain.db.gz
createdb lisk_main
gunzip -fcq blockchain.db.gz | psql -d lisk_main
pm2 start lisk
```

### Testnet

```shell
pm2 stop lisk
dropdb lisk_test
wget https://downloads.lisk.io/lisk/test/blockchain.db.gz
createdb lisk_test
gunzip -fcq blockchain.db.gz | psql -d lisk_test
pm2 start lisk
```
