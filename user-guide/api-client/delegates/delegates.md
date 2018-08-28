Author: diego

----

Created: 2018-04-25

----

Updated: 2018-06-25

----

Metadescription: This Lisk Elements user guide is your resource for interacting with the `delegates` endpoint provided by the Lisk public API.

----

Metakeywords: lisk elements delegates

----

Title: Delegates Resource

----

Opengraphtitle: Lisk Elements API: Delegates Resource

----

Opengraphimage: 

----

Opengraphdescription: 

----

Content: 

# Lisk Elements API Client: Delegates Resource

This is a resource for interacting with the `delegates` endpoint provided by the Lisk public API. Each of the following methods can be accessed via the `delegates` property of an `APIClient` instance.

### `get`

Searches for a specified delegate in the system.

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
client.delegates.get({ username: 'oliver' })
    .then(res => {
        console.log(res.data);
    })
```

### `getStandby`

Calls `get` with default parameters to retrieve delegates from rank 102 onwards.

#### Syntax

```js
getStandby([options])
```

#### Parameters

`options`: See options in the [Core API documentation](/lisk-core/user-guide/api/1-0/1-0.json).

#### Return value

`Promise`: Resolves to an API response object.

#### Examples

```js
client.delegates.getStandby()
    .then(res => {
        console.log(res.data);
    })
```

### `getForgers`

Returns a list of the next forgers in this delegate round.

#### Syntax

```js
getForgers([options])
```

#### Parameters

`options`: See options in the [Core API documentation](/lisk-core/user-guide/api/1-0/1-0.json).

#### Return value

`Promise`: Resolves to an API response object.

#### Examples

```js
client.delegates.getForgers()
    .then(res => {
        console.log(res.data);
    })
```

### `getForgingStatistics`

By passing an existing delegate address and the desired unix timestamps, you can get its forging statistics within the specified timespan. If no timestamps are provided, it will use the timestamps from Lisk epoch to current date.

#### Syntax

```js
getForgingStatistics(address, [options])
```

#### Parameters

`address`: Address of the delegate to query.

`options`: See options in the [Core API documentation](/lisk-core/user-guide/api/1-0/1-0.json).

#### Return value

`Promise`: Resolves to an API response object.

#### Examples

```js
client.delegates.getForgingStatistics('15434119221255134066L')
    .then(res => {
        console.log(res.data);
    })
```

----

Htmltitle: Lisk Elements API Client - Delegates Resource | Lisk Documentation
