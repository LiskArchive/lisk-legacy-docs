# Lisk Commander User Guide

This guide details important information on how to use and configure Lisk Commander.

- [Configuration](#configuration)
- [Usage](#usage)
- [Command Reference](user-guide/commands.md)
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

### Examples

```sh-session
EXAMPLE: Get delegate info for delegate "lightcurve"
$ lisk delegate:get lightcurve  --json
Result:
[
	{
		"username": "lightcurve",
		"vote": "612081796407294",
		"rewards": "3376000000000",
		"producedBlocks": 6752,
		"missedBlocks": 27,
		"productivity": 99.6,
		"rank": 109,
		"account": {
			"address": "13133549779353512613L",
			"publicKey": "44ff24c4e82ff0ccc5a94f442a9c956a81ee37cd6561434be1af9d46f8f17ec4",
			"secondPublicKey": "fc2e40238a3886bcc6dddf92ac8bfbb2fbbf074d486e4800be253dcbed7cf1ac"
		},
		"approval": 4.66
	}
]

EXAMPLE: Create vote transaction object. Specify delegates you want to vote/unvote by their publickey.
$ lisk transaction:create:vote --votes=cd83b889f577c9bb042ec874142d16d67e7d4a1ee89dd8af86911b6fe064ec47,1bcafb3f338b3c85b2f2de1076a93140fe052042a71c4aa0531f32af15772d6a,da9bd81b85c5a26fc1f6ae336a7a0fed00db4c8ef192b85febf6ed9070f7c235,7beb5f1e8592022fe5272b45eeeda6a1b6923a801af6e1790933cc6a78ed95a1,abf9787621f8f43ec4e4a645b515094f42fc5615f2e231eca24eaf6e69dc6a65
? Please enter your secret passphrase:  [hidden]
? Please re-enter your secret passphrase:  [hidden]
RESULT: 
{
	"amount": "0",
	"recipientId": "8004805717140184627L",
	"senderPublicKey": "30c07dbb72b41e3fda9f29e1a4fc0fce893bb00788515a5e6f50b80312e2f483",
	"timestamp": 91316601,
	"type": 3,
	"fee": "100000000", 
	"asset": {
		"votes": [
			"+cd83b889f577c9bb042ec874142d16d67e7d4a1ee89dd8af86911b6fe064ec47",
			"+1bcafb3f338b3c85b2f2de1076a93140fe052042a71c4aa0531f32af15772d6a",
			"+da9bd81b85c5a26fc1f6ae336a7a0fed00db4c8ef192b85febf6ed9070f7c235",
			"+7beb5f1e8592022fe5272b45eeeda6a1b6923a801af6e1790933cc6a78ed95a1",
			"+abf9787621f8f43ec4e4a645b515094f42fc5615f2e231eca24eaf6e69dc6a65"
		]
	},
	"signature": "bc96a5e436016e02765bc8a02e9574172df5ce3eccf7d5ee22d9f1eaea0a22de4f317b8aed814854da37bc9680d1124f6f92b94e013d22f94cd1890e7a779606",
	"signSignature": "651d1c991241ef2f7db47e24d74fe1ee858fb57998ed28583232fb454096557f945bd32792d7a8979375073834c8c42d5baf94bbea9060bc8396b1e7ecc1d407",
	"id": "16525926712464819479"
}
```
