//Reads withdrawals object, sends transactions
//TODO: handle address validation quirk
//TODO: re-examine self-tests
var bitcoin = require ('bitcoin'); //https://www.npmjs.org/package/bitcoin greatly simplifies interfacing with coin daemons
var coins = require ("./cryptocurrencies.json");//coin configurations

//var coinDaemons = {};
sep = '\n--------------------------------------------------------\n';

//keeping this around since it also shows rpc methods available
function showCollection(objCollection){//shows properties of objects in a collection. Like port/host/userpass of each coin in cryptocurrencies.json
    console.log('selfTest!');
    for(var obj in objCollection){
        console.log('obj:' + obj, '\ncoins[obj]:\n', objCollection[obj],'\n');
        for (var propt in objCollection[obj]){
            console.log('obj[propt]:',propt, '\ncoins[obj[propt]]:' , objCollection[obj][propt],'\n');
        }
    }
}

function selfTest(testLevel, testSelect){ //verifies cryptocurrencies.json was read and bitcoin clients created
    if (testLevel > 0){
        console.log(sep, 'Checking to see if cryptocurrencies.json was loaded. Showing coins.',sep);
        showCollection(coins);
    }
    if (testLevel > 1){
        console.log(sep, 'Checking to see if bitcoin Clients were created. Showing coinDaemons and available methods', sep);
        showCollection(coinDaemons);
    }

    if (testSelect != ''){
        if (testSelect.indexOf('tx' >0)){
            console.log(sep, 'Testing coinDaemon method calls using an example transaction. THIS WILL SEND CRYPTO so you should be on testnet!!!', sep);
            procTest = new coinProcessing();
            procTest.loadCryptoConfig();
            procTest.processThis(exampleTx);
        }
    }
}

function coinProcessing(){
    var coinDaemons = {};
    this.loadCryptoConfig = function (){
        for (var each in coins){ //instantiate coin objects from cryptocurrencies.json
console.log('Loading coins.');
            coinDaemons[each] = new bitcoin.Client({ //Name of coin is name of object
                host: 'localhost',
                port: coins[each].port,
                user: coins[each].rpcusername,
                pass: coins[each].rpcpassword,
                timeout: 30000
            });
        }
    }

    function sendTx(withdrawalObj, isValid){
        console.log(withdrawalObj.external_account_id, 'is valid:',isValid);
        if (isValid != true){
            console.log('Invalid address. Rejecting.')
            return false;
        }

        console.log(sep, 'Processing transaction');
        amount = Number(withdrawalObj.amount)
        commentTo = String(withdrawalObj.ripple_transaction_id);
        console.log("Converted '" + typeof(withdrawalObj.amount) + "' " + withdrawalObj.amount + " to '" + typeof(amount)+ "' " + amount);
        console.log("Converted '" + typeof(withdrawalObj.ripple_transaction_id)  + "' " + withdrawalObj.ripple_transaction_id + " to '" + typeof(commentTo)+ "' " + commentTo);
        console.log('Command:', withdrawalObj.currency, 'sendToAddress(', withdrawalObj.external_account_id, amount, commentTo,')');
        coinDaemons[withdrawalObj.currency].sendToAddress(withdrawalObj.external_account_id, amount, commentTo, function(err, txid, resHeaders){
            console.log('errors:', err, '\nresHeaders', resHeaders, '\ntxid:', txid);
        });
    }

    function validateAddress(thisWithdrawal, callback){
        currency = thisWithdrawal.currency;
        address = thisWithdrawal.external_account_id;
        errStr = '';
        resHeaders = '';
        isValid = '';
        console.log(sep, 'Validating:',thisWithdrawal.currency, address);
        coinDaemons[currency].validateAddress(address, function(err, isValid, resHeaders){
            console.log('errors:', err, '\nisValid:', isValid, '\nresHeaders', resHeaders);
            console.log(address, 'isValid:' , isValid, 'isValid.isvalid:', isValid.isvalid)
            /*if (err) { console.log(err);}
            }*/

/*            if (isValid.isvalid == false){// Always returns false, then true (in the same call). Until this is better understood, need protection against double-true
                console.log(address, ': FALSE!');
                return false;
            }*/
            if (isValid.isvalid == true){
                console.log('VALIDATED');
                callback(thisWithdrawal, isValid.isvalid);
                return true;
            }
            else{
                console.log('NOT VALIDATED');
                return false;
            }
        });
    }

    function clearWithdrawal(){
        //clear pending_withdrawal
    }

    this.processThis = function(withdrawalSet){//run transaction
        if (withdrawalSet.hasOwnProperty('withdrawals') != true){
            //console.log("No withdrawals found (withdrawalSet does not have property 'withdrawals')");
            console.log('ERROR: invalid withdrawalSet:', withdrawalSet);
            return false;
        }
        console.log('valid object:', withdrawalSet.hasOwnProperty('withdrawals'));
        for (i=0; i < withdrawalSet.withdrawals.length; i++){
            if(coinDaemons.hasOwnProperty(withdrawalSet.withdrawals[i].currency)){
                validation = validateAddress(withdrawalSet.withdrawals[i], sendTx);
            }
            else{
                console.log('ERROR! Coin', withdrawalSet.withdrawals[i].currency, '(rTxId='+ withdrawalSet.withdrawals[i].ripple_transaction_id + ') does not exist in cryptocurrencies.json. Skipping.');
                continue;
            }
        }
    }
}



runSelfTest = false;
testLevel = 0;
testSelect = ''; //options: tx
//end test vars
console.log('runSelfTest:', runSelfTest);
console.log('testLevel=', testLevel);
console.log('testSelect:', testSelect);



if (runSelfTest == true){
var exampleTx = require("./exampleTX.json");
//    loadCryptoConfig();
    selfTest(testLevel, testSelect);
}

module.exports = coinProcessing;
