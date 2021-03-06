var objectid = require("mongodb").ObjectId;
var schema = new Schema({
  name: String,
  email: String,
  mobile: String,
  groupSize: Number,
  myCart: {
    package: [{
      type2: String,
      package: {
        type: Schema.Types.ObjectId,
        ref: 'Package',
        index: true
      }
    }],
    activities: [{
      type2: String,
      activities: {
        type: Schema.Types.ObjectId,
        ref: 'Activities',
        index: true
      }
    }],
    whatshot: [{
      type2: String,
      whatshot: {
        type: Schema.Types.ObjectId,
        ref: 'WhatsHot',
        index: true
      }
    }],
    accomodation: [{
      destination: String,
      name: String,
      image: String
    }]
  },
  order: {
    type: Number,
    default: 0
  }
});

schema.plugin(deepPopulate, {
  populate: {
    'myCart.package.package': {
      select: '_id image title1 title2 destination'
    },
    'myCart.package.package.destination': {
      select: '_id name'
    },
    'myCart.activities.activities': {
      select: '_id  name destination image1'
    },
    'myCart.activities.activities.destination': {
      select: '_id name'
    },
    'myCart.whatshot.whatshot': {
      select: '_id  name image location'
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Cart', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "myCart.whatshot.whatshot myCart.activities.activities.destination myCart.activities.activities myCart.package myCart.package.package.destination myCart.activities myCart.whatshot", "myCart.whatshot.whatshot myCart.activities.activities.destination myCart.activities.activities myCart.package myCart.package.package.destination myCart.activities myCart.whatshot"));
var model = {
  getMyCart: function (data, callback) {
    Cart.findOne({
      _id: data._id
    }).populate("myCart.activities", '_id image1 name destination').populate("myCart.package", '_id image title1 destination').populate("myCart.package.destination", '_id name').exec(function (err, found) {
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

  saveCart: function (data, callback) {
    var mycartdata = data;
    // blue(mycartdata.myCart);
    // red(data.myCart);
    console.log(data.myCart);
    mycartdata.myCart.package = _.map(data.myCart.package, function (n) {
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
    var deepSearch = "myCart.whatshot.whatshot  myCart.activities.activities.destination myCart.activities.activities myCart.package myCart.package.package.destination myCart.activities myCart.whatshot";
    mycartdata.save(function (err, respo) {
      if (err) {
        callback(err, null);
      } else {
        console.log("respo", respo);
        Cart.deepPopulate(respo, deepSearch, function (err, data) {
          if (err) {
            callback(err, null);
          } else {
            console.log("data", data);

            // console.log("data DEST", data.myCart.activities[0].activities.destination.name);
            //  console.log("data DEST", data.myCart.package[0].package.destination);

            console.log("data ACT", data.myCart.activities);
            console.log("data PACK", data.myCart.package);
            console.log("data WHTH", data.myCart.whatshot);
            var emailData = {};
            emailData.email = data.email;
            emailData.cc = "sales@thebachelortrip.com";
            emailData.content = data;
            emailData.contentAct = data.myCart.activities;
            emailData.contentPack = data.myCart.package;
            emailData.contentWhot = data.myCart.whatshot;
            emailData.filename = "CARTMAILER2.ejs";
            emailData.subject = "TBT - CART INFO";
            // console.log("FINAL DATA",data.myCart.activities.activities.name);
            Config.email(emailData, function (err, emailRespo) {
              if (err) {
                console.log("EROR in EMAIL CONFIG", err);
                callback(err, null);
              } else {
                console.log(emailRespo);

                callback(null, data);
              }
              //  callback(null, data);
            });
            //  callback(null,data);
          }
        });
      }
    });
  },
  getCart: function (data, callback) {

    var newreturns = {};
    //  newreturns.package = [];
    //  newreturns.activities = [];
    async.parallel([
      function (callback1) {
        Package.populate(data.package, {
          path: "package",
          select: "image title1 title2 destination",
          options: {
            lean: true
          },
          populate: {
            path: 'destination',
            select: 'name'
          }
        }, function (err, found) {
          if (err) {
            callback1(err, null);
          } else {
            console.log("aaa", found);
            (newreturns.package) = found;
            callback1(null, newreturns);
          }
        });
      },
      function (callback1) {
        WhatsHot.populate(data.whatshot, {
          path: "whatshot",
          select: "image name",
          options: {
            lean: true
          }
        }, function (err, found) {
          if (err) {
            callback1(err, null);
          } else {
            console.log("aaa", found);
            (newreturns.whatshot) = found;
            callback1(null, newreturns);
          }
        });
      },
      function (callback1) {
        Activities.populate(data.activities, {
          path: "activities",
          select: "name destination image1",
          options: {
            lean: true
          },
          populate: {
            path: 'destination',
            select: 'name'
          }
        }, function (err, found2) {
          if (err) {
            callback1(err, null);
          } else {
            console.log("bbb", found2);
            newreturns.activities = found2;
            callback1(null, newreturns);
          }
        });
      },

      function (callback1) {
        newreturns.accomodation = data.accomodation;
        callback1(null, newreturns);
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
