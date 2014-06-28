ripple-coins
============

A collection of Node.js modules to facilitate integration &amp; automation of new coins into a ripple gateway


## Ripple Coins - A gatewayd cryptocurrency integration framework

  - That sure is a mouthful.

## Dependencies

1. [Node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)
  - You should really already have this installed...
 
2. [Gatewayd](https://github.com/ripple/gatewayd)
  - Provides easy deposit and withdrawal management (and endpoints in Ripple REST)

3. [Ripple lib](https://github.com/ripple/ripple-lib)
  - Remote is used for listening for transactions

4. [Ripple REST API](https://github.com/ripple/ripple-rest.git)
  - Used by gatewayd
  - Used by our modules to retrieve pending deposits and withdrawals

5. [A cryptocurrency daemon](https://github.com/dogecoin/dogecoin)
  - These modules aim to be crypto-agnostic, so any daemon with (the de facto standard) bitcoin-compatible RPC calls (TODO: list specific calls) should do.

## Installation
 - Install the dependencies. Ripple-lib must be installed globally, I think. No further installation required right now.
## Usage
 - During development
   - Ripple-rest must be running. Gatewayd optional unless testing pending_withdrawal/deposits endpoints which are provided to the REST api by gatewayd.
   - Ripple-lib must be installed globally, I think
   - Node <module being tested>

##Outline:
 1. Develop efficient way to be notified of pending withdrawals (gatewayd). * DONE. Clean up code.
   - Rather than poll the REST API, connect to a rippled API with a websocket, listen for ledger closes, query REST API. (As far as efficiency goes, it's a bit of a toss-up between "parse all transactions and query API on possible withdrawals/deposits" vs "query API on ledger closer" but this wins the simplicity contest.)
 2. Retrieve and parse withdrawal info from gatewayd (or its REST endpoints) and perform any necessary verification.
 3. RPC calls to daemon to pay out
 4. Develop listener for coin daemon to watch for deposits. Inform gatewayd.
 5. RPC calls to coin daemon (for withdrawals) or issue IOUs (deposits. Gatewayd handles this. I think. Test.)

## TODO:
 - Note RPC calls which MUST be supported by coin daemon
   - sendfrom <fromaccount> <tobitcoinaddress> <amount> [minconf=1] [comment] [comment-to]
   - sendtoaddress <coinaddress> <amount> [comment] [comment-to]
   - getbalance [account] [minconf=1]	
   - List is incomplete
