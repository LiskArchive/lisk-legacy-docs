# Lisk Core Binary Setup

- [Pre-Install](#pre-install)
  1. [Determine if your platform can run Lisk Core](#determine-if-your-platform-can-run-lisk-core)
  2. [Open necessary ports](#open-the-necessary-ports)
  3. [Install dependencies](#install-dependencies)
  4. [Create `lisk` user](#create-a-user-to-run-lisk)
- [Installation](#installation)
  1. [Login as lisk user](#login-to-the-lisk-user)
  2. [Execute the installation script](#execute-the-installation-script)
  3. [Verify successful installation](#verify-successful-installation)
- [Post-Installation (optional)](#post-installation-optional)
  - [Logrotate Setup](#logrotate-setup)
  

## Pre-Install

This document will detail how to prepare a system for the installation of Lisk Core.  It will guide you through the installation of important dependencies, as well as user creation.

### Determine if your platform can run Lisk Core

###### Supported Platforms
- Ubuntu 18.04 x86_64
- Ubuntu 16.04 (LTS) x86_64

To complete the installation some prerequisites need to be fulfilled.  If you have already performed these, please proceed to the [Installation](#installation) chapter. Please follow the instructions below to load the required software to your system.

### Open the necessary ports

To connect to the desired network with Lisk Core, please ensure that the corresponding ports are open:

| Network | httpPort(HTTP) | wsPort(TCP) |
| --------|----------------|-------------|
| Mainnet | 8000           | 8001        |
| Testnet | 7000           | 7001        |
| Betanet | 5000           | 5001        |
| Devnet  | 4000           | 5000        |

These are the default ports for connecting with the network, they can be altered later in [`config.json`](https://github.com/LiskHQ/lisk/blob/development/config.json#L2).

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
su - lisk
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

### Logrotate Setup

It is recommended to setup a log rotation for the logfile of Lisk Core.

#### Ubuntu
Ubuntu systems provide a service called `logrotate` for this purpose.
First, make sure Logrotate is installed on your system:

```bash
logrotate --version
```

Next, create a new file called `lisk` in the logrotate directory `/etc/logrotate.d`:

```bash
cd /etc/logrotate.d
touch lisk
```

Inside of this file, define the parameters for the log rotation.

Example values:

```bash
/path/to/lisk/logs/mainnet/*.log { 
        daily                   # daily rotation
        rotate 5                # keep the 5 most recent logs
        maxage 14               # remove logs that are older than 14 days
        compress                # compress old log files
        delaycompress           # compress the data after it has been moved
        missingok               # if no logfile is present, ignore
        notifempty              # do not rotate empty log files
}
```

After customizing the config to fit your needs and saving it, you can test it by doing a dry run:

```bash
sudo logrotate /etc/logrotate.conf --debug
```
