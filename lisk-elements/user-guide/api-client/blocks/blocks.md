# Lisk Elements API Client: Blocks Resource

This is a resource for interacting with the `blocks` endpoint provided by the Lisk public API. Each of the following methods can be accessed via the `blocks` property of an `APIClient` instance.

### `get`

Searches for a specified block in the system.

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
client.blocks.get({ blockId: '17572751491778765213' })
    .then(res => {
        console.log(res.data);
    })
```
