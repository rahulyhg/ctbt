module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {


  saveEnquire: function(req, res) {
    if (req.body) {
        //    req.body.myCart = req.session.cart;
      // req.body.myCart.package = req.session.cart.package;
      // req.body.myCart.activities = req.session.cart.activities;
      // req.body.myCart.whatshot = req.session.cart.whatshot;
      Enquire.saveEnquire(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

};
module.exports = _.assign(module.exports, controller);
