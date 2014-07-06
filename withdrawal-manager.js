//manager listener and api query
//TODO: default to polling, stream listening optional.

require ("console").log;
var stream = require ("./stream-listener.js");
var api = require ("./api-query.js");
var processing = require ("./process-withdrawal.js");

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

args ={
        path:{"endpoint":"pending_withdrawals"}, // will be either pending_withdrawals or deposits. later. unused right now.
//        parameters:{arg1:"hello",arg2:"world"}, // query parameter substitution vars
        headers:{"Accepts":"application/json"} // request headers
      };
var selfTest = 1;

//console.log(processing);
txProcessor = new processing;
txProcessor.loadCryptoConfig();
//txProcessor.processThis(exampleTx);

function realCallback(res){
//PROCESS WITHDRAWAL!
txProcessor.processThis(res);
};

function testCallback(res){
    console.log('TESTCALLBACK:',res, '\n');
};

function middleman(){ //Couldn't find a better way to have remote.on events trigger api queries
//console.log('API:',api);    
//    api(args, testCallback);
    api(args, realCallback);
};

//create stream listener

var exampleTx = require("./exampleTX.json");
xx = stream(options,middleman); //events in stream call middleman



