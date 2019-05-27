# Lisk Core Binary Upgrade

To upgrade Lisk Core from Binary please follow the instructions below.
Please choose the instructions specific to the network (Mainnet or Testnet) your node is connected to.

## Upgrade with Lisk Commander

> __Note:__ The `core:upgrade` command is only supported for Lisk Core versions > `2.0.0` and will only work, if Lisk Core has been installed with Lisk Commander before.

First, go into the directory, where your Lisk Core installation is located.

Then, run the following command to upgrade Lisk Core:

```bash
lisk core:upgrade <location>
```
Where `<location>` should be the root folder of your Lisk Core installation.

See for all available options the Lisk Commander [Command reference for Lisk Core](../lisk-sdk/lisk-commander/user-guide/lisk-core.md) as well as the [general Command reference](../lisk-sdk/lisk-commander/user-guide/commands.md).

## Upgrade with bash script

#### Mainnet
```bash
cd ~
rm -f installLisk.sh
wget https://downloads.lisk.io/lisk/main/installLisk.sh
bash installLisk.sh upgrade -r main
```

#### Testnet
```bash
cd ~
rm -f installLisk.sh
wget https://downloads.lisk.io/lisk/test/installLisk.sh
bash installLisk.sh upgrade -r test
```

After running the above script manually or through `lisk_bridge.sh`,  you will be prompted to pick from a few options. Please read these thoroughly and follow the steps. 

> You have to enable forging manually after the upgrade. Please follow this guide to [enable forging on your delegate node](../configuration.md#forging) for further details.

## Manual Upgrade Lisk Core

Switch to your Lisk folder and stop Lisk processes:
#### Mainnet
```bash
cd ~
cd lisk-main
bash lisk.sh stop
```

#### Testnet
```bash
cd ~
cd lisk-test
bash lisk.sh stop
```

Backup your SSL folder (if needed):

```bash
mkdir ~/backup
cp -f ./ssl/* ~/backup/
cp -f ./config.json ~/backup/
```

Remove your old Lisk folder and install script:

#### Mainnet
```bash
cd ~
rm -rf ~/lisk-main
rm -rf installLisk.sh
```

#### Testnet
```bash
cd ~
rm -rf ~/lisk-test
rm -rf installLisk.sh
```

Get the latest install script:

#### Mainnet
```bash
wget https://downloads.lisk.io/lisk/main/installLisk.sh
```

#### Testnet
```bash
wget https://downloads.lisk.io/lisk/test/installLisk.sh
```

Install the latest version of Lisk:

#### Mainnet
```bash
bash installLisk.sh install -r main
```

#### Testnet
```bash
bash installLisk.sh install -r test
```

> You will be prompted for your installation directory, pressing 'enter' will choose the default.
