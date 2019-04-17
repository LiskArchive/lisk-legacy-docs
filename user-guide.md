# Lisk Commander User Guide

This guide details important information on how to use and configure Lisk Commander.

- [Configuration](#configuration)
- [Usage](#usage)
- [Command List](user-guide/commands.md)
- [Sensitive Inputs](user-guide/sensitive-inputs.md)

## Configuration

The configuration file `config.json` is located in `lisk-sdk/commander/src/config.json`.
If you would prefer to store it elsewhere, run Lisk Commander with the environmental variable `LISK_COMMANDER_CONFIG_DIR` set to the path of your choice.

```js
{
	"json": true, // Provide output as json if set to true, otherwise output is table.
	"api": {
		"nodes": [], // Specify nodes to send requests.
		"network": "main"  // Specify a default network. It can be "main", "test", "beta" or custom nethash.
	},
	"pretty": false // Pretty print JSON output if set to true.
} 
```

Some elements of this configuration can be overridden on the command line using the following options:

Setting | Option
--- | ---
Use JSON output | `--json`
Use table output | `--no-json`
Pretty print JSON | `--pretty`
Do not pretty print JSON | `--pretty false`

## Usage

Pass arguments and options directly from the command line. E.g.:

```bash
 $ lisk delegate:get lightcurve --json
```
