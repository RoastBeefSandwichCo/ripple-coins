//manager listener and api query
//TODO: default to polling, stream listening optional.

require ("console").log;
var stream = require ("./stream-listener.js");
var api = require ("./api-query.js");
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

args ={
        path:{"endpoint":"pending_withdrawals"}, // will be either pending_withdrawals or deposits. later. unused right now.
//        parameters:{arg1:"hello",arg2:"world"}, // query parameter substitution vars
        headers:{"Accepts":"application/json"} // request headers
      };

var selfTest = 1;
pollOrListen = ''; //if set to anything other than 'listen', module polls api every second
txProcessor = new processing;
txProcessor.loadCryptoConfig();

function realCallback(res){
txProcessor.processThis(res);
};

function testCallback(res){
    console.log('TESTCALLBACK:',res, '\n');
};

function middleman(){ //Couldn't find a better way to have remote.on events trigger api queries
    api(args, realCallback);
};

console.log('pollOrListen', pollOrListen);
if (pollOrListen == "listen"){//create stream listener
    console.log('listening');
    xx = stream(options,middleman); //events in stream call middleman
}else{
    console.log('polling');
    setInterval(api, 1000,[args, realCallback]);
}
//self-test only
//var exampleTx = require("./exampleTX.json");



