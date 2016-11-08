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

  // addToCart: function(req, res) {
  //   if (req.body) {
  //     if (req.session.user) {

  //     } else {
  //       console.log("Not logged", req.session.cart);
  //       newcart = [];
  //       if (req.session.cart && req.session.cart.length > 0) {
  //         req.session.cart.push(req.body);
  //       } else {
  //         req.session.cart = [];
  //         req.session.cart.push(req.body);
  //       }

  //       res.json({
  //         value: true,
  //         data: req.session.cart,
  //         message: "Offline cart"
  //       });
  //     }
  //   } else {
  //     res.json({
  //       value: false,
  //       data: "Invalid Request"
  //     });
  //   }
  // },

   addToCart: function(req, res) {
    if (req.body) {
      // var packagearr = [];
      //  var activitiesarr = [];
      if (req.session.user) {

      } else {
        console.log("Not logged", req.session.cart );
        if (req.session.cart != undefined) {
          console.log("aaaaaa",req.session.cart);
          // req.session.cart.push(req.body);
          if(req.body.type==="Package"){
              req.session.cart.package.push(req.body);
              console.log("In Package",req.session.cart);
          }
          if(req.body.type==="Activities"){
            // delete req.body.package;
              req.session.cart.activities.push(req.body);
               console.log("In Activities",req.session.cart);
          }
          if(req.body.type==="WhatsHot"){
            // delete req.body.package;
              req.session.cart.whatshot.push(req.body);
               console.log("In WhatsHot",req.session.cart);
          }
        } else {
          console.log("bbbb");
          req.session.cart = {};
          req.session.cart.activities = [];
          req.session.cart.package = [];
          req.session.cart.whatshot = [];
          // req.session.cart.push(req.body);
          if(req.body.type==="Package"){
            // delete req.body.activities;
            // var req.session.cart.activities = [];
            req.session.cart.package.push(req.body);
            console.log("Package",req.session.cart);
          }
            if(req.body.type==="Activities"){
            // delete req.body.package;
            // var activitiesarr = [];
            req.session.cart.activities.push(req.body);
             console.log("Activities",req.session.cart);
          }
          if(req.body.type==="WhatsHot"){
            // delete req.body.package;
            // var activitiesarr = [];
            req.session.cart.whatshot.push(req.body);
             console.log("WhatsHot",req.session.cart);
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
      console.log("aaaa", req.session.cart);
      req.body.myCart = req.session.cart;
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
        req.body.activities =  _.cloneDeep(req.session.cart.activities);
        req.body.package =  _.cloneDeep(req.session.cart.package);
        req.body.whatshot =  _.cloneDeep(req.session.cart.whatshot);
        Cart.getCart(req.body, res.callback);
        // res.json({
        //   value: true,
        //   data: req.session.cart
        // });
      }
    } else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },


  //  Delete


   deleteCart: function(req, res) {
    if (req.body) {
      if (req.session.user) {

      } else {
        if(req.body.type==="Package"){
 var id = req.body.package;
 var mycartdata = req.session.cart.package
     
        }else if(req.body.type==="Activities"){
 var id = req.body.activities;
 var mycartdata = req.session.cart.activities
        }else if(req.body.type==="WhatsHot"){
 var id = req.body.whatshot;
 var mycartdata = req.session.cart.whatshot
        }
                if (mycartdata.length > 0) {
                    _.remove(mycartdata, function (n) {
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
            } 
    }
    else {
      res.json({
        value: false,
        data: "Invalid Request"
      });
    }
  },

};
module.exports = _.assign(module.exports, controller);
