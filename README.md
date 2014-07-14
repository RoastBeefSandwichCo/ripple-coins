ripple-coins
============

A collection of Node.js modules to facilitate integration &amp; automation of new coins into a ripple gateway


## Ripple Coins - A universal gatewayd cryptocurrency integration and automation framework

  - That sure is a mouthful. It's a connector for gatewayd for all coins (or a very large majority).

##Progress
1. Withdrawal processing
  - Finished but needs to be polished.
2. Deposit processing
  - [Deposits Outline](https://github.com/ninobrooks/ripple-coins/blob/master/README-deposits.txt)
3. Brooks is AFK till Monday. Family stuff.

## Dependencies

1. [Gatewayd](https://github.com/ripple/gatewayd)
  - Provides easy deposit and withdrawal management (and endpoints in Ripple REST)
  - If you're running it, dependencies 2 & 3 are already satisfied.

2. [Ripple REST API](https://github.com/ripple/ripple-rest.git)
  - Used by our modules to retrieve and clear pending deposits and withdrawals

3. [Node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)
  - Runs the connector. Must be 0.1+ see link.

4. [node-postgres](https://github.com/brianc/node-postgres)
  - Ripple-rest uses postgres so we do, too. brianc's client provides interface to store tx info and user-account map.

5. [node-bitcoin](https://www.npmjs.org/package/bitcoin)
  - Node module providing *coin connection objects

6. [A cryptocurrency daemon](https://github.com/dogecoin/dogecoin)
  - These modules aim to be crypto-agnostic, so any daemon with (the de facto standard) bitcoin-compatible RPC calls (sendtoaddress, sendfromaccount...) should do.

7. (Optional) [Ripple lib](https://github.com/ripple/ripple-lib)
  - By default, the connector polls the API. Alternatively, ripple-lib's Remote can be used to listen for ledger closes.

## Installation
 - Install the dependencies in the cloned source folder. Node package coming soon.

## Usage
 - During development
   - Ripple-rest must be running. Gatewayd optional unless testing pending_withdrawal/deposits endpoints which are provided to the RESTful API by gatewayd.
   - Run with "node module-being-tested". withdrawal-manager.js is the main module for now.

##Processes:
 1. Automatically pay out externally (cryptocurrency to user crypto address) on notice of withdrawal
   - Poll the RESTful API every 1s (default) or listen for ledger close (rippled api using ripple-lib remote), then check [pending_withdrawals](https://github.com/ripple/gatewayd#listing-withdrawals) (RESTful API endpoint provided by gatewayd)
   - Send [RPC request](https://en.bitcoin.it/wiki/Original_Bitcoin_client/API_calls_list) to coin daemon via node-bitcoin
   - [Clear withdrawal](https://github.com/ripple/gatewayd#clearing-a-withdrawal) using RESTful API
 2. Automatically issue IOUs for external deposits (cryptocurrency from user to own crypto address)
   - Listen to coin daemon for received transactions
   - [Submit deposit](https://github.com/ripple/gatewayd#creating-a-deposit) via RESTful API for gatewayd processing

## TODO:
 - List unsupported coins

##CAVEAT:
 - Ninobrooks is a javascript noob and makes no pretense that his code is elegant or purdy. He in fact welcomes (begs) others to clean it up and improve it. The only reason he's doing this in the first place is because far more talented people have had more pressing matters to attend to. Also, he's going to stop talking about himself in the third person.

##Thanks!
 - To everyone who donates, contributes code, or has developed a module I'm using. In particular (and besides Ripple Labs in general), thank you Steven Zeiler and others for all your work on gatewayd, and freewil and company for node-bitcoin which has saved me quite some work.

##Donate
  - BTC 1K2BZ3XxpRNiNissEHoVcrCv3tEqEsHP28
  - LTC LgaoNgSNxJwyno61edyRUz2ZKFkgPQYV5t
  - DOGE D7U9VyJsStZ23MPgTr2TxGLj4bdfs69b8e
  - Ripples!(XRP) rPyBms1XZtNbF4UFGgM1dDWTmtfDmsfGNs
