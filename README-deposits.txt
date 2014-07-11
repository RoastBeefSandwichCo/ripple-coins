Withdrawal handling at a basic level is done. It could use more informative
and detailed error-handling and the code definitely needs to be polished
but it's time to move forward and get more breadth of features before
obsessing about the details. In other words, close the gap to a release.

Deposit handling is the other half and work on that has only begun in
the sense that I'm examining how best to do it. Like Maniac Magee who
stared at Cobble's Knot for half the day. Only I don't get free pizza
for a year. Well maybe I do. Buy me pizza! So anyway...

Here are some possible strategies.
More than one way to skin a cat, they say.
But how many right ways? Below, the current fruits of brainstorming.

1) external to module:
  A) walletnotify="/usr/bin/node walletnotify.js %s" //Added to <coin>.conf, this option
can run a script that will receive the txid, get tx info from coin daemon
and update a database that can be polled for new transactions
  B) Poll the database from a deposit-manager script, mark as "Started"
  C) Submit deposit request to gatewayd via API
  D) Poll gatewayd API for deposit clearing, update database to reflect completion
  Alternatively, the walletnotify.js could connect to a listening websocket
belonging to deposit-manager and eliminate the need for polling altogether.
Still, there's a need for checking for missed transactions and a need for
a db to map addresses to (non-ripple) accounts to (ripple) IDs

2) Purely internal
  A) Poll the daemon using listsinceblock
  B) Track last block checked via db
  
Option 1 is more complicated to implement but may be able to eliminate polling entirely
and enable real-time transaction alerts. As real-time as coins get, anyway.

Option 2 is simpler. I think. Still comparing.


Anyway, here's one possible programmatic workflow:
Assuming a gateway-hosted wallet:
1) Attach a coin address to a ripple ID and/or an external user ID.
 (One table should store all rippleID-wallet-externalID associations for all coins)

2) Mark current block -1 as last block checked in transaction db
(One table should store all 'last block checked' for all coins)

3) Query coin daemon every 5 minutes for transactions to all addresses since last block checked
(One table should store all crypto transactions for all coins)
(Unsure if wallets with >100 addresses will require additional steps)

4) Add transaction to tx db, mark outstanding

5) Process outstanding deposits by submitting deposit requests to gatewayd via API

6) Update last block checked

7) Poll for deposit clearing (this needs to be fleshed out)

8) Mark deposit cleared in tx db

9) Begin again at step 3


This is a bit of a draft. Input is hereby solicited.
