# Lisk Core Documentation

### Table of contents

- [Lisk Core Overview](#lisk-core-documentation)
  - [Versions](#versions)
  - [Versioning Schemes](#versioning-schemes)
  - [Upgrade vs Migration](#upgrade-vs-migration)
  - [Networks](#networks)
  - [Distributions](#distributions)
  - [Snapshots](#snapshots)
  - [Architecture](#architecture)
  - [Modules](#modules)
    * [Core Modules](#core-modules)
    * [Custom Modules](#custom-modules)
    * [Module Communication](#module-communication)
    * [Module Lifecycle](#module-life-cycle)
  - [Controller](#controller)
    * [Events](#events)
    * [Actions](#actions)
  - [Components](#components)
    * [Cache](#cache)
    * [Logger](#logger)
    * [Storage](#storage)
    * [System](#system)
  - [Technology stack](#technology-stack)
  - [Contribute to Codebase](#contribute-to-the-codebase)
- Setup
  - [Binary](setup/binary.md)
  - [Docker](setup/docker.md)
  - [Source](setup/source.md)
- Upgrade
  - [Binary](upgrade/binary.md)
  - [Docker](upgrade/docker.md)
  - [Source](upgrade/source.md)  
- [Migration](migration.md)
- Administration
  - [Binary](administration/binary.md)
  - [Docker](administration/docker.md)
  - [Source](administration/source.md)
- [Configuration](configuration.md)
- [API](api.json)
- [Troubleshooting](troubleshooting.md)

[![What is Lisk Core?](https://img.youtube.com/vi/RfF9EPwQDOY/0.jpg)](https://www.youtube.com/watch?v=RfF9EPwQDOY)

Lisk Core is the program that implements the [Lisk Protocol](/lisk-protocol/introduction.md).
Every machine must set it up to run a node that allows for participation in the network.
Setting up Lisk Core enables a user to:

- Connect to a [Network](#networks) and communicate with other nodes in the network.
- Full control to [configure](configuration.md) Lisk Core to specific needs, as required.
- Create your own [snapshots](#snapshots) of the blockchain.
- Use Lisk Core to perform actions on the Lisk blockchain, e.g. with [Lisk Hub](https://github.com/LiskHQ/lisk-docs/blob/master/lisk-hub/introduction.md#network-switcher).
- [Forge](configuration.md#forging) new blocks (if you are an active delegate).

By setting up your node, you contribute to the decentralization of the Lisk network.

An instance of Lisk Core is generally detailed in two different ways: 

> A Lisk Core instance connected to a network is referred to as a Lisk **Node**. 
> A Lisk Node connected to other Lisk Nodes is referred to as a Lisk **Peer**.

Both meanings refer to a machine which, after installing and executing Lisk Core, become a server. The server participates in the network and provides blockchain data to its clients.


## Versions

We release new versions of Lisk Core regularly. Documentation on [lisk.io](https://lisk.io/documentation) will keep up to date with version updates. The Lisk Core version reference below provides an overview of the former releases and documentation versions of Lisk Core.

Software Version | Protocol Version | Release date <br> (yy/mm/dd)| Documentation reference
---     | ---       | ---         | ---
[v1.5.0](https://github.com/LiskHQ/lisk/releases/tag/v1.5.0) | 1.0 | 19/mm/dd | *Current version, live on lisk.io/documentation*
[v1.4.1](https://github.com/LiskHQ/lisk/releases/tag/v1.4.1) | 1.0 | 19/02/14 | [Lisk Core 1.4 docs](https://github.com/LiskHQ/lisk-docs/blob/core-1.4.0/introduction.md)
[v1.3.1](https://github.com/LiskHQ/lisk/releases/tag/v1.3.1) | 1.0 | 18/12/05 | [Lisk Core 1.3 docs](https://github.com/LiskHQ/lisk-docs/blob/core-1.3.0/introduction.md)
[v1.2.1](https://github.com/LiskHQ/lisk/releases/tag/v1.2.1) | 1.0 | 18/11/10 | [Lisk Core 1.2 docs](https://github.com/LiskHQ/lisk-docs/blob/core-1.2.0/introduction.md)
[v1.1.1](https://github.com/LiskHQ/lisk/releases/tag/v1.1.1) | 1.0 | 18/10/23 | [Lisk Core 1.1 docs](https://github.com/LiskHQ/lisk-docs/blob/core-1.1.0/introduction.md)
[v1.0.3](https://github.com/LiskHQ/lisk/releases/tag/v1.0.3) | 1.0 | 18/08/17 | [Lisk Core 1.0 docs](https://github.com/LiskHQ/lisk-docs/blob/core-1.0.0/introduction.md)

## Versioning schemes

Lisk Core is described in 2 different versioning schemes. The **Software Implementation Version** and the **Protocol Version**.

### Software implementation versioning

Any Lisk Core software changes, except for the logging system, are communicated following the exact rules specified by [SemVer](https://semver.org/).

Software implementation versioning has a version prefix `v` followed by a 3 digit notation `<MAJOR>.<MINOR>.<PATCH>` , where the individual digits represent the following types of software changes:

```
v<MAJOR>.<MINOR>.<PATCH> 

v     - Version prefix
MAJOR - Breaking change
MINOR - New feature
PATCH - Bug fix
```

The *software implementation version* follows the popular SemVer scheme and gives a quick overview for developers about breaking and non-breaking changes in the software.

### Protocol versioning

The *protocol version* is denoted by two digits, `H.S.`.
The first digit, `H`, depends on the number of hard forks and is incremented with every hard fork.
`S` represents the number of soft forks since the last hard fork.

> The initial protocol version 1.0 is defined to be the one that was implemented by Lisk Core v1.0.0.

The *protocol version* is used e.g. in P2P Communication between Lisk Core nodes, to determine, if the nodes have compatible versions of the Lisk protocol implemented.

## Upgrade vs Migration

When to upgrade, when to migrate Lisk Core?

Every time that a new software update of Lisk Core introduces a **hard fork** on the network, you need to [migrate](migration.md) your existing Lisk Core version.

In all other cases, you can use the normal **upgrade** process, according to the distribution you are using:
- [Upgrade Lisk Core Binary](upgrade/binary.md)
- [Upgrade Lisk Core Docker](upgrade/docker.md)
- [Upgrade Lisk Core Source](upgrade/source.md)

## Networks

Lisk Core can be connected to different networks.
There are two key public networks, entirely independent of each other, that are always accessible: **Mainnet** and **Testnet**. 

### Mainnet
Mainnet is where the true Lisk economy exists. On this network, Lisk users can transfer LSK tokens from one account to another, register accounts as delegates, vote for other delegates or register dApps. It can be explored via the [Lisk Explorer](https://explorer.lisk.io).

### Testnet
Testnet is an independent replica of the Lisk Mainnet intended as an area to rehearse upgrades before they take place on the Lisk Mainnet. This is where new versions and fixes of Lisk Core are tested. It can be explored via [Lisk Testnet Explorer](https://testnet-explorer.lisk.io).

## Distributions

The 3 supported distributions for Lisk Core are presented below:

### [Binary](setup/binary.md)
The **default** way to setup Lisk Core.
The binary installation is an easy and automated way to set up Lisk Core, this includes nearly completely automated update scripts and a selection of tools to help seamlessly maintain a Lisk Node.

### [Docker](setup/docker.md)
Docker adds support for additional platforms upon which to run a Lisk node, e.g. running a Lisk node inside of a Docker on Windows and connecting it via a custom Node on Lisk Hub to Lisk Core, without the need to rent an additional server.

### [Source](setup/source.md)
This is made for anyone wishing to develop on the Lisk Core codebase. It also comes with an extensive test-suite, detailed in `README.md`. Installation from Source enables a developer to work on the newest codebase for Lisk Core, which might not have been tagged for a release, yet.

## Snapshots

A snapshot is a backup of the complete blockchain. It can be used to speed up the sync process, instead of having to validate all transactions starting from genesis block to current block height.
Lisk provides official snapshots of the blockchain, see [http://snapshots.lisk.io](http://snapshots.lisk.io).

How to rebuild from a snapshot, and how to create your own snapshots is explained in the Administration section for each [distribution](#lisk-core-distributions) of Lisk Core.

> We recommend using [Lisk Core Binary](administration/binary.md#create-snapshot) for creating own snapshots, as it provides a script to create snapshots most convenience.

## Architecture

A simplified overview of the architecture of Lisk Core:

```
+---------------------------------------------------------------------+
|                              LISK CORE                              |
|+-------------------------------------------------------------------+|
||                              MODULES                              ||
||                                                                   ||
||+-------------------------------+ +-------------------------------+||
|||                               | |                               |||
|||        CORE MODULES           | |     PLUGGABLE MODULES         |||
|||                               | |                               |||
||+-------------------------------+ +-------------------------------+||
|+-------------------------------------------------------------------+|
|                                 /|\                                 |
|                                / | \                                |
|                                  |   CHANNELS                       |
|                                \ | /                                |
|                                 \|/                                 |
|+-------------------------------------------------------------------+|
||                            COMPONENTS                             ||
|+-------------------------------------------------------------------+|
||                            CONTROLLER                             ||
|+-------------------------------------------------------------------+|
+---------------------------------------------------------------------+
```

## Modules

Modules are individual building blocks for Lisk Core.

### Core Modules

Core Modules are shipped along with the Lisk Core distribution itself. These modules constitute the minimum requirements to run a functional Lisk Core instance.

### List of Core Modules

* **Chain Module:** handles all events and actions, that are related to the blockchain system.
* **HTTP API Module:** provides API endpoints, that enable users and other programs to communicate with the Lisk blockchain through the API.

### Custom Modules

> The implementation of each module is up-to user but it must inherit from `BaseModule` class and implement its methods.

Custom Modules can be plugged into Lisk Core and may offer new features/capabilities for the application, or replace Core modules functionalities.
They extend the existing instance with a specific (and circumscribed) set of features.

```js
// Exported as main file to javascript package
export default class MyModule extends BaseModule {
    /**
    * Constructor of the module.
    *
     * @param {Object} options - An object of module options
    */
    constructor(options) {
     super(options);
    }

    /**
    * Required.
    *
    * A unique module identifier, that can be accessed through out the system.
    * If some module already registered with the same alias, it will throw an error.
    *
    * @return {string} alias - Return the module alias as string.
    * */
    static get alias(){ return 'moduleAlias'; },

    /**
    * Required.
    *
    * Package meta information.
    *
    * @return {Object} info - JSON object referring the version, module name and module author.  
    */
    static get info(){
        return {
            author: '',
            version: '',
            name: '',
            };
    },

    /**
    * Required.
    *
    * Method which will be invoked by controller to load the module.
    * Make sure all loading logic get completed during the life cycle of load.
    * Controller emit an event `lisk:ready` which you can use to perform
    * some activities which you want to perform when every other module is loaded.
    *
    * @param {Channel} channel - An instance of a communication channel.
    * @return {Promise<void>}
    */
    async load(channel) {},


    /**
     * Supported configurations for the module with default values.
     *
     * @return {Object} defaults - JSON object with default options for the module.
     */
    get defaults() { return {}; },

    /**
     * List of valid events which this module wants to register with the controller.
     * Each event name will be prefixed by module alias, e.g. moduleName:event1.
     * Listing an event means to register the event in the application.
     * Any module can subscribe or publish that event in the application.
     *
     * @return {Array} events - String Array of events.
     */
    get events() { return []; },

    /**
     * Object of valid actions which this module want to register with the controller.
     * Each action name will be prefixed by module alias, e.g. moduleName:action1.
     * Source module can define the action while others can invoke that action.
     *
     * @return {Object} actions - Contains all available action names as key, and the corresponding function as value.
     */
    get actions() {
        return {
            action1: action => {},
        }
    },

    /**
     * Method to be invoked by controller to perform the cleanup.
     *
     * @return {Promise<void>}
     */
    async unload() {},
};
```

### Module Communication

Modules communicate with each other through event-based [channels](#channels).
Modules running in different processes communicate with each other over [IPC channels](#child-process-channel).

By default, modules will run in the same process as the controller, which loads the module.
To load a module in a child process, make sure you have `ipc` enabled in the [config](configuration.md#structure) file and [set the environment variable](administration/source.md#command-line-options) `LISK_CHILD_PROCESS_MODULES` with the module alias.

> If the respective module is using a lot of CPU power, loading a module in a child process can prevent CPU usage bottlenecks.

Multiple modules can be defined by using commas like: `LISK_CHILD_PROCESS_MODULES=httpApi,chain`.

The following methods are available for every module to use:

#### `subscribe`

Used to subscribe to events occurring on the controller.

```js
channel.subscribe("moduleAlias:someEvent", eventObject => {});
```

This function accepts two arguments.
The first is the event name prefixed with the name of the relevant module.
The second argument is a callback which accepts one argument, which will be an instance of an [event object](#specification_channels_event).

#### `publish`

Used to publish events to the controller, which will be delivered to all events subscribers.

```js
channel.publish('myModule:myContext:myEvent', eventObject);
```

This function accepts two arguments.
The first one is the event name prefixed with the name of the relevant module.
The second argument is the data object to be passed along the event.

#### `invoke`

Used to invoke an action for a module.

```js
result = await channel.invoke('moduleAlias:someEvent', actionObject);
```

This function accepts two arguments.
The first one is the event name prefixed with the name of the relevant module.
The second argument is the data object to be passed along the action.

#### Event objects

An event object is a simple JavaScript object with the following attributes.

| Property | Type   | Description                                                  |
| -------- | ------ | ------------------------------------------------------------ |
| name     | string | The name of the event which is triggered.                    |
| module   | string | The name of the target module for which event was triggered. |
| source   | string | The name of source module which published that event.        |
| data     | mixed  | The data which was sent while publishing the event.          |

#### Action objects

An action object is a simple javascript object with attributes listed below.

| Property | Type   | Description                                                       |
| -------- | ------ | ----------------------------------------------------------------- |
| name     | string | Name of the action which is invoked.                              |
| module   | string | The name of the target module for which action was invoked.       |
| source   | string | The name of source module which invoked that action.              |
| params   | mixed  | The data which was associated with the invocation for the action. |

### Module Life Cycle

The [controller](#controller) will load/unload each module one after another.
A modules' life cycle consists of following events in the right order:

**Loading**

* `channel.moduleAlias:registeredToBus`
* `channel.moduleAlias:loading:started`
* `channel.moduleAlias:loading:finished`

**Unloading**

* `channel.moduleAlias:unloading:started`
* `channel.moduleAlias:unloading:finished`

## Channels

### InMemory Channel

Communicates with modules which reside in the same process as the [controller](#controller).

By default, modules will load in the same process as the controller.

### Child Process Channel

Communicates with modules which do not reside in the same process as the Controller.

## Controller

The controller is a parent process, that is responsible for managing every user interaction with each [component](#components) and [module](#modules) of the framework.
E.g. restarting the node, starting a snapshot process, etc.

The controller is responsible for initialization of the infrastructure-level components.
The controller also initializes each module separately.
If any module is configured to load as a child process, then it is the controller's responsibility to do so.
The controller defines a set of events, that each component can subscribe to:

The following events and actions are available for all enabled modules and are at the same time accessible by all enabled modules.

### Events

> Each module can also define its own custom events or actions and will register that list with the controller at the time of initialization.
> The controller contains a complete list of events which may occur in the modules of Lisk Core at any given time.


| Event                       | Description                                                                                                                                                                                                                                    |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| moduleAlias:registeredToBus    | Triggered when the module has completed registering its events and actions with the controller. So when this event is triggered, the subscriber of the event can be sure that the controller has whitelisted its requested events and actions. |
| moduleAlias:loading:started    | Triggered just before the controller calls the module’s `load` method.                                                                                                                                                                         |
| moduleAlias:loading:error      | Triggered if any error occurred during the call of the module's `load` method.                                                                                                                                                                 |
| moduleAlias:loading:finished   | Triggered just after the module’s `load` method has completed execution.                                                                                                                                                                       |
| moduleAlias:unloading:started  | Triggered just before the controller calls the module’s `unload` method.                                                                                                                                                                       |
| moduleAlias:unloading:error    | Triggered if any error occurred during the call of module’s `unload` method.                                                                                                                                                                   |
| moduleAlias:unloading:finished | Triggered just after the module’s `unload` method has completed execution.                                                                                                                                                                     |
| lisk:ready                  | Triggered when the controller has finished initializing the modules and each module has been successfully loaded.                                                                                                                              |

### Actions

| Action                  | Description                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| lisk:getComponentConfig | A controller action to get the configuration of any component defined in controller space. |

## Components

Components are shared objects within the [controller](#controller) layer which any [module](#modules) can utilize.
Components can use [channels](#channels) if required for implementation behavior.
The following components are available currently.

### Cache

This component provides basic caching capabilities, generic enough for any module to use if required.

### Logger

Logger is responsible for all application-level logging activity.
The logger component can be passed to any module, where it can be extended by adding module-specific behaviour.

### Storage

The storage component is responsible for all database activity in the system.
It exposes an interface with specific features for getting or setting particular database entities and a raw handler to the database object so that any module can extend it for its own use.

Find more details about the storage component in the dedicated [LIP](https://github.com/LiskHQ/lips/blob/master/proposals/lip-0011.md).

### System

The system component provides per-module system information. Each module is responsible for keeping the information up-to-date.

It holds the variables and constants critical for the whole application, possibly affecting other modules. For now, those are: "os", "version", "wsPort", "httpPort", "minVersion", "protocolVersion", "height", "nethash", "broadhash" and "nonce".

## Technology stack

The Lisk Core consists of 4 main technologies:

[![Node.js](assets/nodejs.png "Node.js")](https://nodejs.org)

[Node.js](https://nodejs.org/) serves as the underlying engine for code execution in Lisk Core. Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code server-side. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

[![Swagger](assets/swagger-logo.png "Swagger")](https://swagger.io)

[Swagger](https://swagger.io) is an open source software framework backed by a large ecosystem of tools that helps developers design, build, document, and consume RESTful Web services. As part of the Lisk Core documentation, the whole API specification can be explored interactively via the Swagger-UI interface.

[![PostgreSQL](assets/postgresql.png "PostgreSQL")](https://www.postgresql.org)

[PostgreSQL](https://www.postgresql.org) is a powerful, open source object-relational database system with over 30 years of active development which has earned it a strong reputation for reliability, feature robustness, and performance. All Information on the Lisk mainchain is stored inside of PostgreSQL databases.

[![Redis](assets/redis.png "Swagger")](https://redis.io)

[Redis](https://redis.io) is an open source, in-memory data structure store. Lisk Core mainly uses it to cache API responses. This prevents performance drops in the application, for example when the same API request is sent repeatedly.

## Contribute to the Codebase

Everyone is invited to contribute to the Lisk Core project. We welcome and appreciate all contributions. 

### Github
All necessary information can be found on our [Lisk Core Github](https://github.com/LiskHQ/lisk).

### Contribution Guidelines
Please be sure to read and follow our [Contribution Guidelines](https://github.com/LiskHQ/lisk/blob/development/docs/CONTRIBUTING.md).

### Gitter
If you have any further questions please join our [Gitter](https://gitter.im/LiskHQ/lisk).
