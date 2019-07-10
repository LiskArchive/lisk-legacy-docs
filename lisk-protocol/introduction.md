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

The Lisk Protocol is the formal set of rules of the Lisk blockchain.

It defines rules for the [peer-to-peer communication](p2p-communication.md), [block](blocks.md) and [transaction](transactions.md) formats, the [consensus algorithm](consensus.md), and how [signatures](https://lisk.io/academy/blockchain-basics/how-does-blockchain-work/digital-signatures) and [IDs](security.md) are computed and verified.

The Lisk protocol is evolving following the objectives outlined by the [Lisk roadmap](https://lisk.io/roadmap). Changes of the Lisk protocol are formally specified as Lisk Improvement Proposals (LIPs) and published in the [LIPs Github repository](https://github.com/LiskHQ/lips). The process regarding LIPs is described in detail in the [LIP purpose and guidelines](https://github.com/LiskHQ/lips/blob/master/proposals/lip-0001.md) and discussions about possible LIPs take place openly and transparently at [Lisk Research](https://research.lisk.io).
After a LIP comes into effect, i.e., the protocol changes have been adopted by the Lisk blockchain, the official Lisk documentation will be updated accordingly.

The protocol defines these rules without a focus on concrete implementation, and it is, therefore, possible to implement it in any common programming language.

Currently, the official implementations of the Lisk protocol are [Lisk Core](../lisk-core/introduction.md), [Lisk Framework](../lisk-sdk/lisk-framework/introduction.md) and [Lisk Elements](../lisk-sdk/lisk-elements/introduction.md), which are written in Javascript and Typescript.



