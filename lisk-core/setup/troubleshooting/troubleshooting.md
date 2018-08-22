Author: 

----

Created: 2018-05-15

----

Updated: 2018-07-12

----

Metadescription: Quickly troubleshoot Lisk Core installation with our documentation of known issues and their solutions

----

Metakeywords: Lisk Core Troubleshooting

----

Title: Troubleshooting

----

Opengraphtitle: Lisk Core Troubleshooting

----

Opengraphimage: 

----

Opengraphdescription: 

----

Content: 

# Lisk Core Troubleshooting
 
## Table of contents

### Installation from Binary

- [Installation script fails](#installation-script-fails)

### Installation from Source

- ['npm install' fails with error 'Failed at the sodium@2.0.1 preinstall script.'](#npm-install-fails-with-error)

## Known issues:

### Installation from binary

<a name="installation-script-fails"></a>
#### Installation script fails

##### Problem:
After running `bash installLisk.sh install -r test` the installation script is aborted with the following output:
```shell
Coldstarting Lisk for the first time
√ Postgresql is running.
X Failed to create Postgresql user.
Installation failed. Cleaning up...

Stopping Lisk components before cleanup
√ Lisk stopped successfully.
X Postgresql failed to stop.
√ Postgresql Killed.
```

##### Solution:
PostgreSQLl is already installed on your system.
To solve this issue simply remove postgres by running the following command:
```shell
sudo apt-get --purge remove postgresql postgresql-doc postgresql-common
```

### Installation from Source

<a name="npm-install-fails-with-error"></a>
#### npm install fails with error

##### Problem:
`npm install` fails with error `Failed at the sodium@2.0.1 preinstall script.`

When trying to install the necessary node modules for Lisk Core, the install script fails while trying to build sodium.
This happens for newer versions of npm, which are not supported by core 1.0.0, yet.
 
##### Solution:
Install npm version 3.10.10.

Check if you have the correct Node version installed by running `node -v`
If the version is not ^6.14.1, first install the supported Node version.
```shell
nvm install 6.14.1
```

Example:
```shell
node -v
v6.14.1
npm install npm@3.10.10
```

Should you have any further queries please reach out to one of the team or the Lisk community on [Lisk Chat](https://lisk.chat/home)

----

Htmltitle: Lisk Core - Troubleshooting | Lisk Documentation