Author: diego

----

Created: 2018-04-25

----

Updated: 2018-06-25

----

Metadescription: This Lisk Elements user guide is your resource for interacting with the `signatures` endpoint provided by the Lisk public API.

----

Metakeywords: lisk elements signatures

----

Title: Signatures Resource

----

Opengraphtitle: Lisk Elements API: Signatures Resource

----

Opengraphimage: 

----

Opengraphdescription: 

----

Content: 

# Lisk Elements API Client: Signatures Resource

This is a resource for interacting with the `signatures` endpoint provided by the Lisk public API. Each of the following methods can be accessed via the `signatures` property of an `APIClient` instance.

### `broadcast`

Submits a signature to sign a multisignature transaction.

#### Syntax

```js
broadcast(signatureObject)
```

#### Parameters

`signatureObject`: See details in the [Core API documentation](/documentation/lisk-core/user-guide/api/1-0).

#### Return value

`Promise`: Resolves to an API response object.

#### Examples

```js
client.signatures.broadcast({
    transactionId: '222675625422353767',
    publicKey: '2ca9a7143fc721fdc540fef893b27e8d648d2288efa61e56264edf01a2c23079',
    signature: '2821d93a742c4edf5fd960efad41a4def7bf0fd0f7c09869aed524f6f52bf9c97a617095e2c712bd28b4279078a29509b339ac55187854006591aa759784c205',
 })
    .then(res => {
        console.log(res.data);
    })
```

----

Htmltitle: Lisk Elements API Client - Signatures Resource | Lisk Documentation