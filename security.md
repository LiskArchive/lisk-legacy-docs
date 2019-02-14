# Lisk Security

Lisk uses elliptic curve cryptography and cryptographic hashing in order to secure all aspects of the system. The system uses [EdDSA](https://tools.ietf.org/html/rfc8032) as it provides a robust and fast mechanism for hashing and providing security.
## Key Pair
A key pair consists of a private key and a public key. A private key is a string of numbers and letters only known to the owner of the key. The public key is derived from the private key and can be used to validate that the private key belongs to the owner without providing access to their private key. Elliptic curve cryptography is used to generate cryptographically secure key pairs.

The process used to generate the key pair operates in the following manner:

When a user creates an account, a [BIP39 mnemonics](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) (the passphrase) is generated for the user. This passphrase is hashed using the SHA-256 hash function into a 256-bit string. This hash is subsequently used as a seed in [Ed25519](https://ed25519.cr.yp.to/) to generate the private key ks and derive its public key kp.

![lisk_protocol-keypair](assets/lisk_protocol-keypair.png "lisk_protocol-keypair")

With this private key, the user is able to sign transactions into a transaction object and broadcast that object to the network. The public key is included as part of the transaction and the nodes that receive the transaction are able to verify the validity of the signature using kp. This provides effective security for both the user and the network since ks is known only to the user and kp can validate that the signature is valid.

## Address
An address or the wallet ID is derived from the public key. The public key is hashed using SHA-256, at which point the first 8 bytes of the hash are reversed. The account ID is the numerical representation of those 8 bytes, with the ’L’ character appended at the end. The following figure is the representation of an address and its associated account details.

```json
 {
    "address": "16009998050678037905L",
    "unconfirmedBalance": "0",
    "balance": "0",
    "publicKey": "73ec4adbd8f99f0d46794aeda3c3d86b245bd9d27be2b282cdd38ad21988556b",
    "unconfirmedSignature": 0,
    "secondSignature": 0,
    "secondPublicKey": null,
    "multisignatures": [],
    "u_multisignatures": []
  }
```

## Second passphrase
Lisk also offers the option of an additional layer of security. Using a  [specific type of transaction](../transactions/transactions.md#second-signature-registration-transaction), the user can register a second passphrase that is associated with the account. This relationship requires all subsequent transactions to be additionally signed using the second passphrase in order to be considered valid. The process of generating the second key pair is the same as the one for the initial key pair.

## Multisignature
Lisk also supports multisignature accounts as another security system for users requiring even greater security. A multisignature account is an account that requires multiple keys to authorize a transaction. Any user can enable multisignature on their account by issuing a [special transaction](../transactions/transactions.md#multisignature-registration-transaction) specifying a group of n keys and the minimum number m of signatures required to authorize a transaction. Once this is done, it is mandatory that any transactions originating from that account must be signed by at least m out of the n keys for the transaction to be processed.
