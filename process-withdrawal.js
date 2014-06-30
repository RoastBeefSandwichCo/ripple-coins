//https://www.npmjs.org/package/bitcoin
var bitcoin = require ('bitcoin');
//note: note all commands are supported by all bitcoin clients, but there is enough consistency
//for our purposes and this library allows us to offer extensibility to future maintainers

var coins = require ("./cryptocurrencies.json"); //may need to JSON.parse(coins)
console.log(coins);
console.log(coins.PHC.port);
//external call instantiates
var coinDaemons = {};
//in constructor, open connections to all coin daemons

for (var each in coins){
console.log('coin found:',each);
}

for (var each in coins){ //no idea if this mapping attempt with work
//Should scale to higher loads better than connecting for every tx
//for each object (coin configuration) in the
        coinDaemons[each]/* where each is name of object. i.e., CR1, CR2, PHC)*/ = new bitcoin.Client({ //map property names to variable names to call by name later
        host: 'localhost',
        port: each.port,
        user: each.rpcusername,
        pass: each.rpcpassword,
        timeout: 30000
    });
console.log('each', each);
console.log('port',coins[each].port);

}

function selfTest(){
    console.log('selfTest!');
    for(var obj in coins){
        console.log('obj:' + obj, '\ncoins[obj]:\n', coins[obj],'\n');
        for (var propt in coins[obj]){
            console.log('obj[propt]:',propt, '\ncoins[obj[propt]]:' , coins[obj][propt],'\n');
        }
    }
}

function coinProcessing(transaction){

//withdrawals is AN ARRAY. so like, handle that.
    function sendTx(){
    //send transaction
//        should look something like:
//        command                      address                                     amount                                                     comment
//        propertyname.sendToAddress  transaction.withdrawals.external_account_id transacton.withdrawals.(convertToNumber)amount "'ripple_transaction_id'"
/*        coinDaemons[transaction.withdrawals.currency].sendToAddress(transaction.withdrawals.external_account_id, transaction.withdrawals.(convertToNumber)amount, "'ripple_transaction_id'", function(err, txid, resHeaders){
            if (err) return console.log(err);
            console.log('txid:', txid);
        });*/
    }

//is a txid enough to clear the withdrawal? Hm.

    function clearWithdrawal(){
        //clear pending_withdrawal
    };
}

abc = selfTest();

//withdrawal object example
//http://github.com/ripple/gatewayd#listing-withdrawals
/*{
  "withdrawals": [
    {
      "data": null,
      "id": 79,
      "amount": "1001",
      "currency": "SWD",
      "deposit": false,
      "external_account_id": 6,
      "status": "queued",
      "ripple_transaction_id": 80,
      "createdAt": "2014-05-30T19:23:48.390Z",
      "updatedAt": "2014-05-30T19:23:48.390Z",
      "uid": null
    },
    {
      "data": null,
      "id": 84,
      "amount": "8.5",
      "currency": "SWD",
      "deposit": false,
      "external_account_id": 6,
      "status": "queued",
      "ripple_transaction_id": 85,
      "createdAt": "2014-06-11T00:23:56.992Z",
      "updatedAt": "2014-06-11T00:23:56.992Z",
      "uid": null
    }
  ]

}*/
