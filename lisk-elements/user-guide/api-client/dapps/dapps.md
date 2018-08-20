Author: diego

----

Created: 2018-04-25

----

Updated: 2018-06-25

----

Metadescription: Please refer to this documentation as a resource for interacting with the `dapps` endpoint provided by the Lisk public API.

----

Metakeywords: lisk elements dapps

----

Title: DApps Resource

----

Opengraphtitle: Lisk Elements API: DApps Resource

----

Opengraphimage: 

----

Opengraphdescription: 

----

Content: 

# Lisk Elements API Client: DApps Resource

This is a resource for interacting with the `dapps` endpoint provided by the Lisk public API. Each of the following methods can be accessed via the `dapps` property of an `APIClient` instance.

### `get`

Searches for a specified dapp in the system.

#### Syntax

```js
get([options])
```

#### Parameters

`options`: See options in the [Core API documentation](/documentation/lisk-core/user-guide/api/1-0).

#### Return value

`Promise`: Resolves to an API response object.

#### Examples

```js
client.dapps.get({ name: 'LiskKitties' })
    .then(res => {
        console.log(res.data);
    })
```

----

Htmltitle: Lisk Elements API Client - DApps Resource | Lisk Documentation