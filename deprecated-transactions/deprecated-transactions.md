##Deprecated Transactions

This section acts as historical documentation and is presented for transaction types that are no longer supported, but still active within the system. These transactions refer to legacy applications support and should not be used. 

###Applications Registration Transaction
An [Application Registration Transaction](/documentation/lisk-protocol/transactions)  (type 5) is a transaction used to register an application for a sidechain. The following fields are needed in order to issue an application registration transaction:

Category: the category of the application
Name: the name of the application
Type: the type of the application
Link: a link to download the application

Additional fields can be specified:

Description: the description of the application
Icon: the icon of the application
Tags: tags of the application

Once the required fields have been specified, the system will compute the account's public key, and start building the transaction’s data block described in the following figure:

(image: 7-11-6.png)

At this point the data block is signed using the account's passphrase and the signature is appended to the data block. The system will then compute the fee of the transaction. In the present implementation, the fee for an application registration is 500 LSK. The following is a representation of the resulting JSON object that will be broadcast to the network:

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
            "icon": The icon of the application,
            "tags": Tags of the application
        }
    }
    ...
}
```

The final size of the transaction may vary a depending on the amount of content. In general, the resulting object will range between 150 to 200 bytes. The applicationId will be identical to the transactionId.

###In Transfer Transaction

An In Transfer Transaction is a transaction used to transfer funds from the mainchain to an application’s sidechain. In order to issue an In Transfer Transaction, three fields must be specified:

- Passphrase: the passphrase of the account
- Amount: amount of Lisk to transfer
- dAppID: ID of the application

Once these fields have been specified, the system can then compute the account's public key and begin building the transaction’s data block with a maximum of 73 bytes, as described in the following figure:

(image: 5-8.png)

This data block is signed using the account's passphrase and the signature is appended to the data block. The system will then compute the fee of the transaction. In the present implementation, the fee for an In Transfer is 0.1 LSK. 

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

The final size of the transaction, with the signature, will be 136 bytes. With a second signature it will be 200 bytes.

###Out Transfer Transaction

An Out Transfer Transaction is a transaction used to transfer funds from the application’s sidechain to the mainchain. An Out Transfer transaction may only be issued by the owner of an application. The following fields are required in order to issue an Out Transfer Transaction:

- Secret: the secret of the application owner account
- recipientID: The ID of the user issuing the withdraw
- Amount: the amount of Lisk to transfer
- TransactionID: the ID of the withdraw transaction on the application’s sidechain
- dAppID: The ID of the application

Once these fields have been specified the system will compute the account's public key, and begin building the transaction’s data block with a maximum 93 bytes.

This data block is then signed using the account's passphrase and the signature is appended at the end. The fee for the transaction is then computed. In the present implementation, the fee for an Out Transfer Transaction is 0.1 LSK. 

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
