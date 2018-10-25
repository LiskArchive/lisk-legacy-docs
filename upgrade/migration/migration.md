# Lisk Core Migration

Info | Note 
--- | --- 
![info note](../../info-icon.png "Info Note") | Migration of a Lisk Node is only necessary during a hard fork. For normal software updates that don't invoke a hard fork, please go to [Upgrade section](../../upgrade/upgrade.md)

## What happens during migration

The migration is a special case of upgrading your Lisk Core node. A migration is needed, if the new version of the software is not compatible with older Lisk Core versions.

As a consequence, the majority of the network needs to do this software update simultaneously to stabilize the forked chain and as a result make it grow faster as the outdated version of the chain.

To achieve this, a height is picked in order to proceed with a simultaneous global upgrade. 
When the blockheight of the network reaches the predefined height, it will invoke the update on all nodes in the network at the same time. 
This way the probabilities of creating forks are lower. 

Beside the normal update- script, the `lisk-bridge` script might include additional scripts, e.g. if the new update includes changes in the structure of the configuration file, the script would try to reorganize your existing config to the new structure and then run the normal update script afterwards.
If you dont't want to use the automated script, you can read a [detailed explanation](#migrate-manually) of how to do the migration manually below. 

The following section describes how to use the automated migration script for binary distributions of Lisk Core, to make your migration as seamless as possible, additionally you can find information below on how to perform the migration process manually.

The **recommended** migration path is as follows:
- [Automated Migration](#automated-migration)
  - [Prepare your workspace](#prepare-your-workspace)
  - [Lisk Bridge : Automate the upgrade](#lisk-bridge--automated-lisk-core-migration)
  - [What if I miss the block height or if Lisk Bridge script fails](#what-if-i-miss-the-block-height-or-if-lisk-bridge-script-fails)

The above should be enough to complete the migration. For more curious users, we've included a few more advanced sections:
- [Migrate manually](#migrate-manually)
  - [Additional migration scripts](#additional-migration-scripts)
    - [Migrate your config file](#migrate-configuration)
     - [Migrate Passphrases](#migrate-passphrases)
  - [Lisk Bridge Command Reference](#lisk-bridge-command-reference)

## Automated Migration

### Prepare your workspace
We assume that you have already installed Lisk Core and are familiar with the application. Nevertheless, we want to highlight a couple things to double-check:
- Revisit the [setup](/lisk-core/setup/setup.md) steps before continuing. Supported Linux distributions are Ubuntu 14.04 LTS through and including Ubuntu 18.04 LTS.
- Verify that the following ports are open, depending on the network:

| Network | httpPort(HTTP) | wsPort(TCP) |
| -----------|-------------|-------------|
| Mainnet | 8000         | 8001        |
| Testnet   | 7000         | 7001        |

- Make a backup of `config.json`. While this process does make a backup automatically in a `backup/` directory, it's recommended to make one yourself as you can never be too careful. At the end of this tutorial we include some advanced cases to guide you.
- The next section introduces a tool we have consciously implemented to make a gapless migration.

### Lisk Bridge : Automated Lisk Core Migration
We introduced a tool to perform the migration called [Lisk Bridge](https://downloads.lisk.io/lisk/test/lisk_bridge.sh). 
It's a wrapper script that invokes `installLisk.sh upgrade` at a specific block height - and thus is intended for users using the [Binary installation](../../setup/setup.md).

To upgrade your node on a specific network height, you should download `lisk_bridge.sh` to where you would normally download and run installLisk.sh. 
In other words, it should be 1 directory up from where the lisk application is stored. For example, if you're currently running `Lisk Core 0.9.16` as a user called `lisk`, `Lisk Core 0.9.16` is most likely installed in `/home/lisk/lisk-main` and `installLisk.sh` is stored in `/home/lisk`, the lisk user's home directory. 
As the lisk user then, you could run the following:

```shell
cd ~
rm -f lisk_bridge.sh
wget https://downloads.lisk.io/lisk/test/lisk_bridge.sh
bash lisk_bridge.sh -n <network> -h <blockheight>
```
Where `<network>` can either be `main` for Mainnet or `test` for Testnet. 

The bridge script will run and wait for the specified height of the network and upon reaching this height , will invoke installLisk.sh` in order to update the code, migrate the database to the new model and update the config files.

When the script arrives to your config file, it will prompt you asking for a password in the case where it finds a passphrase. It will encrypt and migrate that passphrase to the new format. You can find more information in the [migrate configuration section](#migrate-configuration). If you want to avoid this prompt and make a full-automated migration, add the next environment variable to your system:
```shell
export LISK_MASTER_PASSWORD=XXXXXXXX
``` 

If you're doing a fully automated migration, you could run `lisk_bridge.sh` inside of tmux, screen, byobu or another terminal multiplexer and detach your session even days ahead of time, though you'd want to minimize this lead time if you're exporting `LISK_MASTER_PASSWORD`

Important | Note 
--- | --- 
![important note](../../important-icon.png "Important Note") | **Important note for delegates:** After automated upgrade, you still need to enable forging again manually, like described in [configuration section](../../user-guide/configuration/configuration.md#enable-disable-forging)

We have prepared a small clip showing the expected output from the script execution. You can watch it to verify your migration was completed as expected: https://www.youtube.com/watch?v=Zy9gyH-toBM

### What if I miss the block height or if Lisk Bridge script fails?

Dont't panic!
You can still migrate your node afterwards by following the normal upgrade process.
Keep in mind you might need to run some [additional migration scripts](#additional-migration-scripts) beforehand, so that your node is fully prepared for the upgrade.

## Migrate manually

### Additional migration scripts

You don't need to run these script if you have run `lisk_bridge.sh` before as it is automatically executed there. If you still want to use it for any other purpose, you can find a reference below:

#### Migrate configuration 

In case that the structure of the `config.json` has changed, Lisk Core contains a utility called `update_config.js`. It enables users to automatically migrate their old configuration to the new structure.
The last configuration change happened from Lisk Core 0.9 to 1.0, and isn't needed for future migrations, but will probably replaced if a new release requires new structural configuration changes. 

```shell
node scripts/update_config.js <old_config_path> <new_config_path> [--password]
```

- `<old_config_path>` first argument you specify absolute or relative path of the old configuration file from 0.9.x 
- `<new_config_path>` second argument you specify absolute or relative path of the new configuration file from 1.0.0 
- `[--password]` It should be used only in testing environments. It will serve as default password to encrypt the passphrases.

Important | Note 
--- | --- 
![important note](../../important-icon.png "Important Note") | Using **--password** as the command line option is just for testing purposes. **Do not use it in production environment**. It will expose your password to shell history. 

##### Migrate Passphrases
The same script is able to encrypt old plain passphrases following the new mechanism. This is intended for those users who have a forging delegate or a delegate who can forge in a close future.

- Automatically
When you run `scripts/update_config.js`, it checks `forging.secret` array in the old configuration file. If there are some values, it will prompt you the next message: 
```shell 
We found some secrets in your config, if you want to migrate, please type in your password (enter to skip): 
```
To perform automatic passphrase migration, type-in the password of your choice. If you type a word with a minimum of 5 characters, the script will create the `forging.delegates` array in the new configuration file.  The same password will be used for every passphrase presented in the old config file.

- Manually
You can also migrate your passphrases one by one. You will be able to encrypt every passphrase with a different password. In order to do so, install [Lisk Commander](/lisk-commander/setup/setup.md) and use [encrypt passphrase command](/lisk-commander/user-guide/commands/commands.md#encrypt-passphrase).

### Run update script
Go through the normal upgrade process using `installLisk.sh`,  either syncing from genesis or rebuilding from snapshot
Here are the key options available when upgrading:
- `-c` to remove old peers from the database
- `-h` to rebuild from snapshot
- `-0` to sync from genesis.

Example:
```shell
bash installLisk.sh upgrade -c -h
```

### Lisk Bridge Command Reference
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
