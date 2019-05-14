![Logo](assets/banner_framework.png)

# Lisk Framework

[![Build Status](https://jenkins.lisk.io/buildStatus/icon?job=lisk-core/development)](https://jenkins.lisk.io/job/lisk-core/job/development)
[![Coverage Status](https://coveralls.io/repos/github/LiskHQ/lisk/badge.svg?branch=development)](https://coveralls.io/github/LiskHQ/lisk?branch=development)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
<a href="https://david-dm.org/LiskHQ/lisk"><img src="https://david-dm.org/LiskHQ/lisk.svg" alt="Dependency Status"></a>
<a href="https://david-dm.org/LiskHQ/lisk/?type=dev"><img src="https://david-dm.org/LiskHQ/lisk/dev-status.svg" alt="devDependency Status"></a>

## What is the Lisk Framework

Lisk Framework is an application framework responsible for establishing and maintaining the interactions between the modules of a Lisk blockchain application.

Lisk Framework aims to provide a consistent and intuitive interface between each module and component.
Currently, Lisk Framework establishes interactions between the `chain`, `api` and `network` modules.

### Architecture Overview

The architecture of Lisk Framework follows the research documented in [LIP0005](https://github.com/LiskHQ/lips/blob/master/proposals/lip-0005.md). The diagram below provides a high-level overview of the architecture:

![Logo](assets/diagram_framework.png)

### Modules

Modules are individual building blocks for Lisk Core.

#### Core Modules

Core Modules are shipped along with the Lisk Core distribution itself. These modules constitute the minimum requirements to run a functional Lisk Core instance.

##### List of Core Modules

* **Chain Module:** handles all events and actions, that are related to the blockchain system.
* **API Module:** provides HTTP API endpoints, that enable users and other programs to interact with the Lisk blockchain through the API.
* **Network Module:** handles peer-to-peer communication of nodes in the network.

#### Custom Modules

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

#### Module Communication

Modules communicate with each other through event-based [channels](#channels).
Modules running in different processes communicate with each other over [IPC channels](#child-process-channel).

By default, modules will run in the same process as the controller, which loads the module.
To load a module in a child process, make sure you have `ipc` enabled in the [config](configuration.md#structure) file and [set the environment variable](administration/source.md#command-line-options) `LISK_CHILD_PROCESS_MODULES` with the module alias.

> If the respective module is using a lot of CPU power, loading a module in a child process can prevent CPU usage bottlenecks.

Multiple modules can be defined by using commas like: `LISK_CHILD_PROCESS_MODULES=httpApi,chain`.

#### Module Life Cycle

The [controller](#controller) will load/unload each module one after another.
A modules' life cycle consists of following events in the right order:

**Loading**

* `channel.moduleAlias:registeredToBus`
* `channel.moduleAlias:loading:started`
* `channel.moduleAlias:loading:finished`

**Unloading**

* `channel.moduleAlias:unloading:started`
* `channel.moduleAlias:unloading:finished`

### Channels

#### InMemory Channel

Communicates with modules which reside in the same process as the [controller](#controller).

By default, modules will load in the same process as the controller.

#### Child Process Channel

Communicates with modules which do not reside in the same process as the Controller.

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

### Controller

The controller is a parent process, that is responsible for managing every user interaction with each [component](#components) and [module](#modules) of the framework.
E.g. restarting the node, starting a snapshot process, etc.

The controller is responsible for initialization of the infrastructure-level components.
The controller also initializes each module separately.
If any module is configured to load as a child process, then it is the controller's responsibility to do so.
The controller defines a set of events, that each component can subscribe to:

The following events and actions are available for all enabled modules and are at the same time accessible by all enabled modules.

#### Events

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

#### Actions

| Action                  | Description                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| lisk:getComponentConfig | A controller action to get the configuration of any component defined in controller space. |

### Components

Components are shared objects within the [controller](#controller) layer which any [module](#modules) can utilize.
Components can use [channels](#channels) if required for implementation behavior.
The following components are available currently.

#### Cache

This component provides basic caching capabilities, generic enough for any module to use if required.

#### Logger

Logger is responsible for all application-level logging activity.
The logger component can be passed to any module, where it can be extended by adding module-specific behaviour.

#### Storage

The storage component is responsible for all database activity in the system.
It exposes an interface with specific features for getting or setting particular database entities and a raw handler to the database object so that any module can extend it for its own use.

Find more details about the storage component in the dedicated [LIP](https://github.com/LiskHQ/lips/blob/master/proposals/lip-0011.md).

## Get Involved

| Reason                           | How                                                                                            |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| Want to chat with our community  | [Chat with them on Lisk.chat](http://lisk.chat)                                                |
| Want to chat with our developers | [Chat with them on Gitter](https://gitter.im/LiskHQ/lisk)                                      |
| Found a bug                      | [Open a new issue](https://github.com/LiskHQ/lisk/issues/new)                                  |
| Found a security issue           | [See our bounty program](https://blog.lisk.io/announcing-lisk-bug-bounty-program-5895bdd46ed4) |
| Want to share your research      | [Propose your research](https://research.lisk.io)                                              |
| Want to develop with us          | [Create a fork](https://github.com/LiskHQ/lisk/fork)                                           |
