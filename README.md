ripple-coins
============

A collection of Node.js modules to facilitate integration &amp; automation of new coins into a ripple gateway


## Ripple Coins - A universal gatewayd cryptocurrency integration and automation framework

  - That sure is a mouthful. It's a connector for gatewayd for all coins (or a very large majority).

##Progress
1. Withdrawal processing
  - Finished but needs to be polished. (Thanks for the help, McShane!)
2. Deposit processing
  - ~~See Issues 1,2,3.~~ Deposit processing is being developed by Steven [here](https://github.com/stevenzeiler/blockchain-account-monitor) and in our fork [here](https://github.com/RoastBeefSandwichCo/blockchain-account-monitor). On completion, I aim to unify them. Thanks for still MORE fabulous work, man. You are win.

## Dependencies

1. [Gatewayd](https://github.com/ripple/gatewayd)
  - Provides easy deposit and withdrawal management (and endpoints in Ripple REST)
  - Provides [Node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager), [Ripple REST API](https://github.com/ripple/ripple-rest.git)

2. [node-rest-client](https://www.npmjs.org/package/node-rest-client)
  - Easy interfacing with gatewayd api

3. [node-bitcoin](https://www.npmjs.org/package/bitcoin)
  - Node module providing *coin connection objects
  - Moving to [node-dogecoin](https://www.npmjs.org/package/node-dogecoin)!

4. [A cryptocurrency daemon](https://github.com/dogecoin/dogecoin)(local or remote)
  - These modules aim to be crypto-agnostic, so any daemon with (the de facto standard) bitcoin-compatible RPC calls (sendtoaddress, sendfromaccount...) should do.

## Installation
 - Development: clone the repo inside the gatewayd folder (consistent paths). Note the new development branch which is pretty much guaranteed to be broken. :D
   - Install the dependencies in the cloned source folder. Node package on wishlist.
 - Production: npm install inside gatewayd folder.
 
## Tests

Run this tests with mocha

    npm install -g mocha
    mocha -R spec test/

## Usage
   - With Gatewayd started, execute `node withdrawal-manager.js`.

##Processes:
 1. Automatically pay out externally (cryptocurrency to user crypto address) on notice of withdrawal
   - Poll the RESTful API every 1s (default) or listen for ledger close (rippled api using ripple-lib remote), then check [pending_withdrawals](https://github.com/ripple/gatewayd#listing-withdrawals) (RESTful API endpoint provided by gatewayd)
   - Send [RPC request](https://en.bitcoin.it/wiki/Original_Bitcoin_client/API_calls_list) to coin daemon via node-bitcoin
   - [Clear withdrawal](https://github.com/ripple/gatewayd#clearing-a-withdrawal) using RESTful API
 2. Automatically issue IOUs for external deposits (cryptocurrency from user to own crypto address)
   - Listen to coin daemon for received transactions
   - On receipt of assets, submit deposit using gatewayd.data.models.externalAccounts and gatewayd.data.models.externalTransactions [as seen on TV](https://github.com/RoastBeefSandwichCo/blockchain-account-monitor/blob/master/test/processor-snippet.js)


## TODO:
 - List unsupported coins

##CAVEAT:
 - Ninobrooks is a javascript noob and makes no pretense that his code is elegant or purdy. He in fact welcomes (begs) others to clean it up and improve it. The only reason he's doing this in the first place is because far more talented people have had more pressing matters to attend to. Also, he's going to stop talking about himself in the third person.

##Thanks!
 - To everyone who donates, contributes code, or has developed a module I'm using. In particular (and besides Ripple Labs in general), thank you @stevenzeiler and others for all your work on gatewayd, and freewil and company for node-bitcoin which has saved me quite some work.

 - [The Rock Trading Ltd](https://www.therocktrading.com)

Besides being my personal favorite exchange, funding from The Rock was directly responsible for major hardware upgrades. A pair of SSDs in our best server are now named "Rock 1" and "Rock 2".  The Rock is a UK-based *ripple-integrated* exchange and gateway (XRPGA Gateway ftw!) with crypto-fiat trading for EUR, USD, BTC, LTC, DOGE and more, *and* derivatives. Check them out, sign up, use my promoter code :D
therocktrading.com/referral/79
Thanks, Rock. Your donations came at a critical time for us. Your private encouragement via correspondence and promotion of our efforts on Twitter are appreciated, too!

 - Ripple
(drafting)

##Donate

Help us with development costs (pretty please)! Ways to contribute:
  - Ripples!(XRP) rPyBms1XZtNbF4UFGgM1dDWTmtfDmsfGNs
  - PayPal: darthcookient@gmail.com
  - Bitcoin 1K2BZ3XxpRNiNissEHoVcrCv3tEqEsHP28
  - Litecoin LgaoNgSNxJwyno61edyRUz2ZKFkgPQYV5t
  - Dogecoin D7U9VyJsStZ23MPgTr2TxGLj4bdfs69b8e
  - Stellar (STR): ninobrooks
  - If you would like to donate hardware, remote servers or in any other way, please contact me directly!
