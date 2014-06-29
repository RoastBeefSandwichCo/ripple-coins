/*This module creates a websocket to listen to the ripple network
It watches for ledger_closes to trigger queries to the REST api for pending deposit or withdrawal
*/

require ("console").log;

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

var Remote = require('ripple-lib').Remote;
var remote = new Remote(options);
console.log('new remote created');
var request = remote.connect(options); //connect websocket to server and start listening
console.log('remote connected');

request.on('success', function(res) { //tell me it worked. Needs failure handling
    console.log("res-success");
});

request.on('error', function(err) { // Oh, there's the failure handling.
  console.log("CAUSE FUCK YOU! THAT'S WHY!",err);
});

request.on('ledger_closed', function(res){
    console.log('Ledger closed!\n',res);
    //CODE GOES HERE
    //QUERY REST API v1/pending_withdrawals
});
