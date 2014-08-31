//Functions used for outgoing-bridge payments(Asset Withdrawals)
var sep = '\n--------------------------------------------------------\n';
var logPrefix = 'outgoing-bridge';
//var coinProcessing = {};
var coinProcessing = {
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
        coinDaemons[withdrawalObj.currency].sendToAddress(withdrawalObj.external_account_id, amount, commentTo, function(err, txid, resHeaders){
            console.log(logPrefix, 'errors:', err, '\nresHeaders', resHeaders, '\ntxid:', txid);
            if (txid != undefined ){
                console.log(logPrefix, 'Transaction sent! TXID:',txid);
                fnClearPending(withdrawalObj.id);
                return true;
            }else{
                console.log(logPrefix, 'process-withdrawal>sendTx>Transaction failed. See above.');// not, shit ten bricks
                return false;
            }
        });
    console.log(logPrefix, 'unknown error');
    return false;
    },

    validateAddress : function (thisWithdrawal, fnClearPending){
        currency = thisWithdrawal.currency;
        address = thisWithdrawal.external_account_id;
        errStr = '';
        resHeaders = '';
        isValid = '';
        console.log(sep, logPrefix, 'Validating:',thisWithdrawal.currency, address);
        this.coinDaemons[currency].validateAddress(address, function(err, isValid, resHeaders){
            if (err) {
				console.log(logPrefix, '(err)',err, '\n NOT VALIDATED:', currency, address,')');
				return false;
			}

            console.log(logPrefix, 'errors:', err, '\nisValid:', isValid, '\nresHeaders', resHeaders);
            console.log(logPrefix, address, 'isValid:' , isValid, 'isValid.isvalid:', isValid.isvalid)

/*            if (isValid.isvalid == false){// Always returns false, then true (in the same call). Until this is better understood, need protection against double-true
                console.log(address, ': FALSE!');
                return false;
            }*/
	    if (isValid.isvalid == true){
                console.log(logPrefix, 'VALIDATED:', currency, address,')');
//                console.log(logPrefix,'INEEDANADULT',this);
//				this.sendTx(thisWithdrawal, isValid.isvalid, fnClearPending);
                return true;
            }else{
                console.log(logPrefix, '(else) NOT VALIDATED');
                return false;
            }
        });
    return
    }
}
module.exports =  coinProcessing;
