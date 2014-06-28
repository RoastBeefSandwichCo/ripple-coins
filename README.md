ripple-coins
============

A collection of Node.js modules to facilitate integration &amp; automation of new coins into a ripple gateway


## Ripple Coins gatewayd cryptocurrency integration framework

  - That sure is a mouthful.

## Dependencies

1. [Gatewayd](https://github.com/ripple/gatewayd)
  - Provides easy deposit and withdrawal management (and endpoints in Ripple REST)

2. [Ripple lib](https://github.com/ripple/ripple-lib)
  - Remote is used for listening for transactions

3. [Ripple REST API](https://github.com/ripple/ripple-rest.git)
  - Used by gatewayd
  - Used by our modules to retrieve pending deposits and withdrawals

4. [A cryptocurrency daemon](https://github.com/dogecoin/dogecoin)
  - These modules aim to be crypto-agnostic, so any daemon with (the de facto standard) bitcoin-compatible RPC calls (TODO: list specific calls) should do.

## Installation
## TODO:
 - Note RPC calls which MUST be supported by coin daemon
