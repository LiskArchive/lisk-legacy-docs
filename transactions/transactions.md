# Lisk Transactions

An overview of the transactions available on Lisk's network are shown below.  The different transaction types are explained in detail in the respective sections below. Some transaction types are currently disabled (as of 1.0 Core version) since the corresponding functionality is not implemented yet.

**Type** | **Status**     | **Purpose**                                   | **Fee**
---           | ---         | ---                                         | ---
0             | active      | Transmit funds to a specified Lisk address  | 0.1 LSK
1             | active      | Register a second passphrase                |  5 LSK
2             | active      | Register a delegate                         |  25 LSK
3             | active      | Submit vote(s) for delegates                |  1 LSK
4             | active      | Multisignature registration                 | 5 LSK per key in keysgroup
 5            | active      | Register an application on the blockchain   | 25 LSK
 6            | disabled    | Transfer Lisk into a sidechain              | 0.1 LSK
 7            | disabled    | Transfer Lisk out of a sidechain            |  0.1 LSK

## Transaction Signing

Every transaction, regardless of the type, must be signed by the sender prior to being accepted by the network. The process of signing the transaction is identical for every transaction. First, a data block representing the transaction must be generated. Each data block contains a specific set of standardized information. Additional information contained in the data block will differ depending on the type of the transaction. 

The following fields must be present in all types of transactions:

- A 8 bit integer identifying the type of the transaction
- A 32 bit epoch timestamp of when the transaction has been created
- The 256 bit public key of the issuer of the transaction
- A 64 bit integer representing the amount of Lisk to be transferred

The other fields will be added to this schema depending on the transaction type. Once the data block has been generated, it is hashed using the SHA-256 algorithm, and this hash is signed using the key pair of the issuer. If the issuer has enabled a second passphrase, the first signature is appended at the end of the data block, and the process is repeated, generating a second signature. The same concept applies to multisignature accounts. The transactionID is generated from the data block. In order to compute the transactionID the system takes the data block with the completed signature information and hashes this block using SHA-256 and the first 8 bytes of the hash are reversed and which is then used as the transactionID. 

A signed transaction uses the following flow:

![lisk_protocol-txid](lisk_protocol-txid.png "lisk_protocol-txid")

With a second signature the flow looks like this:

![lisk_protocol-2ndtxid](lisk_protocol-2ndtxid.png "lisk_protocol-2ndtxid")

## Balance Transfer Transaction

A balance transfer transaction (type 0) is a transfer of LSK from one account to another account. In order to issue a balance transfer transaction, a transaction object must be created.

First, the public key of the sender is computed using the passphrase, as described in [Lisk Security](/documentation/lisk-protocol/security). Then the data block is created using the process outlined in  [transaction signing](/documentation/lisk-protocol/transactions#transaction-signing)  and the id of the account to whom the LSK is being transferred is added to the object. The resulting data block is 53 bytes.

At this point the block is signed using the method described in  [Lisk Security](/documentation/lisk-protocol/security). The final step of the transaction generation process is to compute the fee of the transaction. In the current system, the fee is fixed at 0.1 Lisk. Once all of these steps have been completed and the transaction has been validated, the transaction can be broadcast to the network. While the transaction may be present on the network, it will remain in "Unconfirmed" status until it has been processed by a delegate. When the transaction is broadcast to the network, it is sent as a JSON object using the API. 

Optionally, the user can include a data field to the balance transfer transaction. This data field has a maximum length of 64 bytes and can be used to append messages to the transactions. With sidechains fully functional, this data field will be useful to exchange information relative to dApps or sidechain state. This optional field does not require to spend any extra fee.

The following figure is a representation of a default transaction object (no optional data field included):

![lisk_protocol-type0](lisk_protocol-type0.png "lisk_protocol-type0")

The following figure is a representation of the JSON.

```json
{
    "type": 0,
    "amount": Amount,
    "senderPublicKey": Public key of the sender,
    "timestamp": Timestamp,
    "recipientId": Id of the recipient,
    "signature": Signature of the data block,
    "id": Id of the transaction,
    "fee": 10000000,
    "senderId": Id of the sender,
    ...
}
```

The final size of a balance transfer transaction with no second passphrase is 117 bytes, and 181 bytes with a second passphrase.

## Second Signature Registration Transaction

A second signature registration transaction (type 1) is used to register a second passphrase on the blockchain. In order to issue this type of transaction the following information must be provided:

- passphrase: the passphrase of the account.
- second passphrase: the desired second passphrase.

Once those two parameters have been specified the system will begin building the transaction. The second public key is generated from the second passphrase, and the system builds the data block of 85 bytes.

This data block is then signed using the user’s passphrase, and the signature is appended to the object. Following this the computation of the fee is performed for the transaction type. In the existing implementation the fee for a signature transaction is fixed at 5 LSK. 

The resulting object is represented by the following diagram:

![lisk_protocol-type1](lisk_protocol-type1.png "lisk_protocol-type1")

The JSON object that will be broadcast on the network is shown below:

```json
{
    "type": 1,
    "amount": 0,
    "senderPublicKey": Public key of the sender,
    "timestamp": Timestamp,
    "recipientId": null,
    "signature": Signature of the data block,
    "id": Id of the transaction,
    "fee": 500000000,
    "senderId": Id of the sender,
    "asset": {
        "signature": {
            "publicKey": The public key associated with the second passphrase
        }
    }
    ...
}
```

The final size of the transaction, with the signature, is 149 bytes.

## Delegate Registration Transaction

A delegate transaction (type 2) is used to register an account as a [delegate](/documentation/lisk-protocol/consensus). In order to issue a delegate registration transaction the following parameters are required:

- passphrase: the passphrase of the account.
- username: the delegate’s username.

The length of the username must be at least one character and at most twenty characters. Once those parameters have been provided, the system can then compute the sender account's public key, and begin building the transaction’s data block with a maximum 73 bytes. In case of second passphrase or multisignature registered in the address, the corresponding fields must be specified too.

This data block is then signed using the account's passphrase, and the signature is appended to the transaction object. At this point, the system computes the fee of the transaction. In the present implementation, the fee for a delegate registration transaction is fixed and costs 25 LSK. 

The resulting object is represented by the following diagram:

![lisk_protocol-type2](lisk_protocol-type2.png "lisk_protocol-type2")

The JSON object that will be broadcast to the network follows the format below:

```json
{
    "type": 2,
    "amount": 0,
    "senderPublicKey": Public key of the sender,
    "timestamp": Timestamp,
    "recipientId": null,
    "signature": Signature of the data block,
    "id": Id of the transaction,
    "fee": 10000000000,
    "senderId": Id of the sender,
    "asset": {
        "delegate": {
            "username": The chosen username
            "publicKey": The public key of the delegate (the sender)
        }
    }
    ...
}
```

The final maximum size of the transaction, with the signature, is 137 bytes, and with a second signature, 201 bytes.

## Vote Transaction

A vote transaction (type 3) is a transaction used to vote for delegates. In order to issue a vote transaction, the following two parameters are required:

- passphrase: the passphrase of the account.
- votes: an array of votes.

A vote is a delegate’s public key prepended with a ’+’ to vote for the corresponding delegate and a ’-’  if the account wants to remove the vote for the delegate. The maximum number of vote applications in one transaction is 33. Once the aforementioned information is provided, the system can then compute the sender account's public key, and start building the transaction’s data block with a maximum 2198 bytes. In case of second passphrase or multisignature registered in the address, the corresponding fields must be specified too.

This data block is then signed using the account's passphrase, and the signature is appended to the transaction object. The system will then compute the fee of the transaction. In the current implementation, the fee for a vote transaction is fixed at 1 LSK. 

The resulting object is represented by the following diagram:

![lisk_protocol-type3](lisk_protocol-type3.png "lisk_protocol-type3")

The JSON object that will be broadcast to the network is the follows the format below:

```json
{
    "type": 3,
    "amount": 0,
    "senderPublicKey": Public key of the sender,
    "timestamp": Timestamp,
    "recipientId": Id of the sender,
    "signature": Signature of the data block,
    "id": Id of the transaction,
    "fee": 100000000,
    "senderId": Id of the sender,
    "asset": {
        "votes": Array of votes
    }
    ...
}
```

The final maximum size of the transaction, with the signature is 2262 bytes, and with the second signature is 2326 bytes.

## Multisignature Registration Transaction

A multisignature registration transaction (type 4) is a transaction used to add a  [multisignature](/documentation/lisk-protocol/security#multisignature)  to an account. The following parameters are needed in order to issue a multisignature registration transaction:

- passphrase: the passphrase of the account the multisignature will be applied to.
- keysgroup: the array of keys to add to the multisignature account.
- min: the minimum number of signatures required to validate a transaction.
- lifetime: the time to wait for enough signatures before removing the transaction.

Each public key  in keysgroup is prepended with a ’+’ if the key is to be added to the multisignature account. The minimum number of signatures required to validate a transaction must be at least 2 and at most 16. The minimum number of keys in the keysgroup is two. The lifetime is specified in hours and must be at least 1 hour and at most 72 hours. Once this information is provided, the system will compute the sender account's public key, and start building the transaction’s data block. The size of the data block depends on the  number of keys added to the multisignature registration transaction. Each key is 65 bytes due to the addition of the modifier.

This data block is then signed using the user’s passphrase, and the signature is appended to the transaction object. The system will then compute the fee of the transaction. In the present implementation the fee for a multisignature registration transaction is 5 LSK per key in the keysgroup. Note that the key of the account issuing the transaction is implicitly added in the multisignature. 

The resulting object is represented by the following diagram:

![lisk_protocol-type4](lisk_protocol-type4.png "lisk_protocol-type4")

The JSON object that will be broadcast to the network follows the format below:

```json
{
    "type": 4,
    "amount": 0,
    "senderPublicKey": Public key of the sender,
    "timestamp": Timestamp,
    "recipientId": null,
    "signature": Signature of the data block,
    "id": Id of the transaction,
    "fee": Transaction fee,
    "senderId": Id of the sender,
    "asset": {
        "multisignature": {
            "min": The minimum of signature required,
            "lifetime": The lifetime of the transaction,
            "keysgroup": Array of keys to add in the multisignature
        }
    }
    ...
}
```

The final size of a transaction with two keys in the keys group is 249 bytes, and 313 bytes if the account has a second passphrase enabled.

## Applications Registration Transaction
An application registration transaction (type 5) is a transaction used to register an application used for a sidechain. The following parameters are needed in order to issue an application registration transaction:

- category: the category of the application
- name: the name of the application
- type: the type of the application
- link: a link to download the application

Additional fields can be specified:

- description: the description of the application
- icon: the icon of the application
- tags: tags of the application

Once those fields have been specified, the system will compute the sender account's public key, and start building the transaction’s data block described in the following figure (note that if second passphrase or multisignature are registered in the address, the corresponding fields must be specified too):

![lisk_protocol-type5a](lisk_protocol-type5a.png "lisk_protocol-type5a")

This data block is then signed using the account's passphrase, and the signature is appended to the data block. The system will then compute the fee of the transaction. In the present implementation, the fee for an application registration is 25 LSK. The following is a representation of the resulting JSON object that will be broadcast to the network:

```json
{
    "type": 5,
    "amount": 0,
    "senderPublicKey": Public key of the sender,
    "timestamp": Timestamp,
    "recipientId": null,
    "signature": Signature of the data block,
    "id": Id of the transaction,
    "fee": 50000000000,
    "senderId": Id of the sender,
    "asset": {
        "dapp": {
            "category": The category of the application,
            "name": The name of the application,
            "type": The type of the application,
            "link": The link of the application,
            "description": The description of the application,
            "icon": The link for the icon of the application,
            "tags": Tags of the application
        }
    }
    ...
}
```

The final size of the transaction may vary depending on the amount of content. In general, the resulting object will range between 150 to 200 bytes. The applicationID will be identical to the transactionID.

---

## Disabled Types

These transaction types are currently disabled (as of 1.0 Core version) as the sidechain and bridge functionalities are not yet implemented. However, they are already defined and will be available when the functionalities are released.

### In Transfer Transaction

An In Transfer transaction is a transaction used to transfer funds from the main chain to an application’s sidechain. In order to issue an In Transfer transaction, three parameters must be specified:

- passphrase: the passphrase of the account
- amount: amount of LSK to transfer
- dAppID: ID of the application

Once this information is given, the system can compute the sender account's public key and begins building the transaction’s data block with a maximum of 73 bytes as described in the following figure (note that if second passphrase or multisignature are registered in the address, the corresponding fields must be specified too):

![lisk_protocol-type6](lisk_protocol-type6.png "lisk_protocol-type6")

This data block is then signed using the account's passphrase, and the signature is appended to the data block. The system will then compute the fee of the transaction. In the present implementation, the fee for an In Transfer transaction is 0.1 LSK. 

The following is a representation of the resulting JSON object that will be broadcast to the network:

```json
{
    "type": 6,
    "amount": Amount to transfer,
    "senderPublicKey": Public key of the sender,
    "timestamp": Timestamp,
    "recipientId": null,
    "signature": Signature of the data block,
    "id": Id of the transaction,
    "fee": 10000000,
    "senderId": Id of the sender,
    "asset": {
        "inTransfer": {
            "dappId": Id of the application
        }
    }
    ...
}
```

The final size of the transaction, with the signature, will be 136 bytes, and with a second signature, 200 bytes.

### Out Transfer Transaction

An Out Transfer transaction is a transaction used to transfer funds from the application’s sidechain to the mainchain. An Out Transfer transaction may only be issued by the owner of an application. The following information is required in order to issue an Out Transfer transaction:

- passphrase: the passphrase of the account owner
- recipientID: the ID of the user issuing the withdraw
- amount: the amount of LSK to transfer
- transactionID: the ID of the withdraw transaction on the application’s sidechain
- dAppID: the ID of the application

Once this information is given, the system will compute the sender account's public key and begins building the transaction’s data block with a maximum of 93 bytes (note that if second passphrase or multisignature are registered in the address, the corresponding fields must be specified too).

This data block is then signed using the account's passphrase, and the signature is appended at the end. The fee of the transaction is then computed. In the present implementation, the fee for an Out Transfer transaction is 0.1 LSK. 

The following is a representation of the resulting JSON object that will be broadcast to the network:

```json
{
    "type": 7,
    "amount": Amount to transfer,
    "senderPublicKey": Public key of the sender,
    "timestamp": Timestamp,
    "recipientId": Id of the recipient,
    "signature": Signature of the data block,
    "id": Id of the transaction,
    "fee": 10000000,
    "senderId": Id of the sender,
    "asset": {
        "outTransfer": {
            "dappId": Id of the application,
            "transactionId": Id of the withdrawal transaction
        }
    }
    ...
}
```

The final size of the transaction, with the signature, is 157 bytes, with a second signature it is 221 bytes.
