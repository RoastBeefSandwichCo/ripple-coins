ripple-coins
============

A collection of Node.js modules to facilitate integration &amp; automation of new coins into a ripple gateway


## Ripple Gateway Framework

![Travis CI Build Status](https://api.travis-ci.org/ripple/gatewayd.svg?branch=develop)

This software is a framework for building and deploying a Ripple Gateway software system. The system includes a core database that manages accounting for deposits and withdrawals of assets to the Ripple network. The Ripple Gateway Framework provides a standard interface for issuing any currency on the Ripple network and exchange, with the goal of completely abstracting interaction with Ripple.

Interact with the Ripple Gateway Framework by building custom integrations with banking and payment systems around the world, and by using the built-in APIs for designing beautiful gateway mobile apps and user interfaces. A HTTP/JSON server, Javascript library, and Command Line Interface are provided as interfaces to the Ripple Gateway Framework software.

The Ripple Gateway's features include:
  - user registration
  - deposits and withdrawals
  - issuing currency
  - ripple payment sending and monitoring
  - gateway administration

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
