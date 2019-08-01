# Lisk Core Binary Setup

This document details how to setup Lisk Core Binary distribution on a system. 

* [Option A: Lisk Commander](#option-a-lisk-commander)
   - [Pre-Install](#pre-install)
      1. [Determine if your platform can run Lisk Core](#determine-if-your-platform-can-run-lisk-core)
      2. [Open necessary ports](#open-the-necessary-ports)
      3. [Install Lisk Commander](#install-lisk-commander)
   - [Installation](#installation)
* [Option B: The Bash script](#option-b-the-bash-script)
   - [Pre-Install](#pre-install-1)
      1. [Determine if your platform can run Lisk Core](#determine-if-your-platform-can-run-lisk-core-1)
      3. [Install dependencies](#install-dependencies)
      4. [Create `lisk` user](#create-a-user-to-run-lisk)
   - [Installation](#installation-1)
      1. [Login as lisk user](#login-to-the-lisk-user)
      2. [Execute the installation script](#execute-the-installation-script)
      3. [Verify successful installation](#verify-successful-installation)
- [Post-Installation (optional)](#post-installation-optional)

# Option A: Lisk Commander

Setup and manage your Lisk node conveniently with Lisk Commander.

> **Note:** This setup option is supported from Lisk Core v2.0.0 upwards.
> If you have Lisk Core v1.6 or lower installed, you wont be able to upgrade your node with Lisk Commander.
> In this case, use the bash script or remove your old version and make a fresh install with Lisk Commander.

## Pre-Install

To complete the installation some prerequisites need to be fulfilled.  If you have already performed these, please proceed to the [Installation](#installation) chapter.

### Determine if your platform can run Lisk Core

###### Supported Platforms
- Ubuntu 18.04 (LTS) x86_64
- Ubuntu 16.04 (LTS) x86_64

### Ports

>__Mandatory:__ Always open the __WebSocket__ port of your desired network, to enable communication with other peer nodes.<br>
> __Optional:__ Open the corresponding HTTP port for your network, to make your node's [API](https://lisk.io/documentation/lisk-core/api) reachable.<br>
> For more info, see the diagram on the [Interact with network](../../start/interact-with-network.md) page.

To connect to the desired network with Lisk Core, please ensure that the corresponding ports are open:

> Lisk Core installed by lisk Commander currently uses the default ports, incremented by +2. If you want to change it back to the [default ports](#open-the-necessary-ports) ports, just change the [config](../configuration.md) of your Lisk Core, once it's installed.

| Network | HTTP           | WebSocket   |
| --------|----------------|-------------|
| Mainnet | 8002           | 8003        |
| Testnet | 7002           | 7003        |
| Devnet  | 4002           | 5002        |

These are the default ports for connecting with the network. They can be [altered](../configuration.md) later in the [`config.json`](https://github.com/LiskHQ/lisk-core/blob/master/config/mainnet/config.json#L21).

### Install Lisk Commander

Head to the Lisk Commander docs and follow the [installation instructions](../lisk-sdk/lisk-commander/introduction.md#setup).

Once Lisk Commander is set up on your system, you can use the commands below to set up/manage your Lisk Core node.

## Installation

```bash
lisk core:install lisk-mainnet
```

This will install Lisk Core latest version into a directory `lisk-mainnet`.

To verify your node is running correctly, run e.g.

```bash
lisk core:status lisk-mainnet
```

See for all available options the Lisk Commander [Command reference for Lisk Core](../lisk-sdk/lisk-commander/user-guide/lisk-core.md) as well as the [general Command reference](../lisk-sdk/lisk-commander/user-guide/commands.md).

## Post-Install

After installation, check which ports Lisk Core is listening by checking the status:

```bash
lisk core:status lisk-mainnet
```

Check you network settings to verify, the corresponding ports are open.

It's also recommended to set up a [log rotation](../configuration.md#logrotation).

If you are not running Lisk locally, you will need to follow the [Configuration - API](../configuration.md#api-access-control) document to enable access.

With all of the above steps complete you are ready to move on to the configuration documentation if you wish to enable forging or SSL, please see [General Configuration](../configuration.md).

# Option B: The Bash script

## Pre-Install

### Determine if your platform can run Lisk Core

###### Supported Platforms
- Ubuntu 18.04 (LTS) x86_64
- Ubuntu 16.04 (LTS) x86_64

To complete the installation some prerequisites need to be fulfilled. If you have already performed these, please proceed to the [Installation](#installation) chapter. Please follow the instructions below to load the required software to your system.

### Open the necessary ports

>__Mandatory:__ Always open the __WebSocket__ port of your desired network, to enable communication with other peer nodes.<br>
> __Optional:__ Open the corresponding HTTP port for your network, to make your node's [API](https://lisk.io/documentation/lisk-core/api) reachable.<br>
> For more info, see the diagram on the [Interact with network](../../start/interact-with-network.md) page.

To connect to the desired network with Lisk Core, please ensure that the corresponding ports are open:

| Network | HTTP           | WebSocket   |
| --------|----------------|-------------|
| Mainnet | 8000           | 8001        |
| Testnet | 7000           | 7001        |
| Devnet  | 4000           | 5000        |

These are the default ports for connecting with the network. They can be [altered](../configuration.md) later in the [`config.json`](https://github.com/LiskHQ/lisk-core/blob/master/config/mainnet/config.json#L21) file.

### Install dependencies

```bash
sudo apt-get update
sudo apt-get install curl wget tar unzip zip ntp
```

### Create a user to run Lisk

> The `lisk` user itself **does not need** any `sudo` rights to run Lisk Core.

```bash
sudo adduser lisk
```

## Installation

This section details how to install Lisk Core using pre-built binary packages. Once completed, you will have a functioning node on the Lisk Network. If you are looking to upgrade your current Lisk Core installation, please see the [Upgrade Binary](../upgrade/binary.md) section.

### Login to the Lisk user

The user was created in the [Binary - Prerequisites Section](#pre-install). If you are already logged in to this user, please skip this step.

```bash
sudo -u lisk -i
```

### Execute the installation script

This will configure the environment, download and install Lisk Core.
Before proceeding, determine whether you wish to connect your node to the Testnet (Test Network) or the Mainnet (Main Network).

#### Mainnet
Download Lisk Core:
```bash
wget https://downloads.lisk.io/lisk/main/installLisk.sh
```
To connect your node to the Mainnet, run:
```bash
bash installLisk.sh install -r main
```

#### Testnet
Download Lisk Core:
```bash
wget https://downloads.lisk.io/lisk/test/installLisk.sh
```
To connect your node to the Testnet, run:
```bash
bash installLisk.sh install -r test
```

You will be prompted for your installation directory, pressing enter will choose the default.

Next, you will be prompted, if you wish to synchronize from the Genesis block. If you answer 'no', which is the default option, 
the node will download a recent snapshot of the database. This will be much faster than synching from the genesis block. 

The installation may take a few minutes. Check the output of the script to verify that the installation was successful.

If you recognize an error, try to resolve it by analyzing the error output, otherwise, you can have a look at our [Troubleshooting Section](../troubleshooting.md).

### Verify successful installation

When the installation script has finished, navigate inside of the newly created folder `lisk-main`(for Mainnet) or `lisk-test`(for Testnet).
You can verify that your Lisk node is up and running, by running the following command:
```bash
bash lisk.sh status
```
For further information and how to administer your Lisk node, please have a look at our [Administration Section](../administration/binary.md).

If you are not running Lisk locally, you will need to follow the [Configuration - API](../configuration.md#api-access-control) document to enable access.

With all of the above steps complete you are ready to move on to the configuration documentation if you wish to enable forging or SSL, please see [General Configuration](../configuration.md).

## Post-installation (optional)

- Recommended: Set up a [log rotation](../configuration.md#logrotation)
