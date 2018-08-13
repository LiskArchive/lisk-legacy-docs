Author: diego

----

Created: 2018-04-25

----

Updated: 2018-06-25

----

Metadescription: This Lisk Elements user guide is your resource for interacting with the `transactions` endpoint provided by the Lisk public API.

----

Metakeywords: lisk elements transactions

----

Title: Transactions Resource

----

Opengraphtitle: Lisk Elements API: Transactions Resource

----

Opengraphimage: 

----

Opengraphdescription: 

----

Content: 

# Lisk Elements API Client: Transactions Resource

This is a resource for interacting with the `transactions` endpoint provided by the Lisk public API. Each of the following methods can be accessed via the `transactions` property of an `APIClient` instance.

### `get`

Searches for a specified transaction in the system.

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
client.transactions.get({ id: '222675625422353767' })
    .then(res => {
        console.log(res.data);
    })
```

### `broadcast`

Submits a signed transaction object for processing by the transaction pool.

#### Syntax

```js
broadcast(transaction)
```

#### Parameters

`transaction`: See details in the [Core API documentation](/documentation/lisk-core/user-guide/api/1-0).

#### Return value

`Promise`: Resolves to an API response object.

#### Examples

```js
client.transactions.broadcast({
    id: '222675625422353767',
    amount: '150000000',
    fee: '1000000',
    type: 0,
    timestamp: 28227090,
    senderId: '12668885769632475474L',
    senderPublicKey: '2ca9a7143fc721fdc540fef893b27e8d648d2288efa61e56264edf01a2c23079',
    senderSecondPublicKey: '2ca9a7143fc721fdc540fef893b27e8d648d2288efa61e56264edf01a2c23079',
    recipientId: '12668885769632475474L',
    signature: '2821d93a742c4edf5fd960efad41a4def7bf0fd0f7c09869aed524f6f52bf9c97a617095e2c712bd28b4279078a29509b339ac55187854006591aa759784c205',
    signSignature: '2821d93a742c4edf5fd960efad41a4def7bf0fd0f7c09869aed524f6f52bf9c97a617095e2c712bd28b4279078a29509b339ac55187854006591aa759784c205',
    signatures: [
        '72c9b2aa734ec1b97549718ddf0d4737fd38a7f0fd105ea28486f2d989e9b3e399238d81a93aa45c27309d91ce604a5db9d25c9c90a138821f2011bc6636c60a',
    ],
    asset: {},
})
    .then(res => {
        console.log(res.data);
    })
```

----

Htmltitle: Lisk Elements API Client - Transactions Resource | Lisk Documentation