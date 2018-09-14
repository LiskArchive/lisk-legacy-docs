# Lisk Core Source Installation

This section details how to install Lisk Core from Source. When completed, you will have a functioning node on the Lisk Network. If you are looking to upgrade your current Lisk Core installation, please see [Upgrade from Source](/lisk-core/upgrade/source/upgrade-source.md).

## Login as the Lisk user

This user was created in the [ Prerequisites](../../setup/pre-install/source/preinstall-source.md). 
If you are already logged in to this user, please skip this step.

```bash
su - lisk
```

## Installing Lisk from Source

Before proceeding, determine whether you wish to connect your node to the Mainnet (Main Network) or Testnet (Test Network).

Info | Note
---- | ----
![info note](../../../info-icon.png "Info Note") | The described installation process is valid since Lisk Core `1.1` version. If you wish to install the `1.0` version of Lisk Core, please visit the [Lisk Docs Github Repository](https://github.com/LiskHQ/lisk-docs), where you can find a full archived version of [Lisk Core 1.0 documentation](https://github.com/LiskHQ/lisk-docs/blob/core-1.0.0/introduction.md)

```bash
git clone https://github.com/LiskHQ/lisk.git
cd lisk
git checkout v1.1.0 -b v1.1.0 # check out latest release tag
npm install
```

Info | Note
---- | ----
![info note](../../../info-icon.png "Info Note") | Please check for latest release on https://github.com/LiskHQ/lisk/releases

To test that Lisk Core is built and configured correctly, issue the following command to connect to the network:

```bash
node app.js --network [network]
```

Where `[network]` might be either `testnet` or `mainnet`.

If the process is running correctly, no errors are thrown in the logs.
By default, errors will be logged in `logs/lisk.log` only. You can change the logging level in `config.json`.
Once the process is verified as running correctly, `CTRL+C` and start the process with `pm2`.
This will fork the process into the background and automatically recover the process if it fails.

```bash
pm2 start --name lisk app.js -- --network [network]
```
Where `[network]` might be either `testnet` or `mainnet`.

For details on how to manage or stop your Lisk node, please have a look in [Administration from Source](../../../user-guide/administration/source/admin-source.md).

If you are not running Lisk locally, you will need to follow the [Configuration - API](../../../user-guide/configuration/configuration.md#api-access-control) document to enable access.

With all of the above steps complete you are ready to move on to the configuration documentation if you wish to enable forging or SSL. 
Please see [General Configuration](../../../user-guide/configuration/configuration.md) for more information.

## Post-installation (optional)

### Logrotate Setup

It is recommended to setup a log rotation for the logfile of Lisk Core.

#### Ubuntu
Ubuntu systems provide a service called `logrotate` for this purpose.
Please ensure Logrotate is installed on your system:

```bash
logrotate --version
```

Next, go to the logrotate config directory and create a new logrotate file for Lisk Core:

```bash
cd /etc/logrotate.d
vim lisk
```

Inside this file, define the parameters for the log rotation.

Example values:

```bash
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

```bash
sudo logrotate /etc/logrotate.conf --debug
```
