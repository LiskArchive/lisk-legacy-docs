Author: diego

----

Created: 2018-04-25

----

Updated: 2018-06-25

----

Metadescription: This Lisk Elements user guide is your resource for interacting with the `voters` endpoint provided by the Lisk public API.

----

Metakeywords: lisk elements voters

----

Title: Voters Resource

----

Opengraphtitle: Lisk Elements API: Voters Resource

----

Opengraphimage: 

----

Opengraphdescription: 

----

Content: 

# Lisk Elements API Client: Voters Resource

This is a resource for interacting with the `voters` endpoint provided by the Lisk public API. Each of the following methods can be accessed via the `voters` property of an `APIClient` instance.

### `get`

Returns all votes received by a delegate.

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
client.voters.get({ username: 'oliver' })
    .then(res => {
        console.log(res.data);
    })
```

----

Htmltitle: Lisk Elements API Client - Voters Resource | Lisk Documentation
