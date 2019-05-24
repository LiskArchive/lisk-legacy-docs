# Managing Lisk Core

Install and manage an instance of Lisk Core.

* [lisk core:install NAME](#lisk-coreinstall-name)
* [lisk core:logs NAME](#lisk-corelogs-name)
* [lisk core:restart NAME](#lisk-corerestart-name)
* [lisk core:start NAME](#lisk-corestart-name)
* [lisk core:start:cache NAME](#lisk-corestartcache-name)
* [lisk core:start:database NAME](#lisk-corestartdatabase-name)
* [lisk core:status NAME](#lisk-corestatus-name)
* [lisk core:stop NAME](#lisk-corestop-name)
* [lisk core:stop:cache NAME](#lisk-corestopcache-name)
* [lisk core:stop:database NAME](#lisk-corestopdatabase-name)
* [lisk core:uninstall NAME](#lisk-coreuninstall-name)
* [lisk core:upgrade NAME](#lisk-coreupgrade-name)

## lisk core:install NAME

Install an instance of Lisk Core.

```bash
USAGE
  $ lisk core:install NAME

ARGUMENTS
  NAME  Lisk Core installation directory name.

OPTIONS
  -n, --network=mainnet|testnet|betanet|alphanet|devnet  [default: mainnet] Lisk Core network name.
  -r, --release-url=release-url                          Lisk Core download URL.

  -s, --snapshot-url=snapshot-url                        [default:
                                                         https://downloads.lisk.io/lisk/mainnet/blockchain.db.gz] Lisk
                                                         Core blockchain snapshot URL.

  --lisk-version=lisk-version                            Lisk Core version.

  --no-snapshot                                          Install Lisk Core without a blockchain snapshot.

  --no-start                                             Install Lisk Core without starting.

EXAMPLES
  core:install lisk-mainnet
  core:install --no-start lisk-mainnet
  core:install --no-snapshot lisk-mainnet
  core:install --lisk-version=2.0.0 lisk-mainnet
  core:install --network=testnet --release-url=https://downloads.lisk.io/lisk/testnet/2.0.0-rc.0/lisk-2.0.0-rc.0-Linux-x86_64.tar.gz lisk-testnet
  core:install --network=mainnet --snapshot-url=https://downloads.lisk.io/lisk/mainnet/blockchain.db.gz custom-mainnet
```

_See code: [dist/commands/core/install.ts](https://github.com/LiskHQ/lisk-sdk/blob/v2.0.0-alpha.9/commander/src/commands/core/install.ts)_

## lisk core:logs NAME

Stream logs of a Lisk Core instance.

```bash
USAGE
  $ lisk core:logs NAME

ARGUMENTS
  NAME  Lisk Core installation directory name.

EXAMPLE
  core:logs mainnet-latest
```

_See code: [dist/commands/core/logs.ts](https://github.com/LiskHQ/lisk-sdk/blob/v2.0.0-alpha.9/commander/src/commands/core/logs.ts)_

## lisk core:restart NAME

Restart Lisk Core instance.

```bash
USAGE
  $ lisk core:restart NAME

ARGUMENTS
  NAME  Lisk Core installation directory name.

EXAMPLE
  core:restart mainnet-latest
```

_See code: [dist/commands/core/restart.ts](https://github.com/LiskHQ/lisk-sdk/blob/v2.0.0-alpha.9/commander/src/commands/core/restart.ts)_

## lisk core:start NAME

Start Lisk Core instance.

```bash
USAGE
  $ lisk core:start NAME

ARGUMENTS
  NAME  Lisk Core installation directory name.

EXAMPLE
  core:start mainnet-latest
```

_See code: [dist/commands/core/start/index.ts](https://github.com/LiskHQ/lisk-sdk/blob/v2.0.0-alpha.9/commander/src/commands/core/start/index.ts)_

## lisk core:start:cache NAME

Start the cache server.

```bash
USAGE
  $ lisk core:start:cache NAME

ARGUMENTS
  NAME  Lisk Core installation directory name.

EXAMPLE
  core:start:cache mainnet-latest
```

_See code: [dist/commands/core/start/cache.ts](https://github.com/LiskHQ/lisk-sdk/blob/v2.0.0-alpha.9/commander/src/commands/core/start/cache.ts)_

## lisk core:start:database NAME

Start the database server.

```bash
USAGE
  $ lisk core:start:database NAME

ARGUMENTS
  NAME  Lisk Core installation directory name.

EXAMPLE
  core:start:database mainnet-latest
```

_See code: [dist/commands/core/start/database.ts](https://github.com/LiskHQ/lisk-sdk/blob/v2.0.0-alpha.9/commander/src/commands/core/start/database.ts)_

## lisk core:status NAME

Show the status of a Lisk Core instances.

```bash
USAGE
  $ lisk core:status [NAME]

ARGUMENTS
  NAME  Lisk Core installation directory name.

OPTIONS
  -j, --[no-]json  Prints output in JSON format. You can change the default behaviour in your config.json file.

  --[no-]pretty    Prints JSON in pretty format rather than condensed. Has no effect if the output is set to table. You
                   can change the default behaviour in your config.json file.

EXAMPLES
  core:status
  core:status mainnet-latest
```

_See code: [dist/commands/core/status.ts](https://github.com/LiskHQ/lisk-sdk/blob/v2.0.0-alpha.9/commander/src/commands/core/status.ts)_

## lisk core:stop NAME

Stop Lisk Core instance.

```bash
USAGE
  $ lisk core:stop NAME

ARGUMENTS
  NAME  Lisk Core installation directory name.

EXAMPLE
  core:stop mainnet-latest
```

_See code: [dist/commands/core/stop/index.ts](https://github.com/LiskHQ/lisk-sdk/blob/v2.0.0-alpha.9/commander/src/commands/core/stop/index.ts)_

## lisk core:stop:cache NAME

Stop the cache server.

```bash
USAGE
  $ lisk core:stop:cache NAME

ARGUMENTS
  NAME  Lisk Core installation directory name.

EXAMPLE
  core:stop:cache mainnet-latest
```

_See code: [dist/commands/core/stop/cache.ts](https://github.com/LiskHQ/lisk-sdk/blob/v2.0.0-alpha.9/commander/src/commands/core/stop/cache.ts)_

## lisk core:stop:database NAME

Stop the database server.

```bash
USAGE
  $ lisk core:stop:database NAME

ARGUMENTS
  NAME  Lisk Core installation directory name.

EXAMPLE
  core:stop:database mainnet-latest
```

_See code: [dist/commands/core/stop/database.ts](https://github.com/LiskHQ/lisk-sdk/blob/v2.0.0-alpha.9/commander/src/commands/core/stop/database.ts)_

## lisk core:uninstall NAME

Uninstall an instance of Lisk Core.

```bash
USAGE
  $ lisk core:uninstall NAME

ARGUMENTS
  NAME  Lisk Core installation directory name.

EXAMPLE
  core:uninstall mainnet-latest
```

_See code: [dist/commands/core/uninstall.ts](https://github.com/LiskHQ/lisk-sdk/blob/v2.0.0-alpha.9/commander/src/commands/core/uninstall.ts)_

## lisk core:upgrade NAME

Upgrade an instance of Lisk Core to a specified or latest version.

```bash
USAGE
  $ lisk core:upgrade NAME

ARGUMENTS
  NAME  Lisk Core installation directory name.

OPTIONS
  -r, --release-url=release-url  Lisk Core download URL.
  --lisk-version=lisk-version    Lisk Core version.

EXAMPLES
  core:upgrade lisk-mainnet
  core:upgrade --lisk-version=2.0.0 lisk-mainnet
  core:upgrade --release-url=https://downloads.lisk.io/lisk/testnet/2.1.0-rc.0/lisk-2.1.0-rc.0-Linux-x86_64.tar.gz
  lisk-mainnet
```

_See code: [dist/commands/core/upgrade.ts](https://github.com/LiskHQ/lisk-sdk/blob/v2.0.0-alpha.9/commander/src/commands/core/upgrade.ts)_
