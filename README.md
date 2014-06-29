ripple-coins
============

A collection of Node.js modules to facilitate integration &amp; automation of new coins into a ripple gateway


## Ripple Coins - A universal gatewayd cryptocurrency integration and automation framework

  - That sure is a mouthful. It's a connector for gatewayd for all coins (or a very large majority).

## Dependencies

1. [Node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)
  - You should really already have this installed...
 
2. [Gatewayd](https://github.com/ripple/gatewayd)
  - Provides easy deposit and withdrawal management (and endpoints in Ripple REST)

3. [Ripple lib](https://github.com/ripple/ripple-lib)
  - Remote is used for listening for ledger closes

4. [Ripple REST API](https://github.com/ripple/ripple-rest.git)
  - Used by gatewayd
  - Used by our modules to retrieve pending deposits and withdrawals

5. [A cryptocurrency daemon](https://github.com/dogecoin/dogecoin)
  - These modules aim to be crypto-agnostic, so any daemon with (the de facto standard) bitcoin-compatible RPC calls (sendtoaddress, sendfromaccount...) should do.

6. [node-bitcoin](https://www.npmjs.org/package/bitcoin)
  - Greatly simplifies connection and interaction!

## Installation
 - Install the dependencies. Ripple-lib must be installed globally, I think. No further installation required right now.

## Usage
 - During development
   - Ripple-rest must be running. Gatewayd optional unless testing pending_withdrawal/deposits endpoints which are provided to the REST api by gatewayd.
   - Ripple-lib must be installed globally, I think
   - Run with "node <module being tested>". "node withdrawal-manager.js" will connect to ripple server, listen for ledger closes, query the API and show available endpoints.
 - Planned implementation
   - Will seek integration into gatewayd. Alternatively, will package for npm installation.

##Outline:
 1. Get notified of pending withdrawals (gatewayd). *DONE.
 2. Retrieve and parse withdrawal info from gatewayd (or its REST endpoints) and perform any necessary verification.
 3. RPC calls to daemon to pay out *DONE using node-bitcoin
 4. Develop listener for coin daemon to watch for deposits. Inform gatewayd.
 5. RPC calls to coin daemon (for withdrawals) or issue IOUs (deposits. Gatewayd handles this. I think. Test.)

## TODO:
 - List unsupported coins

##CAVEAT:
 - Ninobrooks is a javascript noob and makes no pretense that his code is elegant or purdy. He in fact welcomes (begs) others to clean it up and improve it. The only reason he's doing this in the first place is because far more talented people have had more pressing matters to attend to. Also, he's going to stop talking about himself in the third person.

##Thanks!
 - To everyone who donates, contributes code, or has developed a module I'm using. In particular (and besides Ripple Labs in general), thank you Steven Zeiler and others for all your work on gatewayd, and freewil and company for node-bitcoin which has saved me quite some work.
