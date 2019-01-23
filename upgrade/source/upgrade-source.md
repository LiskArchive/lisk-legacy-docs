# Lisk Core Source Upgrade

This section details how to upgrade Lisk Core from source. 

1. Stop the node:

    ```bash
    npx pm2 stop lisk
    ```

2. Pull the latest [tagged release](https://github.com/LiskHQ/lisk/releases) using Git and install node modules.
    ```bash
    cd lisk # navigate into the root directory of Lisk Core
    git fetch # fetch newest releases
    git checkout vX.Y.Z -b vX.Y.Z # check out latest release tag, see https://github.com/LiskHQ/lisk/releases
    rm -rf node_modules # remove old node modules
    npm ci # install node modules
    ```

3. Start the node again:

    ```bash
    npx pm2 start lisk
    ```

> **Note for delegates:** You need to [enable forging](../../user-guide/configuration/configuration.md#forging) again after upgrade.
