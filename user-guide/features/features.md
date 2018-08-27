# Lisk Hub Features

## Network Switcher

Opens the login page and enables the network switcher options.

`lisk://add-account?showNetwork=true`

(image: hub-network_switcher.png)

## Send Transactions

Opens the wallet and prefills the send form with recipient and amount.

As an example we use `16313739661670634666L` for the address and `5` LSK for the amount:
`lisk://wallet?recipient=16313739661670634666L&amount=5`

(image: hub-send_transactions.png)

## Sign Messages

Opens the sign message form and prefills it with your message.

As an example we use `my message`:
`lisk://sign-message?message=my message`

(image: hub-sign_messages.png)

## Voting

Makes voting for delegates easier. 
`lisk://main/voting/vote?votes=genesis_77,genesis_79&unvotes=genesis_51` or 
`lisk://delegates/vote?votes=genesis_77,genesis_79&unvotes=genesis_51` 

will open the Lisk app and automatically select the delegates `thepool` and `4miners.net` for upvoting and `genesis_51` for unvoting.

❗️ Please keep in mind that we don't use the `/main` route anymore but some websites still rely on an old url so we are allowing `/main` in this particular case `main/voting/vote`.

(image: hub-voting_example.png)
