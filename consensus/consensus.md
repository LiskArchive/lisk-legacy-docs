# Lisk's Consensus Algorithm

Lisk uses Delegated Proof of Stake ([DPoS](https://lisk.io/academy/blockchain-basics/how-does-blockchain-work/delegated-proof-of-stake/)) as its consensus protocol. 

Delegates generate all of the blocks within the system and are elected by the stakeholders, in this case all entities holding LSK tokens. The number of delegates is fixed at 101.  Each stakeholder can vote for up to 101 delegates, and the weight of the vote depends on the amount of LSK the stakeholder possesses. Any stakeholder can vote for a delegate using a vote transaction.

[Consensus](https://lisk.io/academy/blockchain-basics/how-does-blockchain-work/consensus-protocols/) is a key aspect of any blockchain system. It serves a vital purpose in a system where there are countless nodes and all nodes need to agree on the integrity of the data that is being recorded on a blockchain.

## Delegates

A delegate is a type of account that has registered using a delegate registration transaction as described in  [**transactions**](../transactions/transactions.md). These accounts have a key role in the Lisk ecosystem as they generate blocks and validate transactions. Any account can become a delegate, but only the 101 accounts with the most votes weighted by stake are allowed to generate blocks.

## Delegate Round

A delegate round is exactly 101 blocks in length, identical to the total number of forging delegates. During each round, every delegate has one fixed time slot to forge a block. The time slot indicating the position of the delegate in the block generation process is assigned at the beginning of each round. If an elected delegate cannot forge during a round, its slot  will be missed and the round will be extended by 10 seconds. In order to forge a block, the node associated with the delegate inserts up to 25 transactions into the block, signs it and broadcasts that block to the network. Once the block has reached the network, the next delegate will begin to forge in the next assigned slot.

## Broadhash Consensus
Broadhash consensus serves a vital function in the Lisk network in preventing forks. The broadhash of a node is defined as an aggregated rolling hash of the past five blocks present in the node’s database. Thus all peers with the same last blocks will produce the same broadhash and propagate that information via the system headers described in [**peer-to-peer communication**](../peer-to-peer-communication/p2p-comunication.md). Broadhash consensus is established if 51 out of 100 randomly selected peers connected to a node maintain the same broadhash. Delegates use the broadhash consensus as a guidance strategy to generate the block. Once broadhash consensus is established a delegate will generate a block in their assigned slot as described above.


## Block Rewards

As with Bitcoin, and essentially ever other blockchain systems, Lisk rewards the block generator a fixed amount of tokens for each block successfully generated and accepted by the system. In Lisk's system, all active delegates that successfully participate are rewarded for securing the network. 

The timeline for these block rewards are represented in the following table:

Reward | Milestone
--- | --- 
5 LSK| Initial Reward reduction begins at block 1,451,520 |
4 LSK | Milestone 1 begins at block 4,451,520 | 
3 LSK | Milestone 2 begins at block 7,451,520 | 
2 LSK | Milestone 3 begins at block 10,451,520 | 
1 LSK | Milestone 4 begins at block 13,451,520 | 

Which can be found as constants in the code as:

Info | Note 
--- | --- 
![info note](../info-icon.png "Info Note") | Block Reward Reduction
|  | milestones: [
|  | 500000000, // Initial Reward begins at block 1,451,520
|  | 400000000, // Milestone 1 begins at block 4,451,520
|  | 300000000, // Milestone 2 begins at block 7,451,520
|  | 200000000, // Milestone 3 begins at block 10,451,520
|  | 100000000 // Milestone 4 begins at block 13,451,520
|  | ]

The block reward linearly decreases over the lifetime of the network, providing significant incentive to actively participate as an active delegate. The reward will decrease every 3,000,000 blocks from the initial reward block.

## Round Fees

The second incentive provided by the system comes in the form of round fees. A delegate round, described above, comes to a close after the number of specified blocks have been generated. During the closure process, all transactional fees are aggregated and subsequently split between all active participants in the round. These fees can provide reward for each participant apart from the block generation reward, provided there is significant transactional activity in the system.

It is possible for a delegate to forge more than one block within a single round earning more block rewards. In most circumstances this will not occur, however occasionally a delegate node may be offline during the delegate's assigned slot and subsequently will not generate a block. This forces another delegate to step in and generate the block at the end of the round.
