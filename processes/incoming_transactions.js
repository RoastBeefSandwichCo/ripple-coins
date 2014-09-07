const gatewayd = require(process.env.GATEWAYD_PATH);
const blockchain = require('blockchain-account-monitor');
const async = require('async');

var ExternalAccount = gatewayd.data.models.externalAccounts;
var ExternalTransaction = gatewayd.data.models.externalTransactions;
const Promise = require('bluebird');
const monitor = new blockchain.AccountMonitor({
  blockchainClient: new blockchain.Client(
    gatewayd.config.get('DOGECOIND')
  ),
  onBlock: function(block, next) {
    var blockHash = block[0].blockhash;
    var transactions = [];
    var records = [];
    async.all(block, function(transaction, callback) {
      ExternalAccount.findOrCreate({
        uid: transaction.address,
        name: 'dogecoin'
      })
      .then(function(externalAccount) {
        return ExternalTransaction.create({
          uid: transaction.txid,
          amount: transaction.amount,
          currency: 'DOG',
          external_account_id: externalAccount.id,
          deposit: true,
          status: 'incoming'
        })
      })
      .then(function(transaction) {
        records.push(transaction);
        callback();
      })
      .error(function(error) {
        console.log('ERROR', error);
        callback(error);
      })
    }, function(error) {
      gatewayd.config.set('DOGECOIN_LAST_BLOCK_HASH', blockHash)
      gatewayd.config.save(function() {
        console.log('RECORDS', records);  
        next();
      });
    })
  },
  timeout: 5000
});
monitor.lastBlockHash = gatewayd.config.get('DOGECOIN_LAST_BLOCK_HASH');
monitor.start();
