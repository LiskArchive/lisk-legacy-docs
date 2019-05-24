# The Lisk Protocol

- [Blocks](blocks.md)
- [Transactions](transactions.md) 
- [Consensus](consensus.md)
- [Security](security.md)
- [Peers Communication](p2p-communication.md) 

## What is Lisk?
Lisk is a blockchain application platform created to bring blockchain technology to the world through an SDK (Sidechain Development Kit) written in JavaScript, the most commonly used programming language in the world. 

By utilizing sidechain technology, Lisk’s SDK enables developers to build powerful and scalable blockchain applications, which include custom tokens. With special focus on usability and accessibility, Lisk aims to become the foremost platform for blockchain application development in the world. 

Headquartered in Zug, Switzerland, Lisk raised over 14,000 Bitcoins during its ICO in Q1 2016.

## Lisk Tokens
The utility token used in the Lisk ecosystem is known as Lisk (LSK). 

This token is used to pay the fees associated with sending transactions on the network. Each token also allows the holder to vote for delegates that secure the network within the Lisk DPoS (Delegated Proof of Stake) consensus protocol.

LSK tokens can be acquired through a number of ways, such as purchasing them from an exchange or from another individual using Fiat or Bitcoin (BTC).

## The Lisk Protocol

The Lisk Protocol is a formal set of rules of the Lisk blockchain.

It consists of rules about the [P2P communication](p2p-communication.md), block and transaction formats, the [consensus algorithm](consensus.md), and of rules how [signatures](https://lisk.io/academy/blockchain-basics/how-does-blockchain-work/digital-signatures) and [IDs](security.md) are computed and verified.

The Lisk protocol is constantly evolving. The discussions about planned changed take place at [research.lisk.io](https://research.lisk.io).
The result of the discussions is reflected in LIPs (Lisk Improvement Proposals) in the [LIPs Github repository](https://github.com/LiskHQ/lips) and later as part of documentation on official [Lisk documentation](https://docs.lisk.io).

The protocol defines these rules without a focus on concrete implementation, and it is, therefore, possible to implement it in any compatible programming language.

Currently, the official implementations of the Lisk protocol are [Lisk Core](../lisk-core/introduction.md), [Lisk Framework](../lisk-sdk/lisk-framework/introduction.md) and [Lisk Elements](../lisk-sdk/lisk-elements/introduction.md), which are written in Javascript and Typescript.
