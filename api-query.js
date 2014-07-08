//Retrieve pending deposits and withdrawals from REST api
//uses code from https://www.npmjs.org/package/node-rest-client
//Bunch of unused stuff kept for future reference

//This module retrieves deposits and withdrawals on request *after* listener.js received a ledger close
//An event-based model rather than simply polling the api.

//TODO: handle econnrefused (rest not running)

var Client = require('node-rest-client').Client;
client = new Client();
var selfTest = 0;

function apiQuery(dest, callback, argsIn){
    var args ={ 
        path:{"endpoint": "", "id": null}, // pending_withdrawals, clear, deposits...
//        parameters:{arg1:"hello",arg2:"world"}, // query parameter substitution vars
        headers:{"Accepts":"application/json"} // request headers
    };
//console.log('dest:',dest);
    switch (dest){
//console.log('DEST:',dest);
        case 'pending_withdrawals':
//console.log('dest is pending_withdrawals', dest);
            args.path.endpoint = "pending_withdrawals";
console.log ('endpoint = ', args.endpoint);
            break;
        case "clear_withdrawal":
            args.id = argsIn;
            args.endpoint = "withdrawals/${id}/clear";
            break;
        case "register_deposit":
            args.endpoint = "yourmother";
            break;
    }
console.log ('ARGS:',args);
console.log ('ep: ${endpoint}',args);
    client.get("http://localhost:5990/v1/${endpoint}", args, function(data, response){
        console.log(Date.now());
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
        }else{
            console.log('apiQuery>ERROR:',data);
            //jsData = data;
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

