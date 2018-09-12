# Lisk Explorer Documentation

## Table of contents
[Setup](setup/setup.md) | [User Guide](user-guide/user-guide.md) | 
--- | ---
[Pre-Installation](setup/pre-install/pre-install.md) | [Tools](user-guide/tools/tools.md)
[Installation](setup/install/install.md) | [API](user-guide/api/api.md)


Lisk Explorer is a tool that visualizes the vast information from Lisk's blockchain . 

It can be used for gathering information about particular blocks and transactions, but also for some general information about the whole network and its delegates status. Components like Network Monitor and Delegate Monitor show the status of the whole ecosystem in real time.

## Networks

Similarly to Lisk Core, Lisk Explorer can be connected to different networks. The network is defined by the node it is connected to (under `config.lisk.host` attribute in the config file). There are two key public networks, entirely independent of each other, that are always accessible: **Mainnet** and **Testnet**. 

### Mainnet
Mainnet is where the true Lisk economy exists. On this network, Lisk users are able to transfer LSK tokens from one account to another, register accounts as delegates, vote for another delegates or register dApps. It can be explored via the [Lisk Explorer](https://explorer.lisk.io).

### Testnet
Testnet is an independent replica of the Lisk Mainnet intended as an area to rehearse upgrades before they take place on the Lisk Mainet. This is where new versions and fixes of Lisk Core are tested. It can be explored via [Lisk Tesnet Explorer](https://testnet-explorer.lisk.io).

## Codebase

You can find the codebase at our [Lisk Explorer Github](https://github.com/LiskHQ/lisk-explorer) page.
