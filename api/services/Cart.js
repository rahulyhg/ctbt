var objectid = require("mongodb").ObjectId;
var schema = new Schema({
  name: String,
  email: String,
  mobile: String,
  groupSize: Number,
  myCart: {
    package:[{
      type2:String,
      package:{
      type: Schema.Types.ObjectId,
      ref: 'Package',
      index: true
    }
  }],
    activities: [{
      type2:String,
      activities:{
      type: Schema.Types.ObjectId,
      ref: 'Activities',
      index: true
    }
  }],
    whatshot:[{
      type2:String,
      whatshot:{
      type: Schema.Types.ObjectId,
      ref: 'WhatsHot',
      index: true
    }
  }]

  },
   order: {
      type: Number,
      default:0
  }
});

schema.plugin(deepPopulate, {
  populate: {
    'myCart.package.package': {
      select:'_id image title1 title2 destination'
    },
    'myCart.package.package.destination':{
      select:'_id name'
    },
    'myCart.activities.activities':{
      select:'_id  name destination image1'
    },
      'myCart.activities.activities.destination':{
      select:'_id name'
    },
    'myCart.whatshot.whatshot':{
      select:'_id  name image'
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Cart', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "myCart.whatshot.whatshot myCart.activities.activities.destination myCart.activities.activities myCart.package myCart.package.package.destination myCart.activities myCart.whatshot", "myCart.whatshot.whatshot myCart.activities.activities.destination myCart.activities.activities myCart.package myCart.package.package.destination myCart.activities myCart.whatshot"));
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
    var mycartdata = data;
    // blue(mycartdata.myCart);
    // red(data.myCart);
    console.log(data.myCart);
      mycartdata.myCart.package=_.map(data.myCart.package,function(n) {
        n.type2 = n.type;
        delete n.type;  
        return n;
      });

      mycartdata = this(mycartdata);
//       var Model = this;
// // var newdata = this(data);

// // var mycartdata ={};
// mycartdata.package=data.myCart.package;

// newdata = mycartdata;

    mycartdata.save(function(err, respo) {
      if (err) {
        console.log( "ABC",data.myCart);
        console.log( "ABC",data.myCart.package);
        callback(err, null);
      } else {
        callback(null, respo);
      }
    });
  },
getCart: function (data, callback) {
  
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
         WhatsHot.populate(data.whatshot,{ path:"whatshot", select:"image name", options:{lean: true}},function(err,found){
        if(err){
          callback1(err, null);
        }else{
          console.log("aaa", found);
          (newreturns.whatshot) = found;
        callback1(null,newreturns);
        }
      });
    },
           function (callback1) {
               Activities.populate(data.activities,{ path:"activities", select:"name destination image1", options:{lean: true},populate:{
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



};
module.exports = _.assign(module.exports, exports, model);
