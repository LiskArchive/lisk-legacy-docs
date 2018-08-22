Author: mona

----

Created: 2018-05-15

----

Updated: 2018-06-26

----

Metadescription: This section will instruct you how to upgrade Lisk Core from Binary. Get started by first choosing the network your node is connected to (Mainnet or Testnet).

----

Metakeywords: Lisk Core Binary Upgrade

----

Title: Binary

----

Opengraphtitle: Lisk Core Binary Upgrade

----

Opengraphimage: 

----

Opengraphdescription: 

----

Content: 

# Lisk Core Binary Upgrade

In order to upgrade Lisk Core from Binary please follow the instructions below.  If you wish to **migrate a 0.9 node to Lisk Core 1.0**, we recommend you to go directly to the [Migration page](/documentation/lisk-core/upgrade/migration) for a full step-by-step guide. 

Please choose the instructions specific to the network (Mainnet or Testnet) your node is connected to.

<boxwarning markdown="1">
######Important
Before any upgrade process, we strongly recommend you to check always your `config.json` file. For example, the upgrade from 0.9 to 1.0  includes many changes which turns this step into an **important** one that requires your attention. See this [document for further reference](/documentation/lisk-core/upgrade/migration#migrate-configuration).
</boxwarning>

## Automated Upgrade Lisk Core

#### Mainnet
```shell
cd ~
rm -f installLisk.sh
wget https://downloads.lisk.io/lisk/main/installLisk.sh
bash installLisk.sh upgrade -r main
```

#### Testnet
```shell
cd ~
rm -f installLisk.sh
wget https://downloads.lisk.io/lisk/test/installLisk.sh
bash installLisk.sh upgrade -r test
```

After running the above script manually or through `lisk_bridge.sh`,  you will be prompted to pick from a few options. Please read these thoroughly and follow the steps. 

<boxwarning markdown="1">
######Important
You have to enable forging manually after the upgrade. Please follow this guide to [enable forging on your delegate node](/documentation/lisk-core/user-guide/configuration#forging) for further details. 
</boxwarning>

## Manual Upgrade Lisk Core

Switch to your Lisk folder and stop Lisk processes:
#### Mainnet
```shell
cd ~
cd lisk-main
bash lisk.sh stop
```

#### Testnet
```shell
cd ~
cd lisk-test
bash lisk.sh stop
```

Backup your SSL folder (if needed):

```shell
mkdir ~/backup
cp -f ./ssl/* ~/backup/
cp -f ./config.json ~/backup/
```

Remove your old Lisk folder and install script:

#### Mainnet
```shell
cd ~
rm -rf ~/lisk-main
rm -rf installLisk.sh
```

#### Testnet
```shell
cd ~
rm -rf ~/lisk-test
rm -rf installLisk.sh
```

Get the latest install script:

#### Mainnet
```shell
wget https://downloads.lisk.io/lisk/main/installLisk.sh
```

#### Testnet
```shell
wget https://downloads.lisk.io/lisk/test/installLisk.sh
```

Install the latest version of Lisk:

#### Mainnet
```shell
bash installLisk.sh install -r main
```

#### Testnet
```shell
bash installLisk.sh install -r test
```

<boxwarning markdown="1">
######Important
You will be prompted for your installation directory, pressing 'enter' will choose the default.
</boxwarning>

----

Htmltitle: Lisk Core - Binary Upgrade | Lisk Documentation

----

Iframe: 