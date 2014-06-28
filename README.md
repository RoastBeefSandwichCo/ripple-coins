ripple-coins
============

A collection of Node.js modules to facilitate integration &amp; automation of new coins into a ripple gateway


## Ripple Coins gatewayd cryptocurrency integration framework

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
## TODO:
 - Note RPC calls which MUST be supported by coin daemon

##Outline:
 1. Develop efficient way to be notified of pending withdrawals (gatewayd).
   - Rather than poll the REST API, connect to a rippled API with a websocket, listen for possible payments/withdrawals, query REST API.
 2. Develop listener for coin daemon to watch for deposits. Inform gatewayd.
 3. Parse deposit/withdrawal info from gatewayd (or its REST endpoints) and perform any necessary verification.
 4. RPC calls to coin daemon (for withdrawals) or issue IOUs (deposits. Gatewayd handles this. I think. Test.)
