/*This module creates a websocket to listen to the ripple network
It watches for ledger_closes to trigger queries to the REST api for pending deposit or withdrawal
*/

require ("console").log;
var Remote = require('ripple-lib').Remote;
logprefix = 'stream-listener';

function rippledApiListener(options, callback){
    var remote = new Remote(options);
    var request = remote.connect(options); //connect websocket to server and start listening

    request.on('success', function(res) { //tell me it worked. Needs failure handling
    });

    request.on('error', function(err) { // Oh, there's the failure handling.
      console.log(logprefix, "Something went wrong:",err);
    });

    request.on('ledger_closed', function(res){
        console.log(logprefix, 'Ledger close received\n');
        callback(res); //manager's provided callback
    });
};

function testCallback(res){
    console.log(logprefix, res);
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
