//manager listener and api query
//TODO: default to polling, stream listening optional.

require ("console").log;
var stream = require ("./stream-listener.js");
console.log('stream imported');
var api = require ("./api-query.js");
console.log ('api imported');
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
        path:{"id":120}, // will be either pending_withdrawals or deposits. later. unused right now.
        parameters:{arg1:"hello",arg2:"world"}, // query parameter substitution vars
        headers:{"Accepts":"application/json"} // request headers
      };

function realCallback(res){
//PROCESS WITHDRAWAL!
};

function testCallback(res){
    console.log('TESTCALLBACK:',res, '\n');
};

function middleman(){ //Couldn't find a better way to have remote.on events trigger api queries
    api(args, testCallback);
};

//create stream listener
xx = stream(options,middleman); //events in stream call middleman
