//Retrieve pending deposits and withdrawals from REST api
//uses code from https://www.npmjs.org/package/node-rest-client
//Bunch of unused stuff kept for future reference

//This module retrieves deposits and withdrawals on request *after* listener.js received a ledger close
//An event-based model rather than simply polling the api.

//TODO: handle econnrefused (rest not running)

var Client = require('node-rest-client').Client;
client = new Client();
var selfTest = 0;

function apiQuery(args, callback){
    client.get("http://localhost:5990/v1/${endpoint}", args, function(data, response){
        if (data.indexOf('Cannot GET') < 0){
            try{
                jsData=JSON.parse(data);
                callback(jsData);
            }
            catch(e){
                console.log(e); //error in the above string(in this case,yes)!
                jsData = data;
                console.log('Could not parse data to JSON object.', jsData);
                return false;
            }
        }
        else{
            console.log('Nothing to get- No withdrawals pending (normal), or gatewayd error.');
            jsData = data;
        }
//        callback(jsData);
    });
}

function testCallback(data){
    console.log('testcallback. Should not appear in production.');
    console.log('endpoints', data.endpoints);
};

function runSelfTest(){
    args ={
        path:{"id":120},
        parameters:{arg1:"hello",arg2:"world"},
        headers:{"Accepts":"application/json"}
    };
    xx = apiQuery(args, testCallback);
    console.log('xx:',xx);
}

//client.registerMethod("jsonMethod", "http://localhost:5990/v1/${endpoint}", "GET");
console.log('selfTest=',selfTest);
if (selfTest>0){
    runSelfTest();
}

module.exports = apiQuery;

