//Retrieve pending deposits and withdrawals from REST api
//uses code from https://www.npmjs.org/package/node-rest-client
//Bunch of unused stuff kept for future reference

//This module retrieves deposits and withdrawals on request *after* listener.js received a ledger close
//An event-based model rather than simply polling the api.

//TODO: handle econnrefused (rest not running)
var Client = require('node-rest-client').Client;
client = new Client();
var selfTest = 1;
//use this later during withdrawal testing.
//client.registerMethod("jsonMethod", "http://remote.site/rest/json/${id}/method", "GET");
    args ={
        path:{"id":120}, // will be either pending_withdrawals or deposits. later. unused right now.
        parameters:{arg1:"hello",arg2:"world"}, // query parameter substitution vars
        headers:{"Accepts":"application/json"} // request headers
    };


function apiQuery(args, callback){
    client.methods.jsonMethod(args,function(data,response){
        //needs connect fail handling
        jsData = JSON.parse(data);
//        console.log('endpoints :', jsData.endpoints);
//        console.log('data.endpoints.server_connected :', jsData.endpoints.server_connected);
        callback(jsData);
    });
    client.on('error', function(err){
        console.log("CAUSE FUCK YOU SAYS THE API!");
        console.error(err);
    });
}
function testCallback(data){
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

client.registerMethod("jsonMethod", "http://localhost:5990/v1", "GET");
console.log('selfTest=',selfTest);
if (selfTest>0){
    runSelfTest();
}

module.exports = apiQuery;




//client.get("http://remote.site/rest/json/${id}/method?arg1=hello&arg2=world", args, 
/*client.get("http://localhost:5990/v1", args, 

            function(data, response){
            // parsed response body as js object
            console.log(data);
            // raw response
            console.log(response);
});
*/
