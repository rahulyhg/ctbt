var objectid = require("mongodb").ObjectId;
var schema = new Schema({
  name: String,
  email: String,
  mobile: String,
  groupSize: Number,
  myCart: [{
    type: {
      type: String,
      enum: ["Package", "Activities"]
    },
    package: {
      type: Schema.Types.ObjectId,
      ref: 'Package',
      index: true
    },
    activities: {
      type: Schema.Types.ObjectId,
      ref: 'Activities',
      index: true
    }
  }],
    order:Number
});

schema.plugin(deepPopulate, {
  populate: {
    'myCart.package': {
      select:'_id image title1 title2 destination'
    },
    'myCart.package.destination':{
      select:'_id name'
    },
    'myCart.activities':{
      select:'_id  name destination'
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Cart', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "myCart.package myCart.package.destination myCart.activities", "myCart.package myCart.package.destination myCart.activities"));
var model = {
  getMyCart: function(data, callback) {
    Cart.findOne({
      _id: data._id
    }).populate("myCart.activities",'_id image1 name destination').populate("myCart.package",'_id image title1 destination').populate("myCart.package.destination",'_id name').exec(function(err, found) {
      if (err) {
        // console.log(err);
        callback(err, null);
      } else {
        console.log(found.myCart, "000");
        var data = {};
        data.results = found.myCart;
        if (found) {
          callback(null, data);
        } else {
          callback(null, {
            message: "No Data Found"
          });
        }
      }

    })
  },

  saveCart: function(data, callback) {
    var mycartdata = this(data);
    mycartdata.save(function(err, respo) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, respo);
      }
    });
  },



// getCart: function (data, callback) {
//   console.log("innnn");
  
//        var newreturns = {};
//       //  newreturns.package = [];
//       //  newreturns.activities = [];
       
//          Package.populate(data.package,{ path:"package", select:"image title1 title2 destination", options:{lean: true},populate:{
//            path:'destination',
//            select:'name'
//          }},function(err,found){
//         if(err){
//           callback(err, null);
//         }else{
//           console.log("aaa", found);
//           (newreturns.package) = found;
       
//         Activities.populate(data.activities,{ path:"activities", select:"name destination", options:{lean: true},populate:{
//            path:'destination',
//            select:'name'
//          }},function(err,found2){
//         if(err){
//           callback(err, null);
//         }else{
//           console.log("bbb", found2);
//           newreturns.activities = found2;
//         callback(null,newreturns);
//         }
//       });
  
           
//    }
//          });
// },


// ********************************************************


getCart: function (data, callback) {
  console.log("innnn");
  
       var newreturns = {};
      //  newreturns.package = [];
      //  newreturns.activities = [];
       async.parallel([
           function (callback1) {
         Package.populate(data.package,{ path:"package", select:"image title1 title2 destination", options:{lean: true},populate:{
           path:'destination',
           select:'name'
         }},function(err,found){
        if(err){
          callback1(err, null);
        }else{
          console.log("aaa", found);
          (newreturns.package) = found;
        callback1(null,newreturns);
        }
      });
    },




           function (callback1) {
               Activities.populate(data.activities,{ path:"activities", select:"name destination", options:{lean: true},populate:{
           path:'destination',
           select:'name'
         }},function(err,found2){
        if(err){
          callback1(err, null);
        }else{
          console.log("bbb", found2);
          newreturns.activities = found2;
        callback1(null,newreturns);
        }
      });
           }
       ], function (err, respo) {
           if (err) {
               console.log(err);
               callback(err, null);
           } else {
               callback(null, newreturns);
           }
       });
   },

  // ***************************************************************8

// // getCart: function (data, callback) {
// //     async.parallel({
      
// //       Package: function (callback) {
// //          Package.populate(data,{ path:"package", select:"title1 title2", options:{lean: true}},function(err,found){
// //         if(err){
// //           callback(err, null);
// //         }else{
// //         callback(null,found);
// //         }
// //       });
// //       },

// //       Activities: function (callback) {
// //          Activities.populate(data,{ path:"activities", select:"name", options:{lean: true}},function(err,found){
// //         if(err){
// //           callback(err, null);
// //         }else{
// //         callback(null, found);
// //         }
// //       });
// //       },

// //     }, function (err, results) {
// //         if (err) {
// //             console.log(err);
// //             callback(err, null);
// //         } else if (results) {
// //             callback(null, results);
// //         } else {
// //             callback(null, results);
// //         }
// //     });
// },



};
module.exports = _.assign(module.exports, exports, model);
