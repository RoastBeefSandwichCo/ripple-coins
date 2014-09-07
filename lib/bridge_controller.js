function BridgeController(options) {
  this.bridgeBuilder = options.bridgeBuilder;
}

BridgeController.prototype = {
  constructor: BridgeController,

  dogecoinToRipple: function(request, response) {
    this.bridgeBuilder.buildBridgeToRipple({
      rippleAddress: request.params.rippleAddress
    })
    .then(function(bridge) {
      response
        .status(200)
        .send(bridge);
    })
    .error(function(error) {
      response
        .status(500)
        .send(error);
    })
  },
  
  rippleToDogecoin: function(request, response) {
    this.bridgeBuilder.buildBridgeToDogecoin({
      dogecoinAddress: request.params.dogecoinAddress
    })
    .then(function(bridge) {
      response
        .status(200)
        .send(bridge);
    })
    .error(function(error) {
      response
        .status(500)
        .send(error);
    });
  }
};

module.exports = BridgeController;

