//Work in progress to modularize coin daemon pool creation

var bitcoin = require ('bitcoin'); //https://www.npmjs.org/package/bitcoin greatly simplifies interfacing with coin daemons
var coins = require ("./cryptocurrencies.json");//coin configurations
var thisWithdrawal = require ("./exampleTX.json")

sep = '\n--------------------------------------------------------\n';
logPrefix = 'coin-daemons';
console.log(logPrefix);

function fnClearPending (){
  console.log(logPrefix, 'fnClearPending dummy function.');
}

var coinDaemons = {};
loadCryptoConfig = function (){
    console.log(logPrefix, 'Loading coins.');
    for (var each in coins){ //instantiate coin objects from cryptocurrencies.json
//             console.log(logPrefix);

        coinDaemons[each] = new bitcoin.Client({ //Name of coin is name of object
            host: 'localhost',
            port: coins[each].port,
            user: coins[each].rpcusername,
            pass: coins[each].rpcpassword,
            //coin polling interval here
            timeout: 30000
        });
//		console.log(logPrefix);
    }
}
loadCryptoConfig();
//for (var each in coinDaemons){	
//console.log(logPrefix,each);
//}	
//console.log(thisWithdrawal);
thisWithdrawal = thisWithdrawal.withdrawals[1];
console.log(coinDaemons[thisWithdrawal]);
    function validateAddress(thisWithdrawal, fnClearPending){
        currency = thisWithdrawal.currency;
        address = thisWithdrawal.external_account_id;
        errStr = '';
        resHeaders = '';
        isValid = '';
        console.log(sep, logPrefix, 'Validating:',thisWithdrawal.currency, address);
        coinDaemons[currency].validateAddress(address, function(err, isValid, resHeaders){
            console.log(logPrefix, 'errors:', err, '\nisValid:', isValid, '\nresHeaders', resHeaders);
            console.log(logPrefix, address, 'isValid:' , isValid, 'isValid.isvalid:', isValid.isvalid)
            /*if (err) { console.log(err);}
            }*/

/*            if (isValid.isvalid == false){// Always returns false, then true (in the same call). Until this is better understood, need protection against double-true
                console.log(address, ': FALSE!');
                return false;
            }*/
            if (isValid.isvalid == true){
                console.log(logPrefix, 'VALIDATED');
                sendTx(thisWithdrawal, isValid.isvalid, fnClearPending);
                return true;
            }else{
                console.log(logPrefix, 'NOT VALIDATED');
                return false;
            }
        });
    }
console.log(validateAddress(thisWithdrawal,fnClearPending));
