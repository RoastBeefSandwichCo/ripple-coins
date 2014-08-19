//Reads withdrawals object, sends transactions
//TODO: handle address validation quirk
//TODO: re-examine self-tests
var bitcoin = require ('node-dogecoin'); //https://www.npmjs.org/package/bitcoin greatly simplifies interfacing with coin daemons
var coins = require ("./cryptocurrencies.json");//coin configurations
var coinDaemons = require ("coin-daemons.js";)
//var coinDaemons = {};
sep = '\n--------------------------------------------------------\n';
logPrefix = 'process-withdrawal';

//keeping this around since it also shows rpc methods available
function showCollection(objCollection){//shows properties of objects in a collection. Like port/host/userpass of each coin in cryptocurrencies.json
    console.log(logPrefix, 'selfTest!');
    for(var obj in objCollection){
        console.log(logprefix, 'obj:' + obj, '\ncoins[obj]:\n', objCollection[obj],'\n');
        for (var propt in objCollection[obj]){
            console.log(logPrefix, 'obj[propt]:',propt, '\ncoins[obj[propt]]:' , objCollection[obj][propt],'\n');
        }
    }
}

function selfTest(testLevel, testSelect){ //has not been kept up. Some functions may have been renamed or expect different params
    if (testLevel > 0){
        console.log(sep, logPrefix, 'Checking to see if cryptocurrencies.json was loaded. Showing coins.',sep);
        showCollection(coins);
    }
    if (testLevel > 1){
        console.log(sep, logPrefix, 'Checking to see if bitcoin Clients were created. Showing coinDaemons and available methods', sep);
        showCollection(coinDaemons);
    }

    if (testSelect != ''){
        if (testSelect.indexOf('tx' >0)){
            console.log(sep, logPrefix, 'Testing coinDaemon method calls using an example transaction. THIS WILL SEND CRYPTO so you should be on testnet!!!', sep);
            procTest = new coinProcessing();
            procTest.loadCryptoConfig();
            procTest.processThis(exampleTx, fnClearPending = function (){console.log(logPrefix, 'fnClearPending dummy function.');});
        }
    }
}

function coinProcessing(){
    function sendTx(withdrawalObj, isValid, fnClearPending){
        console.log(logPrefix, withdrawalObj.external_account_id, 'is valid:',isValid);
        if (isValid != true){
            console.log(logPrefix, 'Invalid address. Rejecting.')
            return false;
        }

        console.log(sep, logPrefix, 'Processing transaction');
        amount = Number(withdrawalObj.amount)
        commentTo = String(withdrawalObj.ripple_transaction_id);
        console.log(logPrefix, "Converted '" + typeof(withdrawalObj.amount) + "' " + withdrawalObj.amount + " to '" + typeof(amount)+ "' " + amount);
        console.log(logPrefix, "Converted '" + typeof(withdrawalObj.ripple_transaction_id)  + "' " + withdrawalObj.ripple_transaction_id + " to '" + typeof(commentTo)+ "' " + commentTo);
        console.log(logPrefix, 'Action:', withdrawalObj.currency, 'sendToAddress(', withdrawalObj.external_account_id, amount, commentTo,')');
        coinDaemons[withdrawalObj.currency].sendToAddress(withdrawalObj.external_account_id, amount, commentTo, function(err, txid, resHeaders){
            console.log(logPrefix, 'errors:', err, '\nresHeaders', resHeaders, '\ntxid:', txid);
            if (txid != undefined ){
                console.log(logPrefix, 'Transaction sent! TXID:',txid);            
                fnClearPending(withdrawalObj.id);
                return true;
            }else{
                console.log(logPrefix, 'process-withdrawal>sendTx>Transaction failed. See above.');// not, shit ten bricks
                return false;
            }
        });
    }

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

    function clearWithdrawal(){
        //clear pending_withdrawal
    }

    this.processThis = function(withdrawalSet, fnClearPending){//run transaction
//    this.callback = callback; on hold while alternatives are considered
        if (withdrawalSet.hasOwnProperty('withdrawals') != true){
            //console.log("No withdrawals found (withdrawalSet does not have property 'withdrawals')");
            console.log(logPrefix, 'ERROR: invalid withdrawalSet:', withdrawalSet);
            return false;
        }
        console.log(logPrefix, 'valid object:', withdrawalSet.hasOwnProperty('withdrawals'));
        for (i=0; i < withdrawalSet.withdrawals.length; i++){
            if(coinDaemons.hasOwnProperty(withdrawalSet.withdrawals[i].currency)){
                validation = validateAddress(withdrawalSet.withdrawals[i], fnClearPending);
            }else{
                console.log(logPrefix, 'ERROR! Coin', withdrawalSet.withdrawals[i].currency, '(rTxId='+ withdrawalSet.withdrawals[i].ripple_transaction_id + ') does not exist in cryptocurrencies.json. Skipping.');
                continue;
            }
        }
    }
}



runSelfTest = true;
testLevel = 0;
testSelect = 'tx'; //options: tx = test transactions. BE ON TESTNET.
//end test vars
console.log(logPrefix, 'runSelfTest:', runSelfTest);
console.log(logPrefix, 'testLevel=', testLevel);
console.log(logPrefix, 'testSelect:', testSelect);



if (runSelfTest == true){
    this.fnClearPending = function (){console.log(logPrefix, 'fnClearPending dummy function.');}

    var exampleTx = require("./exampleTX.json");
    selfTest(testLevel, testSelect);
}

module.exports = coinProcessing;
