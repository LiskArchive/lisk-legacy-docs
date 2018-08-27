#  Lisk Explorer Tools

Lisk Explorer has many tools to make it easier for you to access and view information stored on the Lisk blockchain. 

## Tools currently available
- [Account Page](#account-page)
- [Delegate Page](#delegate-page)
- [Block Page](#block-page)
- [Transaction Page](#transaction-page)
- [Search](#search)
- [Top Accounts](#top-accounts)
- [Activity Graph](#activity-graph)
- [Delegate Monitor](#delegate-monitor)
- [Market Watcher](#market-watcher)
- [Network Monitor](#network-monitor)


## Account Page <a name="account-page"></a>

Account page shows basic information about particular Lisk account including public key, balance and transactions count. Assuming that an account is a delegate account, the registered delegate name is visible accordingly.

Transactions list shows all recent transactions sorting them by timestamp by default. There are multiple sorting and filtering views available, ex. Sent, received, others, sort by date, address, amount fee and number of confirmations.

## Delegate Page <a name="delegate-page"></a>

Delegate page shows delegate information including name, account id, uptime, rank (position based on the vote weight), approval (percentage of vote weight over total supply), vote weight, number of tokens forged, number of blocks forged. It also displays all the votes (votes given) and the voters (votes received) for the delegate.

## Block Page <a name="block-page"></a>

The block page will display all the block details along with all transactions added to it. The block details include the number of transactions added to the block, number of confirmations (blocks added after the block), height (number of blocks preceding the block), reward, fees, amount, timestamp, previous block and the delegate responsible for forging the block.

## Transaction Page <a name="transaction-page"></a>

The transaction page will display all the transaction details including the sender account, recipient account, number of confirmations (blocks added after the block which included the transaction), amount, fee, timestamp and the block id in which the transaction was included. Note that the timestamp of a transaction represents the date and time when the transaction was created and not when it was added to the block.

## Search <a name="search"></a>

The search bar is present on every page and allows users to search for transactions by transaction id, addresses by address id or public key, delegates by username and blocks by block id or height. The application does not require the user to choose what he/she is actually looking for. It finds out automatically given the input is valid.

## Top Accounts <a name="top-accounts"></a>

The [Top Accounts](https://explorer.lisk.io/topAccounts) page lists all the accounts ordered descending by balance. It means, the accounts that hold more tokens in the network. The table also shows the percentage the account have compared to the total supply and the owner of the account when it belongs to a delegate or it is added to known.json file.

## Activity Graph <a name="activity-graph"></a>

The [Activity Graph](https://explorer.lisk.io/activityGraph) makes it possible to see current behavior of the blockchain in real time. Subsequent blocks are added to the graph as they are forged by the network, and the current blocks are always paired with a delegate that forges that block. Also transactions are visible, if there are any.

## Delegate Monitor <a name="delegate-monitor"></a>

The [Delegate Monitor](https://explorer.lisk.io/delegateMonitor) lists all delegates for the current forging round. The table also shows their rank, total forged tokens, productivity and approval. Some statistics informations are also displayed such as the latest registered delegates, the latest votes, last forged block and the list of next forgers of the round.

## Market Watcher <a name="market-watcher"></a>

The [Market Watcher](https://explorer.lisk.io/marketWatcher) component presents data gathered from external services to keep the current Lisk price up to date. The data is taken from two different cryptocurrency exchanges: Bittrex and Poloniex. This component provides displaying candlestick chart, tracking orders and shows basic statistics about the market, like volume or number of transactions.

## Network Monitor <a name="network-monitor"></a>

The [Network Monitor](https://explorer.lisk.io/networkMonitor) presents data about nodes that are present and take part in transaction processing and forging. You can find basic statistics here, like amount of connected peers, last block, best block, etc. There are also statistics visible about the used versions and best heights of the network. Table with connected peers shows all connected peers and their geolocation info, used version of Lisk Core and block height.
