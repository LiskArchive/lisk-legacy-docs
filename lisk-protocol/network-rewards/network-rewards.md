Author: max

----

Created: 2018-01-25

----

Updated: 2018-06-25

----

Metadescription: In order to provide an incentive for securing the network, forging rewards and transaction fees are distributed equally among the active delegates.

----

Metakeywords: network rewards, forging

----

Title: Network Rewards & Forging

----

Content: 

---

##Network Rewards

In order to  incentivise delegates to secure the Lisk network, transaction fees are distributed equally among the active delegates. In addition, a block generation reward, also known as a forging reward, is distributed to each block generator.


###Block Rewards

As with the vast majority of other blockchains, Lisk rewards the block generator a fixed amount of tokens per block successfully generated and accepted by the system. In Lisk's system, all active delegates that successfully participate are rewarded for securing the network. 

The timeline for these block rewards are represented in the following figure:

<boxinfo markdown="1">
######Block Reward Reduction
milestones: [
500000000, // Initial Reward begins at block 1,451,520
400000000, // Milestone 1 begins at block 4,451,520
300000000, // Milestone 2 begins at block 7,451,520
200000000, // Milestone 3 begins at block 10,451,520
100000000 // Milestone 4 begins at block 13,451,520
],

</boxinfo>

The block reward linearly decreases over the lifetime of the network, providing significant incentive to participate as an active delegate. The reward will decrease every 3,000,000 blocks from the initial reward block.

###Round Fees

The second incentive provided by the system comes in the form of round fees. A round comes to a close after the number of specified blocks has been generated. During this closure process, all transactional fees are aggregated and subsequently split between all active participants in the round. These fees can provide significant reward for each participant outside of the block generation reward, provided there is significant transactional activity on the network.

It also is possible for a delegate to earn multiple shares of these fees. This may occur if a delegate forges multiple blocks within a round. In most circumstances this will not happen, however occasionally a delegate node may be offline during that delegate's assigned slot and will therefore be unable to generate a block for their assigned slot. This means that the delegate misses their slot and another delegate will generate multiple blocks during that particular round instead.

----

Opengraphtitle: Lisk Protocol - Network Rewards & Forging

----

Opengraphimage: 

----

Opengraphdescription: 

----

Htmltitle: Lisk Protocol - Network Rewards & Forging | Lisk Documentation