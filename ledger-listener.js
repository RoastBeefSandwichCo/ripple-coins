/*This module creates a websocket to listen to the ripple network
It watches for ledger_closes to trigger queries to the REST api for pending deposit or withdrawal


//old intro
/*This module creates a websocket to listen to the ripple network
It watches for transactions that may indicate a pending deposit or withdrawal
It is NOT meant to fully examine them, just to signal when it's probably
a good idea to check the api for a pending deposit or withdrawal.
An event-based model instead of polling the api. */

//It may have other uses.

//I just can NOT get subscribe to work so I use request.on

require ("console").log;

var options = {
    trace: false,
    "streams" : ['ledger'],//['transaction'],
    servers :[
        {
                host : 's1.ripple.com',
                port : 443,
                id : 0
        }
    ]
};

var Remote = require('ripple-lib').Remote;
var remote = new Remote(options);
console.log('new remote created');
var request = remote.connect(options); //connect websocket to server and start listening
console.log('remote connected');

request.on('success', function(res) { //tell me it worked. Needs failure handling
    console.log("res-success");
});

request.on('error', function(err) { // Oh, there's the failure handling.
  console.log("CAUSE FUCK YOU! THAT'S WHY!",err);
});

request.on('ledger_closed', function(res){
    console.log('Ledger closed!\n',res);
    //CODE GOES HERE
    //QUERY REST API v1/pending_withdrawals
});

//After some discussion with Artur Britto, I've opted to just use ledger_close as a trigger for polling the rest api
//The code below, While more comprehensive, really isn't necessary.
/*
var withdrawalCount = 0;

accountsRock = 'rLEsXccBGNR3UPuPu2hUXPjziKC3qKSBun'; // a couple of addresses to watch
accountsMe = 'rPyBms1XZtNbF4UFGgM1dDWTmtfDmsfGNs';
request.on('transaction_all', function(res){ //on any transaction in the ripple network (for testing. Not for production)
//Show some basic info on transactions we see
console.log('(', withdrawalCount,')', res.transaction.TransactionType,' : ',res.transaction.Account, ' : ', res.engine_result , ' : ' , res.engine_result_message);

if (res.transaction.TransactionType === 'Payment'){ //Sorting for these
    if (res.transaction.Amount.issuer == res.transaction.Destination){ //Withdrawals, right?
        console.log('WITHDRAWAL!!', res);
        withdrawalCount++;
        }

    console.log('--------------------\nPAYMENT!\n----'); // Mention all payments in case I'm wrong about withdrawals. I probably am.
    console.log('Account:',res.transaction.Account);
    console.log('Destination:', res.transaction.Destination);
    console.log('Issuer:', res.transaction.Amount.issuer)
;
    if (res.engine_result === 'tesSUCCESS'){ // Show only successful finalized payments fully
        console.log('~~~~\nGOOD?\n~~~~\n', res);
    }
    else{
        //display basic info about everything we see. Just cause.
        console.log('engine_result:',res.engine_result,'\nengine_result_message:', res.engine_result_message,'\n');
    };
    console.log('-----------------------');

}
else{
//console.log('not a payment');
//console.log('type: ' + res.type);
};
;
if(res.Account === accountsRock){
console.log('THATS THE ROCK!');
};

if(res.Account === accountsMe){
console.log('THATS ME!');
};


});
*/
/*
example ledger watch
request.on('ledger_closed', function(res){
    console.log('doit?',res);
});
*/

