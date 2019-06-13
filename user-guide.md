# Lisk Commander User Guide

This guide details important information on how to use and configure Lisk Commander.

- [Usage](#usage)
- [Configuration](#configuration)
- [Lisk Core Commands](user-guide/lisk-core.md)
- [General Command Reference](user-guide/commands.md)
- [Sensitive Inputs](user-guide/sensitive-inputs.md)

## Usage

> For a full list of all commands and their available options, check the [Command reference](user-guide/commands.md)

Pass arguments and options directly from the command line. E.g.:

```sh-session
$ lisk (-v|--version|version) # returns current version of Lisk Commander.
$ lisk [COMMAND]:[ACTION] # to run a command. Available actions depend on the command.
$ lisk [COMMAND] # displays help for a specific command.
$ lisk # displays general help and the command list.
```

```sh-session
COMMANDS
  account      Commands relating to Lisk accounts.
  block        Commands relating to Lisk blocks.
  config       Manages Lisk Commander configuration.
  copyright    Displays copyright notice.
  delegate     Commands relating to Lisk delegates.
  help         Displays help.
  message      Commands relating to user messages.
  node         Commands relating to Lisk node.
  passphrase   Commands relating to Lisk passphrases.
  signature    Commands relating to signatures for Lisk transactions from multisignature accounts.
  transaction  Commands relating to Lisk transactions.
  warranty     Displays warranty notice.
```

See concrete examples on the [Commands page](user-guide/commands.md).

## Configuration

Show Lisk Commander Config:
```bash
lisk config:show
```

```js
{
	"json": true, // Provide output as json if set to true, otherwise output is table.
	"api": {
		"nodes": [], // Specify nodes to send requests.
		"network": "main"  // Specify a default network. It can be "main", "test", "beta" or a custom nethash.
	},
	"pretty": false // Pretty print JSON output if set to true.
} 
```

### Configure the network

```bash
lisk config:set api.network <NETWORK> 
```
where `<NETWORK>` may be `main` for Mainnet and `test` for Testnet.
If you didn't specify specific nodes for Lisk Commander, it will connect to predefined public nodes of Lisk Mainnet or Testnet.

### Configure specific nodes

Specify the node, Lisk Commander shall communicate with.

If you specify more than one node, it will use the first node as default, and the other nodes as a fallback, if the first node does not respond.

```bash
lisk config:set api.nodes https://127.0.0.1:4000,http://mynode.com:7000
```

See more examples with the [`config` command](user-guide/commands.md#config) on the Commands page.

### How to use a custom config file

The configuration file `config.json` is located in `lisk-sdk/commander/src/config.json`.
If you would prefer to store it elsewhere, run Lisk Commander with the environmental variable `LISK_COMMANDER_CONFIG_DIR` set to the path of your choice.

### Override config options 

Some elements of this configuration can be overridden while executing a command, by using the following options:

Setting | Option
--- | ---
Use JSON output | `--json`
Use table output | `--no-json`
Pretty print JSON | `--pretty`
Do not pretty print JSON | `--pretty false`

See concrete examples on the [Commands page](user-guide/commands.md).
