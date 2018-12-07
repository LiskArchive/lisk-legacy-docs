# Lisk Core Source Upgrade

This section details how to upgrade Lisk Core from source. 

1. Stop the node:

    ```bash
    pm2 stop lisk
    ```

2. Pull the latest [tagged release](https://github.com/LiskHQ/lisk/releases) using Git and install node modules.
    ```bash
    git clone https://github.com/LiskHQ/lisk.git
    cd lisk
    git checkout v1.1.0 -b v1.1.0 # check out latest release tag
    npm install
    ```

3. Start the node:

    ```bash
    pm2 start lisk
    ```

Info | Note 
--- | --- 
![info note](../../info-icon.png "Info Note") | **For delegates:** You need to [enable forging](../../user-guide/configuration/configuration.md#forging) again after upgrade.
