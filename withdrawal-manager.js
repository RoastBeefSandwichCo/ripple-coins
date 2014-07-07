//manager listener and api query
//TODO: default to polling, stream listening optional.

require ("console").log;
//var stream = require ("./stream-listener.js");
var apiQuery = require ("./api-query.js");
var processing = require ("./process-withdrawal.js");

var options = {
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
pollOrListen = ''; //if set to anything other than 'listen', module polls api every second
txProcessor = new processing;
txProcessor.loadCryptoConfig();

function clearWithdrawal(id){
    dest = "clear_withdrawal";
    apiQuery(dest, processWithdrawal, id);
    

return success or fail
}
function processWithdrawal(pendingWithdrawals){
    txProcessor.processThis(pendingWithdrawals, clearWithdrawal);
};

function testCallback(res){
    console.log('TESTCALLBACK:',res, '\n');
};

function getPendingWithdrawals(){ //FIXME: shouldn't need this function but need apiQuery to call processWithdrawal and that needs args
    dest = "pending_withdrawals";
    apiQuery(dest, processWithdrawal);
};

console.log('pollOrListen', pollOrListen);
if (pollOrListen == "listen"){//create stream listener
    console.log('listening');
    var stream = require ("./stream-listener.js");
    xx = stream(options,getPendingWithdrawals); //events in stream call middleman
}else{
    console.log('polling');
    setInterval(apiQuery, 1000,[args, processWithdrawal]);
}
//self-test only
//var exampleTx = require("./exampleTX.json");



