const Promise = require('bluebird');
const DogecoinAddressGenerator = require('./dogecoin_address_generator.js');
const DogecoinAddressValidator = require('./dogecoin_address_validator.js');

function BridgeBuilder(options) {
  this.gatewayd = options.gatewayd;
  this.RippleAddress = options.gatewayd.data.models.rippleAddresses;
  this.ExternalAccount = options.gatewayd.data.models.externalAccounts;
  this.Policy = options.gatewayd.data.models.policies;
  this.dogecoinAddressGenerator = new DogecoinAddressGenerator(options.blockchainClient);
  this.dogecoinAddressValidator = new DogecoinAddressValidator(options.blockchainClient);
}

BridgeBuilder.prototype = {
  constructor: BridgeBuilder,

  buildBridgeToRipple: function(options){
    var _this = this;
    var rippleAddressRecord;
    var dogecoinAddress;
    return new Promise(function(resolve, reject) {
      if (!_this.gatewayd.validator.isRippleAddress(options.rippleAddress)) {
        reject(new Error('InvalidRippleAddressError'));
      }
      _this.RippleAddress.findOrCreate({
        address: options.rippleAddress,
        type: 'independent',
        managed: false
      })
      .then(function(rippleAddress) {
        rippleAddressRecord = rippleAddress;
        return _this.Policy.find({
          where: {
            ripple_address_id: rippleAddress.id
          }
        })
      })
      .then(function(policy) {
        if (policy) {
          return _this.ExternalAccount.find({ where: {
            id: policy.external_account_id
          }})
          .then(function(externalAddress) {
            resolve({
              rippleAddress: options.rippleAddress,
              dogecoinAddress: externalAddress.uid
            });
          })
        } else {
          return _this.dogecoinAddressGenerator.generate()
          .then(function(dogecoinAddress) {
            return _this.ExternalAccount.create({
              name: 'dogecoin',
              uid: dogecoinAddress  
            })
          })
          .then(function(externalAccount) {
            return _this.Policy.create({
              ripple_address_id: rippleAddressRecord.id,
              external_account_id: rippleAddressRecord.id
            })
            .then(function(policy) {
              resolve({
                rippleAddress: rippleAddressRecord.address,
                dogecoinAddress: externalAccount.uid      
              });
            });
          })
        }
      })
      .error(reject);
    });
  },

  buildBridgeToDogecoin: function(options) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      var InvalidDogecoinAddressError = _this.dogecoinAddressValidator.InvalidDogecoinAddressError;
      _this.dogecoinAddressValidator.validate(options.dogecoinAddress)
      .then(function(valid) {
        return _this.ExternalAccount.findOrCreate({
          name: 'dogecoin',
          uid: options.dogecoinAddress
        })
        .then(function(externalAccount) {
          var externalAccountRecord = externalAccount;
          return _this.Policy.find({ where: {
            name: 'RippleToDogecoinBridgePolicy',
            external_account_id: externalAccount.id
          }})
          .then(function(policy) {
            if (policy) {
              return _this.RippleAddress.find({
                where: {
                  id: policy.ripple_address_id
                }
              })
              .then(function(rippleAddress) {
                if (rippleAddress) {
                  resolve({
                    dogecoinAddress: options.dogecoinAddress,
                    rippleAddress: {
                      address: rippleAddress.address,
                      tag: rippleAddress.tag
                    }
                  })
                } else {
                  reject(new Error('ripple address not found'));
                }
              })
            } else {
              return _this.RippleAddress.findOrCreate({
                address: _this.gatewayd.config.get('COLD_WALLET'),
                tag: externalAccountRecord.id,
                type: 'hosted',
                managed: true
              })
              .then(function(rippleAddress) {
                return _this.Policy.create({
                  ripple_address_id: rippleAddress.id,
                  external_account_id: externalAccountRecord.id,
                  name: 'RippleToDogecoinBridgePolicy'
                })
                .then(function(policy) {
                  resolve({
                    dogecoinAddress: options.dogecoinAddress,
                    rippleAddress: {
                      address: rippleAddress.address,
                      tag: rippleAddress.tag
                    }
                  })
                })
              })
            }
          }).error(reject)
        })
      })
      .error(reject)
    });
  }
}

module.exports = BridgeBuilder;

