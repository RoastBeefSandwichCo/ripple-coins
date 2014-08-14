var RIPPLE_ADDRESS = '';
var COIN_ADDRESS = '';
var COIN_TRANSACTION_HASH = '';

describe('Crypto Coin Inbound Bridge', function() {
  describe('a bitcoin bridge with no fee', function() {
    before(function() {
      bridge = new CryptoCoinBridge({
        rippleAddress: RIPPLE_ADDRESS,
        coinAddress: COIN_ADDRESS,
        coin: 'BTC'
      });
    });

    it('#save should create an external transaction and a policy', function(done) {
      bridge.save(function(error, bridge) {
        assert(bridge.external_account.id > 0)
        assert.strictEqual(bridge.external_account.uid, COIN_ADDRESS);
        assert.strictEqual(bridge.external_account.name, 'BTC');
        assert.strictEqual(bridge.policy.external_account_id, bridge.external_account.id);
        assert.stictEqual(bridge.policy.fee, 0.0); 
        done();
      });
    });

    it('#recordCoinPayment should deposit in gatewayd', function(done) {
      bridge.recordCoinPayment({
        amount: 3.57,
        hash: COIN_TRANSACTION_HASH 
      }, function(error,  bridgePayment) {
        assert(!error);  
        assert.strictEqual(bridgePayment.external_account_id, bridge.external_account.id);
        assert.strictEqual(bridgePayment.uid, COIN_TRANSACTION_HASH);
        assert.strictEqual(bridgePayment.currency, 'BTC');
        assert.strictEqual(bridgePayment.amount, 3.57);
        done();
      });
    });

  });

  describe('a bridge with a non-zero fee', function() {
    before(function() {
      bridge = new BitcoinToRippleBridge({
        rippleAddress: '',
        bitcoinAddress: '',
        fee: 0.01 // 1%
      });
    });

    it('should create a policy with a non-zero fee', function(done) {
      bridge.save(function(error, bridge) {
        assert.stictEqual(bridge.policy.fee, 0.01); 
      });
    });
  });
});

