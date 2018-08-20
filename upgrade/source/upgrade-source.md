Author: mona

----

Created: 2018-05-15

----

Updated: 2018-06-26

----

Metadescription: To upgrade Lisk Core from Source, follow the instructions specific to the network (Mainnet or Testnet) your node is connected to.

----

Metakeywords: Lisk Core Source Upgrade

----

Title: Source

----

Opengraphtitle: Lisk Core Source Upgrade

----

Opengraphimage: 

----

Opengraphdescription: 

----

Content: 

# Lisk Core Source Upgrade

This section details how to upgrade Lisk Core from source. If you wish to **migrate a 0.9 node to Lisk Core 1.0**, we recommend you to go directly to the [Migration page](/documentation/lisk-core/upgrade/migration) for a full step-by-step guide.

<boxwarning markdown="1">
######Important
Before any upgrade process, we strongly recommend you to check always your `config.json` file. For example, the upgrade from 0.9 to 1.0  includes many changes which turns this step into an **important** one that requires your attention. See this [document for further reference](/documentation/lisk-core/upgrade/migration#migrate-configuration).
</boxwarning>

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


<boxwarning markdown="1">
######Important
You have to enable forging manually after upgrade. Please follow this guide to [enable forging on your delegate node](/documentation/lisk-core/user-guide/configuration#forging) for further details. 
</boxwarning>

----

Htmltitle: Lisk Core - Source Upgrade | Lisk Documentation