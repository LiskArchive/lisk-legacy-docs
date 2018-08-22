Author: mona

----

Created: 2018-05-15

----

Updated: 2018-07-10

----

Metadescription: Learn how to prepare your system for the installation of Lisk Core.  This guide takes you through installation of important dependencies and user creation.

----

Metakeywords: Lisk Core Binary Pre-Installation Setup

----

Title: Binary

----

Opengraphtitle: Lisk Core Binary Pre-install

----

Opengraphimage: 

----

Opengraphdescription: 

----

Content: 

# Lisk Core Binary Pre-Install

This document will detail how to prepare a system for the installation of Lisk Core.  It will guide you through the installation of important dependencies, as well as user creation.

## Determine if your platform can run Lisk Core

<boxsuccess markdown="1">
###### Supported Platforms
- Ubuntu 18.04 x86_64
- Ubuntu 16.04 (LTS) x86_64
- MacOS 10.12 (Sierra)
- MacOS 10.13 (High Sierra)
</boxsuccess>

To complete the installation there are prerequisites that need to be fulfilled.  If you have already performed these, please proceed to the [Installation](/documentation/lisk-core/setup/install/binary) page. Please follow the instructions below to load the required software to your system.

## Open the necessary ports

In order to connect to the desired network with Lisk Core , please ensure that the corresponding ports are open:

| Network | httpPort(HTTP) | wsPort(TCP) |
| --------|----------------|-------------|
| Mainnet | 8000         | 8001        |
| Testnet | 7000           | 7001        |
| Betanet  | 5000           | 5001        |
| Devnet | 4000          | 5000        |

These are the default ports for connecting with the network, they can be altered later in [`config.json`](https://github.com/LiskHQ/lisk/blob/development/config.json#L2).

## Ubuntu Installation Prerequisites

### Install `curl`, `wget`, `tar`, `unzip`, `zip`,`ntp`:

```shell
sudo apt-get update
sudo apt-get install curl wget tar unzip zip ntp
```

### Create a user to run Lisk.

<boxinfo markdown="1">
The `lisk` user itself **does not need** any `sudo` rights to run Lisk Core.
</boxinfo>

```shell
sudo adduser lisk
```

## MacOS Installation Prerequisites

Ensure you are logged in as admin user. Create a new User called 'Lisk', as described [here](https://support.apple.com/kb/PH25796?locale=en_GB).

----

Htmltitle: Lisk Core - Binary Pre-Install | Lisk Documentation

----

Iframe: 

----

Whatsnext: custom

----

Whatsnextheadline: What's next?

----

Whatsnextpagelinktext: Installation from Binary

----

Whatsnextpagelink: documentation/lisk-core/setup/install/binary