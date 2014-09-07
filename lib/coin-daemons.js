//Work in progress to modularize coin daemon pool creation

var bitcoin = require ('bitcoin'); //https://www.npmjs.org/package/bitcoin greatly simplifies interfacing with coin daemons
var coins = require ("./cryptocurrencies.json");//coin configurations
var sep = '\n--------------------------------------------------------\n';
var coinDaemons = {};
var logPrefix = 'coin-daemons';
var runSelfTest = false;
console.log(logPrefix);

function fnClearPending (){
  console.log(logPrefix, 'fnClearPending dummy function.');
}

loadCryptoConfig = function (){
  console.log(logPrefix, 'Loading coins.');
  for (var each in coins){ //instantiate coin objects from cryptocurrencies.json
    coinDaemons[each] = new bitcoin.Client({ //Name of coin is name of object
      host: coins[each].host,
      port: coins[each].port,
      user: coins[each].rpcusername,
      pass: coins[each].rpcpassword,
      //coin polling interval here
      timeout: 30000
      });
//		console.log(logPrefix);
    }
return coinDaemons;
}

if (runSelfTest == true){
  coinDaemons = loadCryptoConfig();
  for (var each in coinDaemons){
    console.log(logPrefix,each);
  }
  var thisWithdrawal = require ("./exampleTX.json")
  console.log(thisWithdrawal);
}

module.exports = loadCryptoConfig();
