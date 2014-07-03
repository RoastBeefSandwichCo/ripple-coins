//test vars
var runSelfTest = true;
testLevel = 4;//add selective testing
whichMethod = "sendToAddress";
//end test vars
Assert = require("assert");
var bitcoin = require ('bitcoin'); //https://www.npmjs.org/package/bitcoin for interfacing with coin daemons
var btcMath = require('bitcoin-math'); //https://www.npmjs.org/package/bitcoin-math for string conversion
var coins = require ("./cryptocurrencies.json"); //may need to JSON.parse(coins)

var num = 2;
Assert (num.toBitcoin);
console.log('newnum',num);


//console.log(coins);
//console.log(coins.PHC.port);
var coinDaemons = {};

for (var each in coins){
//console.log('coin found:',each);
}

for (var each in coins){ //no idea if this mapping attempt with work
//Should scale to higher loads better than connecting for every tx
//for each object (coin configuration) in the
        coinDaemons[each]/* where each is name of object. i.e., CR1, CR2, PHC)*/ = new bitcoin.Client({ //map property names to variable names to call by name later
        host: 'localhost',
        port: coins[each].port,
        user: coins[each].rpcusername,
        pass: coins[each].rpcpassword,
        timeout: 30000
    });
//console.log('each', each);
//console.log('port',coins[each].port);

}

function showCollection(objCollection){//shows properties of objects in a collection. Like port/host/userpass of each coin in cryptocurrencies.json
    console.log('selfTest!');
    for(var obj in objCollection){
        console.log('obj:' + obj, '\ncoins[obj]:\n', objCollection[obj],'\n');
        for (var propt in objCollection[obj]){
            console.log('obj[propt]:',propt, '\ncoins[obj[propt]]:' , objCollection[obj][propt],'\n');
        }
    }
}

function selfTest(testLevel){ //verifies cryptocurrencies.json was read and bitcoin clients created
    if (testLevel > 0){
        console.log('Checking to see if cryptocurrencies.json was loaded. Showing coins.');
        showCollection(coins);
    }
    if (testLevel > 1){
        console.log('Checking to see if bitcoin Clients were created. Showing coinDaemons and available methods');
        showCollection(coinDaemons);
    }
    if (testLevel > 2){
        console.log('Testing coinDaemon method calls using an example transaction. THIS WILL SEND CRYPTO!!!');
        coinProcessing(exampleTx);
    }
}
function coinProcessing(transaction){
//withdrawals is AN ARRAY. so like, handle that.
    function sendTx(withdrawalObj, isValid){
//        validation = validateAddress(withdrawalObj.currency, withdrawalObj.external_account_id, sendTx);
        console.log(withdrawalObj.external_account_id, 'is valid:',isValid);
        if (isValid != true){return false;}
        console.log ('continuing...');
console.log('converting value',withdrawalObj.amount);

amount = parseFloat(withdrawalObj.amount);
console.log('amount:', typeof(amount), amount);
//amount = withdrawalObj.amount;
// Assert(amount.toBitcoin); throws error.
// well if it can't convert from a string, why do i need it?

console.log('amount:',amount);
        coinDaemons[withdrawalObj.currency].sendToAddress(withdrawalObj.external_account_id, amount, withdrawalObj.ripple_transaction_id, function(err, txid, resHeaders){
            console.log('sT:errStr:', err);
            console.log('txid:', txid);
            console.log(resHeaders);
            if (txid != undefined){
                console.log('txid should be something. is it?');
            }
        });
    }

//is a txid enough to clear the withdrawal? Hm.
    function validateAddress(thisWithdrawal, callback){
        currency = thisWithdrawal.currency;
        address = thisWithdrawal.external_account_id;
        console.log ('validating:', currency, address);
        coinDaemons[currency].validateAddress(address, function(errStr, isValid, resHeaders){
            console.log('V:errStr:',errStr);
            //if (err) { console.log(err);}
                //console.log('isValid', isValid, resHeaders, '\n--', typeof(resHeaders), '--\n');
            if (isValid == undefined){
                //console.log(address, ': BURN THE WITCH BURN THE WITCH!');
                //callback(thisWithdrawal, false);
                //return false;
            }

            else{
                if (isValid.isvalid == false){
                    console.log(address, ': FALSE!');
                    callback(thisWithdrawal, isValid.isvalid);
                    return false;
                }
                if (isValid.isvalid == true){
                    console.log(address, ': TRUE!');
                    callback(thisWithdrawal, isValid.isvalid);
                    return true;
                }
            }
        });
    }

    function clearWithdrawal(){
        //clear pending_withdrawal
    }

//console.log('TX:',transaction);
//    console.log('transaction.withdrawals[0]', transaction.withdrawals[0]);
//    console.log('transaction.withdrawals[0].currency', transaction.withdrawals[0].currency);
for (i=0; i < transaction.withdrawals.length; i++){
//console.log ('t.w['+i+']', transaction.withdrawals[i]);
    validation = validateAddress(transaction.withdrawals[i], sendTx);
//console.log('validation for', transaction.withdrawals[i].address, 'returned', validation);
//for(each in transaction.withdrawals[ol]){
//    console.log('each in transaction.withdrawal:', each);
//    sendTx(each);
    }
}
//withdrawal object example
//http://github.com/ripple/gatewayd#listing-withdrawals
exampleTx = {
  "withdrawals": [
    {
      "data": null,
      "id": 79,
      "amount": "2",
      "currency": "PHC",
      "deposit": false,
//      "external_account_id": "P9cufwoUWBcqQoQsey5PsmbVPWxZJZuFq6", //my phc address
      "external_account_id": "mkkJyeoyNokouRwKvoq3fLCpSMHj9m6dJk",
      "status": "queued",
      "ripple_transaction_id": 80,
      "createdAt": "2014-05-30T19:23:48.390Z",
      "updatedAt": "2014-05-30T19:23:48.390Z",
      "uid": null
    },
    {
      "data": null,
      "id": 84,
      "amount": "1",
      "currency": "PHC",
      "deposit": false,
      "external_account_id": "P9cufwoUWBcqQoQsey5PsmbVPWxZJZuFq6",
      "status": "queued",
      "ripple_transaction_id": 85,
      "createdAt": "2014-06-11T00:23:56.992Z",
      "updatedAt": "2014-06-11T00:23:56.992Z",
      "uid": null
    }
  ]

}



if (runSelfTest == true){
    selfTest(testLevel);
}

