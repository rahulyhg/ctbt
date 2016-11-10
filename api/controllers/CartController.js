module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  getMyCart: function(req, res) {
    if (req.body) {
      Cart.getMyCart(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      })
    }
  },


   addToCart: function(req, res) {
    if (req.body) {
      // var packagearr = [];
      //  var activitiesarr = [];
      if (req.session.user) {

      } else {
        if (req.session.cart != undefined) {
          // req.session.cart.push(req.body);
          if(req.body.type==="Package"){
              req.session.cart.package.push(req.body);
          }
          if(req.body.type==="Activities"){
            // delete req.body.package;
              req.session.cart.activities.push(req.body);
          }
          if(req.body.type==="WhatsHot"){
            // delete req.body.package;
              req.session.cart.whatshot.push(req.body);
          }
        } else {
          req.session.cart = {};
          req.session.cart.activities = [];
          req.session.cart.package = [];
          req.session.cart.whatshot = [];
          // req.session.cart.push(req.body);
          if(req.body.type==="Package"){
            // delete req.body.activities;
            // var req.session.cart.activities = [];
            req.session.cart.package.push(req.body);
          }
            if(req.body.type==="Activities"){
            // delete req.body.package;
            // var activitiesarr = [];
            req.session.cart.activities.push(req.body);
          }
          if(req.body.type==="WhatsHot"){
            // delete req.body.package;
            // var activitiesarr = [];
            req.session.cart.whatshot.push(req.body);
          }
        }
      //  req.session.cart.activities.push(activitiesarr);
      //    req.session.cart.package.push(req.session.cart.activities);
// req.session.cart = newcart;
        res.json({
          value: true,
          data: req.session.cart,
          message: "Offline cart"
        });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  saveCart: function(req, res) {
    if (req.body) {
      req.body.myCart = req.session.cart;
      // req.body.myCart.package = req.session.cart.package;
      // req.body.myCart.activities = req.session.cart.activities;
      // req.body.myCart.whatshot = req.session.cart.whatshot;
      Cart.saveCart(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

  getCart: function(req, res) {
    if (req.body) {
      if (req.session.user) {

      } else {
        if(req.session.cart){
        req.body.activities =  _.cloneDeep(req.session.cart.activities);
        req.body.package =  _.cloneDeep(req.session.cart.package);
        req.body.whatshot =  _.cloneDeep(req.session.cart.whatshot);
        Cart.getCart(req.body, res.callback);
        // res.json({
        //   value: true,
        //   data: req.session.cart
        // });
      }else{
      res.json({
        value: false,
        data: "No Date In Cart"
      });
      }
    }
  } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },




   deleteCart: function(req, res) {
    if (req.body) {
      if (req.session.user) {

      } else {
        if(req.body.type==="Package"){
 var id = req.body.package;
 var mycartdata = req.session.cart.package
 if (mycartdata.length > 0) {
                   mycartdata=_.remove(mycartdata, function (n) {
                        return n.package === id;
                    });
                    res.json({
                        value: true,
                        message: "Removed",
                        data: mycartdata
                    });
                } else {
                    res.json({
                        value: false,
                        data: "Cart is Empty"
                    });
                }
        }else if(req.body.type==="Activities"){
 var id = req.body.activities;
 var mycartdata = req.session.cart.activities
 if (mycartdata.length > 0) {
                   mycartdata=_.remove(mycartdata, function (n) {
                        return n.activities === id;
                    });
                    res.json({
                        value: true,
                        message: "Removed",
                        data: mycartdata
                    });
                } else {
                    res.json({
                        value: false,
                        data: "Cart is Empty"
                    });
                }
        }else if(req.body.type==="WhatsHot"){
 var id = req.body.whatshot;
 var mycartdata = req.session.cart.whatshot
  if (mycartdata.length > 0) {
                   mycartdata=_.remove(mycartdata, function (n) {
                        return n.whatshot === id;
                    });
                    res.json({
                        value: true,
                        message: "Removed",
                        data: mycartdata
                    });
                } else {
                    res.json({
                        value: false,
                        data: "Cart is Empty"
                    });
                }
        }
                
            } 
    }
    else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },
 deleteAllCart: function(req, res) {
       req.session.destroy(function(err) {
           if (err) {
               res.json({
                   value: false,
                   error: err
               });
           } else {
               setTimeout(function() {
                   res.json({
                       value: true
                   });
               }, 3000);
           }
       });
   },
};
module.exports = _.assign(module.exports, controller);
