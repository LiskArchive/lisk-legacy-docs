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

## Command Line Options

There are plenty of options available that you can use to override configuration on runtime while starting Lisk Core.

```
node app.js -p [port] -a [address] -c [config-path] -n [network]
```
or with pm2, e.g.:
```
pm2 start lisk -p [port] -a [address] -c [config-path] -n [network]
```
You can pass any of `devnet` (default), `alphanet`, `betanet`, `testnet` or `mainnet` for the network option.


Each of these options can be appended on command line. There are also few `ENV` variables that can be utilized for this purpose.

| Option                               | ENV Variable           | Config Option            | Description                                                                                                                                                                       |
| ------------------------------------ | ---------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <pre nowrap>--network<br>-n</pre>    | LISK_NETWORK           |                          | Which configurations set to use, associated to lisk networks. Any of this option can be used `devnet`, `alphanet`, `betanet`, `testnet` and `mainnet`. Default value is `devnet`. |
| <pre nowrap>--config<br> -c</pre>    | LISK_CONFIG_FILE       |                          | Path the custom configuration file, which will override values of `config/default/config.json`                                                                                    |
| <pre nowrap>--port<br> -p</pre>      | LISK_WS_PORT           | wsPort                   | TCP port for P2P layer                                                                                                                                                            |
| <pre nowrap>--http-port<br> -h</pre> | LISK_HTTP_PORT         | httpPort                 | TCP port for HTTP API                                                                                                                                                             |
| <pre nowrap>--address<br> -a</pre>   | LISK_ADDRESS           | address                  | Listening host name or ip                                                                                                                                                         |
| <pre nowrap>--log<br> -l</pre>       | LISK_FILE_LOG_LEVEL    | fileLogLevel             | Log level for file output                                                                                                                                                         |
|                                      | LISK_CONSOLE_LOG_LEVEL | consoleLogLevel          | Log level for console output                                                                                                                                                      |
|                                      | LISK_CACHE_ENABLED     | cacheEnabled             | Enable or disable cache. Must be set to true/false                                                                                                                                |
| <pre nowrap>--database<br> -d</pre>  | LISK_DB_NAME           | db.database              | PostgreSQL database name to connect                                                                                                                                               |
|                                      | LISK_DB_HOST           | db.host                  | PostgreSQL database host name                                                                                                                                                     |
|                                      | LISK_DB_PORT           | db.port                  | PostgreSQL database port                                                                                                                                                          |
|                                      | LISK_DB_USER           | db.user                  | PostgreSQL database username to connect                                                                                                                                           |
|                                      | LISK_DB_PASSWORD       | db.password              | PostgreSQL database password to connect                                                                                                                                           |
| <pre nowrap>--peers<br> -p</pre>     | LISK_PEERS             | peers.list               | Comma separated list of peers to connect in the format `192.168.99.100:5000,172.169.99.77:5000`                                                                                   |
|                                      | LISK_API_PUBLIC        | api.access.public        | Enable or disable public access of http API. Must be set to true/false                                                                                                            |
|                                      | LISK_API_WHITELIST     | api.access.whiteList     | Comma separated list of IPs to enable API access. Format `192.168.99.100,172.169.99.77`                                                                                           |
|                                      | LISK_FORGING_DELEGATES | forging.delegates        | Comma separated list of delegates to load in the format _publicKey&#x7c;encryptedPassphrase,publicKey2&#x7c;encryptedPassphrase2_                                                 |
|                                      | LISK_FORGING_WHITELIST | forging.access.whiteList | Comma separated list of IPs to enable access to forging endpoints. Format `192.168.99.100,172.169.99.77`                                                                          |
| <pre nowrap>--snapshot<br> -s</pre>  |                        |                          | Number of round for which take the snapshot. If none specified it will use the highest round available.                                                                           |

#### Note

* All `ENV` variables restricted with operating system constraint of `ENV` variable maximum length.
* Comma separated lists will replace the original config values. e.g. If you specify `LISK_PEERS`, original `peers.list` specific to network will be replaced completely.


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
