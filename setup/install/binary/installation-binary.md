# Lisk Core Binary Installation

This section details how to install Lisk Core using pre-built binary packages. Once completed, you will have a functioning node on the Lisk Network. If you are looking to upgrade your current Lisk Core installation, please see the [Upgrade Binary](../../../upgrade/binary/upgrade-binary.md) section.

## Login to the Lisk user

The user was created in the [Binary - Prerequisites Section](../../pre-install/binary/preinstall-binary.md). If you are already logged in to this user, please skip this step.

```shell
su - lisk
```

## Execute the installation script

This will configure the environment, download and install Lisk Core.
Before proceeding, determine whether you wish to connect your node to the Testnet (Test Network) or the Mainnet (Main Network).

### Mainnet
Download Lisk Core:
```shell
wget https://downloads.lisk.io/lisk/main/installLisk.sh
```
To connect your node to the Mainnet, run:
```shell
bash installLisk.sh install -r main
```

### Testnet
Download Lisk Core:
```shell
wget https://downloads.lisk.io/lisk/test/installLisk.sh
```
To connect your node to the Testnet, run:
```shell
bash installLisk.sh install -r test
```

You will be prompted for your installation directory, pressing enter will choose the default.

Next you will be prompted, if you wish to synchronize from the Genesis block. If you answer 'no', which is the default option, 
the node will download a recent snapshot of the database. This will be much faster than synching from the genesis block. 

The installation may take a few minutes. Check the scripts output to verify that the installation was successful.

If you recognise an error, try to resolve it by analysing the error output, otherwise you can have a look at our [Troubleshooting Section](../../../troubleshooting/troubleshooting.md).

## Verify successful installation

When the installation script has finished, navigate inside of the newly created folder `lisk-main`(for Mainnet) or `lisk-test`(for Testnet).
You can verify that your Lisk node is up and running, by running the following command:
```shell
bash lisk.sh status
```
For further information and how to administer your Lisk node, please have a look at our [Administration Section](../../../user-guide/administration/binary/admin-binary.md).

If you are not running Lisk locally, you will need to follow the [Configuration - API](../../../user-guide/configuration/configuration.md#api-access-control) document to enable access.

With all of the above steps complete you are ready to move on to the configuration documentation if you wish to enable forging or SSL, please see [General Configuration](../../../user-guide/configuration/configuration.md).

## Post-installation (optional)

### Logrotate Setup

It is recommended to setup a log rotation for the logfile of Lisk Core.

#### Ubuntu
Ubuntu systems provide a service called `logrotate` for this purpose.
First make sure Logrotate is installed on your system:

```shell
logrotate --version
```

Next, go to the logrotate config directory and create a new logrotate file for Lisk Core:

```shell
cd /etc/logrotate.d
vim lisk
```

Inside of this file, define the parameters for the log rotation.

Example values:

```shell
/path/to/lisk/logs/*.log { 
        daily                   # daily rotation
        rotate 5                # keep the 5 most recent logs
        maxage 14               # remove logs that are older than 14 days
        compress                # compress old log files
        delaycompress           # compress the data, after it has been moved
        missingok               # if no logfile is present, ignore
        notifempty              # do not rotate empty log files
}
```

After customizing the config to fit your needs and saving it, you can test it by doing a dry run:

```shell
sudo logrotate /etc/logrotate.conf --debug
```
