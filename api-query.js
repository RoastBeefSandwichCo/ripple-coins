//Retrieve pending deposits and withdrawals from REST api
//uses code from https://www.npmjs.org/package/node-rest-client
//Bunch of unused stuff kept for future reference

//This module retrieves deposits and withdrawals on request *after* listener.js received a ledger close
//An event-based model rather than simply polling the api.

//TODO: handle econnrefused (rest not running)

var Client = require('node-rest-client').Client;
client = new Client();
var selfTest = 0;
logprefix = 'api-query';

function apiQuery(dest, callback, argsIn){
    var args ={ 
        path:{"endpoint": "", "id": null}, // pending_withdrawals, clear, deposits...
//        parameters:{arg1:"hello",arg2:"world"}, // query parameter substitution vars
        headers:{"Accepts":"application/json"} // request headers
    };
    switch (dest){
        case 'pending_withdrawals':
            args.path.endpoint = "pending_withdrawals";
            break;
        case "clear_withdrawal":
            args.path.endpoint = "withdrawals/" + argsIn + "/clear";
            break;
        case "register_deposit":
            args.endpoint = "yourmother";
            break;
    }
console.log (logprefix, 'ARGS:',args);
console.log (logprefix, 'Enpoint: ${endpoint}',args);
    client.get("http://localhost:5990/v1/${endpoint}", args, function(data, response){
        console.log(Date.now());
        if (data.indexOf('Cannot GET') < 0){
            try{
                jsData=JSON.parse(data);
                callback(jsData);
            }
            catch(e){
                console.log(logprefix, e); //error in the above string(in this case,yes)!
                jsData = data;
                console.log('Could not parse data to JSON object.', jsData);
                return false;
            }
        }else{
            console.log(logprefix, 'ERROR:',data);
                if (dest == 'clear_withdrawal'){
//should make this fatal?
                    console.log (logprefix, 'WITHDRAWAL PROCESSED(?) BUT NOT CLEARED. You may now shit bricks.');
                    return false;
                }
        }
    });
}

function testCallback(data){
    console.log(logprefix, 'testcallback. Should not appear in production.');
    console.log(logprefix, 'endpoints', data.endpoints);
};

function runSelfTest(){
    args ={
        path:{"id":120},
        parameters:{arg1:"hello",arg2:"world"},
        headers:{"Accepts":"application/json"}
    };
    xx = apiQuery(args, testCallback);
    console.log(logprefix, 'xx:',xx);
}

//client.registerMethod("jsonMethod", "http://localhost:5990/v1/${endpoint}", "GET");
console.log(logprefix, 'selfTest=',selfTest);
if (selfTest>0){
    runSelfTest();
}

module.exports = apiQuery;

