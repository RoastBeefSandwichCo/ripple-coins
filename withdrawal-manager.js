//This module coordinates listening, polling of API, withdrawal processing and clearing
//I don't know if it's best practice but it makes it easier for me to follow and debug
//TODO: start using config.json

require ("console").log;
var apiQuery = require ("./api-query.js");
var processing = require ("./process-withdrawal.js");
logprefix = 'withdrawal-manager';

var options = {//move to config
    trace: false,
    "streams" : ['ledger'],
    servers :[
        {
                host : 's1.ripple.com',
                port : 443,
                id : 0
        }
    ]
 };

var selfTest = 1;
pollOrListen = ''; //if set to anything other than 'listen', module polls api every second ... move to config
txProcessor = new processing;
txProcessor.loadCryptoConfig();

function clearWithdrawal(id){
    console.log (logprefix, 'clearWithdrawal called', id);
    dest = "clear_withdrawal";
    apiQuery(dest, processWithdrawal, id);
}

function processWithdrawal(pendingWithdrawals){
    txProcessor.processThis(pendingWithdrawals, clearWithdrawal);
};

function testCallback(res){
    console.log(logprefix, 'TESTCALLBACK:',res, '\n');
};

function getPendingWithdrawals(){
console.log(logprefix, 'getting. dest=',dest);
    dest = "pending_withdrawals";
    apiQuery(dest, processWithdrawal);
};

//make this the main function and export it
console.log(logprefix, 'pollOrListen', pollOrListen);//get from config
if (pollOrListen == "listen"){//create stream listener
    console.log(logprefix, 'listening');
    var stream = require ("./stream-listener.js");
    xx = stream(options,getPendingWithdrawals); //events in stream call middleman
}else{// use polling interval from config
    console.log(logprefix, 'polling');
    dest = "pending_withdrawals";
    setInterval(getPendingWithdrawals, 1000);
}
//self-test only
//var exampleTx = require("./exampleTX.json");
sometestvar = true;
if (sometestvar == true){
    var exampleTx = require("./exampleTX.json");
    processWithdrawal(exampleTx);
}
