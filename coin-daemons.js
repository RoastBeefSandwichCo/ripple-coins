var bitcoin = require ('bitcoin'); //https://www.npmjs.org/package/bitcoin greatly simplifies interfacing with coin daemons
var coins = require ("./cryptocurrencies.json");//coin configurations

sep = '\n--------------------------------------------------------\n';
logPrefix = 'coin-daemons';


var coinDaemons = {};
    this.loadCryptoConfig = function (){
    console.log(logPrefix, 'Loading coins.');
        for (var each in coins){ //instantiate coin objects from cryptocurrencies.json
            coinDaemons[each] = new bitcoin.Client({ //Name of coin is name of object
                host: 'localhost',
                port: coins[each].port,
                user: coins[each].rpcusername,
                pass: coins[each].rpcpassword,
                //coin polling interval here
                timeout: 30000
            });
        }
    }

