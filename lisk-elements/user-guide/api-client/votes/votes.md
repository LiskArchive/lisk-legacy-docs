# Lisk Elements API Client: Votes Resource

This is a resource for interacting with the `votes` endpoint provided by the Lisk public API. Each of the following methods can be accessed via the `votes` property of an `APIClient` instance.

### `get`

Returns all votes placed by an account.

#### Syntax

```js
get(options)
```

#### Parameters

`options`: See options in the [Core API documentation](/lisk-core/user-guide/api/1-0/1-0.json).

#### Return value

`Promise`: Resolves to an API response object.

#### Examples

```js
client.votes.get({ address: '15434119221255134066L' })
    .then(res => {
        console.log(res.data);
    })
```
