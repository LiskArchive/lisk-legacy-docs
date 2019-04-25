# Lisk Elements API Client: Peers Resource

This is a resource for interacting with the `peers` endpoint provided by the Lisk public API. Each of the following methods can be accessed via the `peers` property of an `APIClient` instance.

### `get`

Searches for specified peers.

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
client.peers.get({ height: 5509963 })
    .then(res => {
        console.log(res.data);
    })
```
