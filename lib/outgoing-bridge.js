//Functions used for outgoing-bridge payments(Asset Withdrawals)
var sep = '\n--------------------------------------------------------\n';
var logPrefix = 'outgoing-bridge';
//var coinProcessing = {};

var coinProcessing = {
	currMap : {}, // asynchronous exec creates need to lookup address:currency
	coinDaemons : {},

    sendTx : function (withdrawalObj, isValid, fnClearPending){
        console.log(logPrefix, withdrawalObj.external_account_id, 'is valid:',isValid);
        if (isValid != true){
            console.log(logPrefix, 'Invalid address. Rejecting.')
            return false;
        }

        console.log(sep, logPrefix, 'Processing transaction');
        amount = Number(withdrawalObj.amount)
        commentTo = String(withdrawalObj.ripple_transaction_id);
        console.log(logPrefix, "Converted '" + typeof(withdrawalObj.amount) + "' " + withdrawalObj.amount + " to '" + typeof(amount)+ "' " + amount);
        console.log(logPrefix, "Converted '" + typeof(withdrawalObj.ripple_transaction_id)  + "' " + withdrawalObj.ripple_transaction_id + " to '" + typeof(commentTo)+ "' " + commentTo);
        console.log(logPrefix, 'Action:', withdrawalObj.currency, 'sendToAddress(', withdrawalObj.external_account_id, amount, commentTo,')');
        this.coinDaemons[withdrawalObj.currency].sendToAddress(withdrawalObj.external_account_id, amount, commentTo, function(err, txid, resHeaders){
            console.log(logPrefix, 'errors:', err, '\nresHeaders', resHeaders, '\ntxid:', txid);
            if (txid != undefined ){
                console.log(logPrefix, 'Transaction sent! TXID:',txid);
                //fnClearPending(withdrawalObj.id);//should not be done here. Handle in process-withdrawal
                //return thiswithdrawal.id;
				fnClearPending(withdrawalObj.id);
				return true;
            }else{
                console.log(logPrefix, 'process-withdrawal>sendTx>Transaction failed!!');// not, shit ten bricks
                return false;
            }
        });
    console.log(logPrefix, 'unknown error. Should not reach this point in execution.');
    return false;
    },

    validateAddress : function (thisWithdrawal, fnClearPending, callback){
        currency = thisWithdrawal.currency;
        address = thisWithdrawal.external_account_id;
        errStr = '';
        resHeaders = '';
        isValid = '';
		valStatus = '';
		this.currMap[address] = currency;
		currMap = this.currMap;

        console.log(sep, logPrefix, 'Validating:',thisWithdrawal.currency, address);
        this.coinDaemons[currency].validateAddress(address, function(err, isValid, resHeaders){
			console.log(logPrefix, 'errors:',err)
			if(err != null && err.name == 'Error'){ //if coinDaemon exists for the currency
				console.log("ERROR:",err);
			return false;
			};
			//console.log(logPrefix, '\nisValid:', isValid, '\nresHeaders', resHeaders);
			//console.log(logPrefix, 'isValid.address', isValid.address, 'isValid:' , isValid, '(isValid.isvalid:', isValid.isvalid, ')')
			console.log(logPrefix, 'response:',isValid);
			if (isValid.isvalid){
					console.log(logPrefix, 'validated:', this.currMap[isValid.address], isValid.address);
					valStatus = true;
					callback(thisWithdrawal, valStatus, this.currMap[isValid.address], isValid.address);
					//delete
					return true;
			}else{
					console.log(logPrefix, 'an address was NOT validated');
					console.log (logPrefix, 'validation problem', err, isValid);
					valStatus = 'err';
					//cannot callback. isValid.address is undefined
					return false;
			}
        });
		return valStatus;
    }
}
module.exports =  coinProcessing;
