# Lisk Core Binary Upgrade

In order to upgrade Lisk Core from Binary please follow the instructions below.  If you wish to **migrate a 0.9 node to Lisk Core 1.0**, we recommend you to go directly to the [Migration page](../migration/migration.md) for a full step-by-step guide. 

Please choose the instructions specific to the network (Mainnet or Testnet) your node is connected to.


Important | Note 
--- | --- 
![important note](../../important-icon.png "Info Note") | Before any upgrade process, we strongly recommend you to check always your `config.json` file. For example, the upgrade from 0.9 to 1.0  includes many changes which turns this step into an **important** one that requires your attention. See this [document for further reference](../migration/migration.md#migrate-configuration).

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

Important | Note 
--- | --- 
![important note](../../important-icon.png "Info Note") | You have to enable forging manually after the upgrade. Please follow this guide to [enable forging on your delegate node](../../user-guide/configuration/configuration.md#forging) for further details.

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

Info | Note 
--- | --- 
![info note](../../info-icon.png "Info Note") | You will be prompted for your installation directory, pressing 'enter' will choose the default.
