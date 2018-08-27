# Lisk Core Migration

Lisk Core `v1.0.0` is a hard fork which includes several changes. A height iss picked in order to proceed with a simultaneous global upgrade. This way the probabilities of creating forks are lower. 

The recommended migration path is as follows:
- [Prepare your workspace](#prepare-your-workspace)
- [Lisk Bridge : Automate the upgrade](#lisk-bridge--automate-lisk-core-upgrade)

The above should be enough to complete the migration. For more curious users, we've included a few more advanced sections:
- [Check configuration changes](#configuration-changes-from-09-to-10)
- [Migrate your config file](#migrate-configuration)
 - [Migrate Passphrases](#migrate-passphrases)
- [Enable forging](lisk-core/user-guide/configuration/configuration.md#forging) (optional, just if you need to forge)
- [Lisk Bridge Command Reference](#lisk-bridge-command-reference)

## Prepare your workspace
We assume that you have already installed Lisk Core and are familiar with the application. Nevertheless, we want to highlight a couple things to double-check:
- Revisit the [setup](lisk-core/setup/setup.md) steps before continuing. Supported Linux distributions are Ubuntu 14.04 LTS through and including Ubuntu 18.04 LTS.
- Verify that the following ports are open, depending on the network:

| Network | httpPort(HTTP) | wsPort(TCP) |
| -----------|-------------|-------------|
| Mainnet | 8000         | 8001        |
| Testnet   | 7000         | 7001        |

- Make a backup of config.json. While this process does make a backup automatically in a `backup/` directory, it's recommended to make one yourself as you can never be too careful. At the end of this tutorial we include some advanced cases to guide you.
- The next section introduces a tool we have consciously implemented to make a gapless migration. We expect it to be executed in an Ubuntu 16 environment that follows the recommended specs you can find in the [readme](https://github.com/LiskHQ/lisk#lisk). In summary: Node 6.14.1, PostgreSQL 9.6.8 and Redis.

## Lisk Bridge : Automate Lisk Core Upgrade
We introduced the tool to perform the migration called [Lisk Bridge](https://downloads.lisk.io/lisk/test/lisk_bridge.sh). It's a wrapper script that invokes `installLisk.sh upgrade` at a specific block height - and thus is intended for users using the **Binary installation**. To upgrade your node on a specific network height, you should download lisk_bridge.sh to where you would normally download and run installLisk.sh. In other words, it should be 1 directory up from where the lisk application is stored. For example, if you're currently running `Lisk Core 0.9.16` as a user called `lisk`, `Lisk Core 0.9.16` is most likely installed in `/home/lisk/lisk-main` and `installLisk.sh` is stored in `/home/lisk`, the lisk user's home directory. As the lisk user then, you could run the following:

```shell
cd ~
rm -f lisk_bridge.sh
wget https://downloads.lisk.io/lisk/test/lisk_bridge.sh
bash lisk_bridge.sh -n <network> -h <blockheight>
```
Where `<network>` can either be `main` or `test`. 

The bridge script will run and wait for the specified height of the network and upon reaching this height , will invoke installLisk.sh in order to update the code, migrate the database to the new model and update the config files

When the script arrives to your config file, it will prompt you asking for a password in the case where it finds a passphrase. It will encrypt and migrate that passphrase to the new format. You can find more information in the [following sections](migration#migrate-configuration). If you want to avoid this prompt and make a full-automated migration, add the next environment variable to your system:
```shell
export LISK_MASTER_PASSWORD=XXXXXXXX
``` 

If you're doing a fully automated migration, you could run lisk_bridge.sh inside of tmux, screen, byobu or another terminal multiplexer and detach your session even days ahead of time, though you'd want to minimize this lead time if you're exporting LISK_MASTER_PASSWORD

We have prepared a small clip showing the expected output from the script execution. You can watch it to verify your migration was completed as expected. 
(youtube: https://www.youtube.com/watch?v=Zy9gyH-toBM&feature=youtu.be width: 100% height: 600)
<br>

<boxinfo markdown="1">
######What if I miss the block height or if `Lisk Bridge` fails?
Go through the normal upgrade process using `installLisk.sh`,  either syncing from genesis or rebuilding from snapshot
It's also necessary when upgrading from 0.9 to 1.0 to specify `-c` to remove old peers from the database.
Here are the key options available when upgrading:
- `-c` to remove old peers from the database
- `-h` to rebuild from snapshot
- `-0` to sync from genesis.

Example:
```shell
bash installLisk.sh upgrade -c -h
```
</boxinfo>

## Configuration changes from 0.9 to 1.0
Lisk has a variety of configurations under `config.json`. Each of them are thoroughly explained in [this section](lisk-core/user-guide/configuration). Running nodes behave according to which configuration you choose in that file. Remember if you modify anything, you need to restart the node to apply it.

During the course of development we have introduced some changes in the configuration which are not backward compatible. They are strictly related to the version you are running. This section will describe each of these changes for your reference:

- Renamed `port` config to `httpPort`. 
- Introduced new required configuration `wsPort` for P2P communication over web sockets. 
- Renamed `db.poolSize` to `db.max` for maximum db connections.
- Introduced `db.min` as minimum alive db connections fore more responsive db operations.
- Introduced `db.logFileName` to log db related stuff to a seperate file.
- Introduced `api.options.cors` to manage CORS settings for http API. It have two options `origin` and `methods` to configure. 
- Removed `peers.options.limits` as we moved P2P layer to web socket.
- Introduced `broadcast.active` as boolean value to enable/disable the broadcasting behavior. 
- Renamed `transactions.maxTxsPerQueue` to `transactions.maxTransactionsPerQueue` for better readability. 
- Removed `loading.verifyOnLoading` config option and set this behaviour as built-in. 
- Removed `dapp` config option. It will came up with new configuration structure for Dapps soon. 
- Renamed `peers.list[].port` to `peers.list[].wsPort` as moving P2P to web socket port. 
- Renamed `forging.secret` to `forging.delegates`.
- Each passphrase under `forging.secrets` are translated to new object structure containing `encryptedPassphrase` and `publicKey`.
- Introduced in the new configuration `forging.defaultPassword`. It is the default password for every **encrypted** passphrases. It is just intended for testing environments.

## Migrate configuration 
The latest version of Lisk Core `v1.0.0` contains a utility called `update_config.js`. It enables users to automatically migrate your old configuration to the new structure. You don't need to run this script if you have run `lisk_bridge.sh` before as it is automatically executed there. If you still want to use it for any other purpose, the command to run the script is: 

```shell
node scripts/update_config.js <old_config_path> <new_config_path> [--password]
```

- `<old_config_path>` first argument you specify absolute or relative path of the old configuration file from 0.9.x 
- `<new_config_path>` second argument you specify absolute or relative path of the new configuration file from 1.0.0 
- `[--password]` It should be used only in testing environments. It will serve as default password to encrypt the passphrases.

Important | Note 
--- | --- 
![important note](inmportant-icon.png "Important Note") | Using **--password** as the command line option is just for testing purposes. **Do not use it in production environment**. It will expose your password to shell history. 

### Migrate Passphrases
The same script is able to encrypt old plain passphrases following the new mechanism. This is intended for those users who have a forging delegate or a delegate who can forge in a close future.

####Automatically
When you run `scripts/update_config.js`, it checks `forging.secret` array in the old configuration file. If there are some values, it will prompt you the next message: 
```shell 
We found some secrets in your config, if you want to migrate, please type in your password (enter to skip): 
```
To perform automatic passphrase migration, type-in the password of your choice. If you type a word with a minimum of 5 characters, the script will create the `forging.delegates` array in the new configuration file.  The same password will be used for every passphrase presented in the old config file.

#### Manually
You can also migrate your passphrases one by one. You will be able to encrypt every passphrase with a different password. In order to do so, install [Lisk Commander](lisk-commander/setup) and use [encrypt passphrase command](lisk-commander/user-guide/commands#encrypt-passphrase).

## Lisk Bridge Command Reference
For reference, here is the lisk_bridge.sh usage help:
```shell
Usage: lisk_bridge.sh <-h <BLOCKHEIGHT>> [-s <DIRECTORY>] [-n <NETWORK>]
-h <BLOCKHEIGHT> -- specify blockheight at which bridging will be initiated
-f <TARBALL>     -- specify path to local tarball containing the target release
-s <DIRECTORY>   -- Lisk home directory
-n <NETWORK>     -- choose main or test

Example: bash lisk_bridge.sh -h 50000000 -n test -s /home/lisk/lisk-test
Set the LISK_MASTER_PASSWORD environment variable if you want to do secrets migration in non-interactive mode```
```
