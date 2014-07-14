Will no longer be maintained effective July 14.
Instead, see [issues](https://github.com/ninobrooks/ripple-coins/issues?state=open)



Deposits
============
##Status
Withdrawal handling at a basic level is done. It could use more informative
and detailed error-handling and the code definitely needs to be polished so
if anyone would like to do that, have at it. For me, it's time to move forward
and get more breadth of features before obsessing about the details.
In other words, close the gap to a release.

Which brings us to...

Deposit handling is the gap we need to cover. For those interested in contributing,
here's how I'm doing it and what is needed:

*Proposals section has been moved to the end so I can scrape ideas from it to improve
the connector later. For now, LET'S. SHIP.


##Goal and Task breakdown

Brooks:
Implementing postgres database for mapping ripple accounts to coin addresses to external
addresses (external address = non-ripple non-coin user id for use by gateway operator)
and for tracking last block checked for each coin.

Anyone else:
Coin daemons are managed as a collection of connection objects mapped to coin names
read from cryptocurrencies.json. Currently, reading the json file and creating the
connections is done in coinProcessing in the process-withdrawal.js. Which is wrong.
Separate it into its own module for more readable instantiation (by withdrawal-manager,
probably) and calls (from process-withdrawal and check-for-deposits (doesn't exist yet).

More useful info later. Going to use issue tracking or milestones or something.


##Proposals // Settled. Use listsinceblock (B). Leaving this here to use for improvement
later (like optional walletnotify to improve notification times)

A. External to module:
  1. walletnotify="/usr/bin/node walletnotify.js %s" //Added to <coin>.conf, this option
can run a script that will receive the txid, get tx info from coin daemon
and update a database that can be polled for new transactions
  2. Poll the database from a deposit-manager script, mark as "Started"
  3. Submit deposit request to gatewayd via API
  4. Poll gatewayd API for deposit clearing, update database to reflect completion
  Alternatively, the walletnotify.js could connect to a listening websocket
belonging to deposit-manager and eliminate the need for polling altogether.
Still, there's a need for checking for missed transactions and a need for
a db to map addresses to (non-ripple) accounts to (ripple) IDs

B. Purely internal
  1. Poll the daemon using listsinceblock
  2. Track last block checked via db
  3. As with Option A, submit deposit to gatewayd via API, check for clearing, etc.

Option A is more complicated to implement but may be able to eliminate polling entirely
and enable real-time transaction alerts. As real-time as coins get, anyway.

Option B is simpler. I think. Still comparing. 


##Example workflow
One possible programmatic workflow, assuming a gateway-hosted wallet:

1. Attach a coin address to a ripple ID and/or an external user ID.
 (One table should store all rippleID-wallet-externalID associations for all coins)
2. Mark current block -1 as last block checked in transaction db
(One table should store all 'last block checked' for all coins)
3. Query coin daemon every 5 minutes for transactions to all addresses since last block checked
(One table should store all crypto transactions for all coins)
(Unsure if wallets with >100 addresses will require additional steps)
4. Add new transactions to tx db, mark outstanding
5. Process outstanding deposits by submitting deposit requests to gatewayd via API
6. Update last block checked
7. Poll for deposit clearing (this needs to be fleshed out)
8. Mark deposit cleared in tx db
9. Begin again at step 3

This is a bit of a draft. Input is hereby solicited.
