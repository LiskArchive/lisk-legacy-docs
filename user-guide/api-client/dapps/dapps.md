# Lisk Elements API Client: DApps Resource

This is a resource for interacting with the `dapps` endpoint provided by the Lisk public API. Each of the following methods can be accessed via the `dapps` property of an `APIClient` instance.

### `get`

Searches for a specified dapp in the system.

#### Syntax

```js
get([options])
```

#### Parameters

`options`: See options in the [Core API documentation](/lisk-core/user-guide/api/1-0/1-0.json).

#### Return value

`Promise`: Resolves to an API response object.

#### Examples

```js
client.dapps.get({ name: 'LiskKitties' })
    .then(res => {
        console.log(res.data);
    })
```

