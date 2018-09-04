# Lisk Core Source Upgrade

This section details how to upgrade Lisk Core from source. If you wish to **migrate a 0.9 node to Lisk Core 1.0**, we recommend you to go directly to the [Migration page](/lisk-core/upgrade/migration) for a full step-by-step guide.

Info | Note 
--- | --- 
![info note](../../info-icon.png "Info Note") | Before any upgrade process, we strongly recommend you to check always your `config.json` file. For example, the upgrade from 0.9 to 1.0  includes many changes which turns this step into an **important** one that requires your attention. See this [document for further reference](/lisk-core/upgrade/migration/migration.md#migrate-configuration).

Please follow the instructions specific to the network (Mainnet or Testnet) that your node is connected to.

Stop the node:

```shell
pm2 stop lisk
```

Pull the latest tagged release using Git from your Lisk Directory and install node modules.
#### Mainnet
```shell
git pull master
npm install
```

#### Testnet
```shell
git pull testnet-master
npm install
```

Start the node:

```shell
pm2 start lisk
```

Info | Note 
--- | --- 
![info note](../../info-icon.png "Info Note") | You have to enable forging manually after upgrade. Please follow this guide to [enable forging on your delegate node](../../user-guide/configuration/configuration.md#forging) for further details. 
