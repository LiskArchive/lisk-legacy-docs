# Lisk Core Binary Upgrade

To upgrade Lisk Core from Binary please follow the instructions below.
Please choose the instructions specific to the network (Mainnet or Testnet) your node is connected to.

## Automated Upgrade Lisk Core

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
