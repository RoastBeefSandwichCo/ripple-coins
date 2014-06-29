/*This module creates a websocket to listen to the ripple network
It watches for ledger_closes to trigger queries to the REST api for pending deposit or withdrawal
*/

require ("console").log;
//require ("debug").log;
var Remote = require('ripple-lib').Remote;

function rippledApiListener(options, callback){
    var remote = new Remote(options);
    var request = remote.connect(options); //connect websocket to server and start listening

    request.on('success', function(res) { //tell me it worked. Needs failure handling
    });

    request.on('error', function(err) { // Oh, there's the failure handling.
      console.log("CAUSE FUCK YOU! THAT'S WHY!",err);
    });

    request.on('ledger_closed', function(res){
        console.log('Listener>Ledger close received\n');
        callback(res); //manager's provided callback
    });
};

function testCallback(res){
    console.log(res);
};

function selfTest(){
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

rippledApiListener(options, testCallback);
};

module.exports = rippledApiListener;
