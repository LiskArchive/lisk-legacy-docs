# Lisk Elements API Client: Node Resource

This is a resource for interacting with the `node` endpoint provided by the Lisk public API. Each of the following methods can be accessed via the `node` property of an `APIClient` instance.

### `getConstants`

Returns all current constants data on the system, e.g. Lisk epoch time and version.

#### Syntax

```js
getConstants([options])
```

#### Parameters

`options`: See options in the [Core API documentation](/documentation/lisk-core/user-guide/api/1-0).

#### Return value

`Promise`: Resolves to an API response object.

#### Examples

```js
client.node.getConstants()
    .then(res => {
        console.log(res.data);
    })
```

### `getStatus`

Returns all current status data of the node, e.g. height and broadhash.

#### Syntax

```js
getStatus([options])
```

#### Parameters

`options`: See options in the [Core API documentation](/documentation/lisk-core/user-guide/api/1-0).

#### Return value

`Promise`: Resolves to an API response object.

#### Examples

```js
client.node.getStatus()
    .then(res => {
        console.log(res.data);
    })
```

### `getForgingStatus`

_Attention! This is a **private endpoint only authorized to whitelisted IPs**._

Responds with the forging status of a delegate on a node.

#### Syntax

```js
getForgingStatus([options])
```

#### Parameters

`options`: See options in the [Core API documentation](/documentation/lisk-core/user-guide/api/1-0).

#### Return value

`Promise`: Resolves to an API response object.

#### Examples

```js
client.node.getForgingStatus()
    .then(res => {
        console.log(res.data);
    })
```

### `updateForgingStatus`

_Attention! This is a **private endpoint only authorized to whitelisted IPs**._

Upon passing the correct password and publicKey, forging will be enabled or disabled for the delegate of this particular node. The password can be generated locally by encrypting your passphrase, either by using Lisk Commander or with Lisk Elements.

#### Syntax

```js
updateForgingStatus([options])
```

#### Parameters

`options`: See options in the [Core API documentation](/documentation/lisk-core/user-guide/api/1-0).

#### Return value

`Promise`: Resolves to an API response object.

#### Examples

```js
client.node.updateForgingStatus({
    forging: true,
    password: 'happy tree friends',
    publicKey: '968ba2fa993ea9dc27ed740da0daf49eddd740dbd7cb1cb4fc5db3a20baf341b',
})
    .then(res => {
        console.log(res.data);
    })
```

### `getTransactions`

By specifying the state of the transactions, you get a list of unprocessed transactions matching this state.

#### Syntax

```js
getTransactions(state, [options])
```

#### Parameters

`state`: One of `unprocessed`, `unconfirmed` or `unsigned`.

`options`: See options in the [Core API documentation](/documentation/lisk-core/user-guide/api/1-0).

#### Return value

`Promise`: Resolves to an API response object.

#### Examples

```js
client.node.getTransactions('unconfirmed')
    .then(res => {
        console.log(res.data);
    })
```
