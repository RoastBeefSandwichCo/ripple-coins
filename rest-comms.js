//Retrieve pending deposits and withdrawals from REST api
//uses code from https://www.npmjs.org/package/node-rest-client
//Bunch of unused stuff kept for future reference

//This module retrieves deposits and withdrawals on request *after* listener.js sees a relevant transaction.
//An event-bsed model rather than simply polling the api.


var Client = require('node-rest-client').Client;

// direct way
client = new Client();

args ={
        data:{test:"hello"}, // data passed to REST method (only useful in POST, PUT or PATCH methods)
        path:{"id":120}, // path substitution var
        parameters:{arg1:"hello",arg2:"world"}, // query parameter substitution vars
        headers:{"test-header":"client-api"} // request headers
      };


//client.get("http://remote.site/rest/json/${id}/method?arg1=hello&arg2=world", args, 
client.get("http://localhost:5990/v1", args, 

            function(data, response){
            // parsed response body as js object
            console.log(data);
            // raw response
            console.log(response);
});


// registering remote methods
//client.registerMethod("jsonMethod", "http://remote.site/rest/json/${id}/method", "GET");
client.registerMethod("jsonMethod", "http://localhost:5990/v1", "GET");



/* this would construct the following URL before invocation
 *
 * http://remote.site/rest/json/120/method?arg1=hello&arg2=world
 *
 */ 
client.methods.jsonMethod(args,function(data,response){
    // parsed response body as js object
    console.log(data);
    // raw response
    console.log(response);
});
