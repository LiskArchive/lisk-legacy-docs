# Lisk Core Administration

Subcategories | Description
--- | ---
[Binary](binary/admin-binary.md) | Administration using Binary
[Docker](docker/admin-docker.md) | Administration using Docker
[Source](source/admin-source.md) | Administration for Installation from Source

In this section you can find a list of the basic commands needed to manage your Lisk node on the different distributions, e.g.:

- Start / Stop the Lisk Core process
- Get the status of your Lisk Node
- Create snapshots
- Reload / Rebuild Lisk Core

## Snapshots

A snapshot is a backup of the complete blockchain. It can be used to speed up the sync process, instead of having to validate all transactions starting from genesis block to current block height.
Lisk provides official snapshots of the blockchain, see [http://snapshots.lisk.io](http://snapshots.lisk.io).

> [Creating own snapshots](binary/admin-binary.md#create-snapshot) is only supported for Lisk Core Binary distributions. Rebuilding from snapshot is explained for each distribution in the Administration section.


