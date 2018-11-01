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

Besides the normal update script, the **Lisk Bridge** script might include additional scripts, e.g. if the new update includes changes in the structure of the configuration file, the script would try to reorganize your existing config to the new structure and then run the normal update script afterwards.
If you don't want to use the automated script, you can read a [detailed explanation](#migrate-manually) of how to do the migration manually below. 

The following section describes how to use the automated migration script for binary distributions of Lisk Core, to make your migration as seamless as possible, additionally you can find information below on how to perform the migration process manually.

The **recommended** migration path is as follows:
- [Automated Migration](#automated-migration)
  - [Prepare your workspace](#prepare-your-workspace)
  - [Lisk Bridge : Automate the upgrade](#lisk-bridge--automated-lisk-core-migration)
  - [What if I miss the block height or if Lisk Bridge script fails](#what-if-i-miss-the-block-height-or-if-lisk-bridge-script-fails)
  - [Lisk Bridge Command Reference](#lisk-bridge-command-reference)

The above should be enough to complete the migration. For more curious users, we've included a few more advanced sections:
- [Migrate manually](#migrate-manually)
  - [Utility scripts](#utility-scripts)
    - [Generate Config](#generate-config)
    - [Update Config](#update-config)
    - [Console](#console)

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
- The next section introduces a tool we have implemented to make a gapless migration.

### Lisk Bridge : Automated Lisk Core Migration
We introduced a tool to perform the migration called **Lisk Bridge**, available at [downloads.lisk.io](https://downloads.lisk.io/lisk/).
Here are the direct download links depending on the network your node is connected to:
- [Lisk Bridge for Testnet](https://downloads.lisk.io/lisk/test/lisk_bridge.sh)
- [Lisk Bridge for Mainnet](https://downloads.lisk.io/lisk/main/lisk_bridge.sh)

It's a wrapper script that invokes `installLisk.sh upgrade` at a specific block height - and thus is intended for users using the [Binary installation](../../setup/setup.md).

To upgrade your node on a specific network height, you should download `lisk_bridge.sh` to where you would normally download and run installLisk.sh. 
In other words, it should be 1 directory up from where the lisk application is stored. 
For example, if you're currently running `Lisk Core 0.9.16` as a user called `lisk`, `Lisk Core 0.9.16` is most likely installed in `/home/lisk/lisk-main` and `installLisk.sh` is stored in `/home/lisk`, the lisk user's home directory. 
As the lisk user then, you could run the following:

```bash
cd ~
rm -f lisk_bridge.sh
wget https://downloads.lisk.io/lisk/main/lisk_bridge.sh
```

Then run the script with the desired parameters:
```bash
bash lisk_bridge.sh -n <network> -h <blockheight>
```

Where `<network>` can either be `main` for Mainnet or `test` for Testnet.
`<blockheight>` is the before announced blockheight, when the hard fork is going to happen.

The bridge script will run and wait for the specified height of the network and upon reaching this height, will invoke `installLisk.sh` in order to update the code, migrate the database to the new model and update the config files.

When the script arrives to your config file, it will prompt you asking for a password in the case where it finds a passphrase.
It will encrypt and migrate that passphrase to the new format.
If you want to avoid this prompt and make a full-automated migration, add the next environment variable to your system:

```bash
export LISK_MASTER_PASSWORD=XXXXXXXX
``` 

If you're doing a fully automated migration, you could run `lisk_bridge.sh` inside of tmux, screen, byobu or another terminal multiplexer and detach your session even days ahead of time, though you'd want to minimize this lead time if you're exporting `LISK_MASTER_PASSWORD`.

Important | Note 
--- | --- 
![important note](../../important-icon.png "Important Note") | **Important note for delegates:** After automated upgrade, you still need to enable forging again manually, like described in [configuration section](../../user-guide/configuration/configuration.md#enable-disable-forging)

We have prepared a small clip showing the expected output from the script execution. You can watch it to verify your migration was completed as expected: https://www.youtube.com/watch?v=Zy9gyH-toBM

### Lisk Bridge Command Reference
For reference, here is the lisk_bridge.sh usage help:
```bash
Usage: lisk_bridge.sh <-h <BLOCKHEIGHT>> [-s <DIRECTORY>] [-n <NETWORK>]
-h <BLOCKHEIGHT> -- specify blockheight at which bridging will be initiated
-f <TARBALL>     -- specify path to local tarball containing the target release
-s <DIRECTORY>   -- Lisk home directory
-n <NETWORK>     -- choose main or test

Example: bash lisk_bridge.sh -h 50000000 -n test -s /home/lisk/lisk-test
Set the LISK_MASTER_PASSWORD environment variable if you want to do secrets migration in non-interactive mode
```

### What if I miss the block height or if Lisk Bridge script fails?

Dont't panic!
You can still migrate your node afterwards by following the normal upgrade process.
Keep in mind you might need to run some [additional migration scripts](#additional-migration-scripts) beforehand, so that your node is fully prepared for the upgrade.

## Migrate manually

To migrate a Lisk node manually, do the following steps:

1. Backup your data.
2. Run the necessary [utility scripts](#utility-scripts). 
These scripts prepare the Lisk node for the migration and are required before the upgrade script can run successfully. 
The utility scripts that need to be run can vary depending on the migraiton.
3. Go through the default [upgrade process](../upgrade.md).

## Utility Scripts

You don't need to run these script if you have run `lisk_bridge.sh` before as it is automatically executed there.

There are couple of command line scripts that facilitate users of lisk to perform handy operations.

All scripts are are located under `./scripts/` directory and can be executed directly by `node scripts/<file_name>`.

### Generate Config

This script will help you to generate unified version of configuration file for any network. Here is the usage of the script:

```bash
Usage: generate_config [options]

Options:

-h, --help               output usage information
-V, --version            output the version number
-c, --config [config]    custom config file
-n, --network [network]  specify the network or use LISK_NETWORK
```

Argument `network` is required and can by `devnet`, `testnet`, `mainnet` or any other network folder available under `./config` directory.

### Update Config

This script keep track of all changes introduced in Lisk over time in different versions. 
If you have one config file in any of specific version and you want to make it compatible with other version of the Lisk, this scripts will do it for you.

```bash
Usage: update_config [options] <input_file> <from_version> [to_version]

Options:

-h, --help               output usage information
-V, --version            output the version number
-n, --network [network]  specify the network or use LISK_NETWORK
-o, --output [output]    output file path
```

As you can see from the usage guide, `input_file` and` from_version` are required.
If you skip `to_version` argument changes in config.json will be applied up to the latest version of Lisk Core.
If you do not specify `--output` path the final config.json will be printed to stdout.
If you do not specify `--network` argument you will have to load it from` LISK_NETWORK` env variable.

### Console

This script is really useful in development. It will initialize the components of Lisk and load these into nodejs REPL.

```bash
node scripts/console.js

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
