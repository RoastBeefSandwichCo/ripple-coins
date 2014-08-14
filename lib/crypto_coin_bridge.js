function CryptoCoinBridge(options) { 
  this.gatewayd = options.gatewayd;
  this.rippleAddress = options.rippleAddress;
  this.coinAddress = options.coinAddress;
  this.coin = options.coin;
}

CryptoCoinBridge.prototype = {
  save: function(callback) {

  },
  recordCoinPayment(payment, callback) {

  }
}

module.exports = CryptoCoinBridge;

