/*

 Run this deamon process alongside gatewayd:

     GATEWAYD_PATH=/path/to/gatewayd pm2 start deposits-manager.js

 The `gatewayd` object accesses the database models via the process
 environment to record crptyo coin addresses and transactions in
 gatewayd for processing and sending onward.

*/

const gatewayd = require(process.env.GATEWAYD_PATH);
const blockchain = require('blockchain-account-monitor');
const ExternalAccount = gatewayd.data.models.externalAccounts;
const ExternalTransaction = gatewayd.data.models.externalTransactions;

const monitor = new BlockchainAccountMonitor({
  blockchainClient:  new BlockchainClient(
    gatewayd.config.get('DOGECOIND')
  ),
  onBlock: function(block, next) {
    block.forEach(function(transaction) {
      ExternalAccount.findOrCreate({
        where: {
          uid: transaction.address,
          name: 'dogecoin'
        }
      })
      .then(function(externalAccount) {
        return ExternalTransaction.create({
          uid: transaction.hash,
          amount: transaction.amount,
          currency: 'DOG',
          external_account_id: externalAccount.id
        })
      })
      .then(function() {
        gatewayd.config.set('LAST_BLOCK_HASH', transaction.blockhash);
        next();
      })
      .error(function(error) {
        gatewayd.config.set('LAST_BLOCK_HASH', transaction.blockhash);
        next();
      });
    });
  },
  timeout: 5000
});

monitor.lastBlockHash = config.get('LAST_BLOCK_HASH');

monitor.start();
