var schema = new Schema({
  name: String,
  email: String,
  phone: String,
  group: Number,
  from: Date,
  to: Date,
  budget: String,
  plan: String,
  comment: String,
  myCart: {
    activities: [{
      type2: String,
      activities: {
        type: Schema.Types.ObjectId,
        ref: 'Activities',
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
    'myCart.activities.activities': {
      select: '_id  name destination image1'
    },
    'myCart.activities.activities.destination': {
      select: '_id name'
    },
    
    'myCart.whatshot.whatshot': {
      select: '_id  name image'
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Customisation', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "myCart.whatshot.whatshot myCart.activities.activities.destination myCart.activities.activities myCart.package myCart.package.package.destination myCart.activities myCart.whatshot", "myCart.whatshot.whatshot myCart.activities.activities.destination myCart.activities.activities myCart.package myCart.package.package.destination myCart.activities myCart.whatshot"));
var model = {

  // saveCart: function (data, callback) {
  //   var mycartdata = data;
  //   // blue(mycartdata.myCart);
  //   // red(data.myCart);
  //   console.log(data.myCart);
  //   mycartdata.myCart.package = _.map(data.myCart.package, function (n) {
  //     n.type2 = n.type;
  //     delete n.type;
  //     return n;
  //   });

  //   mycartdata = this(mycartdata);

  //   mycartdata.save(function (err, respo) {
  //     if (err) {
  //       callback(err, null);
  //     } else {
  //       console.log("THIS IS RESPO", respo);

  //       callback(null, respo);
  //     }
  //   });
  // }
  

  // saveCart: function (data, callback) {
  //   var mycartdata = data;
  //   // blue(mycartdata.myCart);
  //   // red(data.myCart);
  //   console.log(data.myCart);
  //   // mycartdata.myCart.package = _.map(data.myCart.package, function (n) {
  //   //   n.type2 = n.type;
  //   //   delete n.type;
  //   //   return n;
  //   // });

  //   mycartdata = this(mycartdata);

  //   mycartdata.save(function (err, respo) {
  //     if (err) {
  //       callback(err, null);
  //     } else {
  //       //    console.log("THIS IS RESPO", respo);
  //       ///---------------////
  //       console.log("data plan", respo);
  //       console.log("data size", respo);
  //       Customisation.populate(respo, [{
  //         path: 'myCart.accomodation',
  //         select: 'name _id image'

  //       }, {
  //         path: 'myCart.activities.activities',
  //         select: 'name _id image1 '

  //       }], function (err, data) {
  //         if (err) {
  //           callback(err, null);
  //         } else {
  //           console.log("data", data);
  //           console.log("data ACT", data.myCart.activities);
  //           console.log("data ACC", data.myCart.accomodation);
  //           console.log("data group", data.group);
  //           console.log("data group", data.plan);
  //           console.log("data comm", data.comment);
  //           var dateFrom = data.from;
  //           var dateTo = data.to;

  //           var fromDate = moment(dateFrom).format('MM/DD/YYYY');
  //           var toDate = moment(dateTo).format('MM/DD/YYYY');



  //           var emailData = {};
  //           emailData.email = data.email;
  //           emailData.cc = "pratik.gawand@wohlig.com";
  //           emailData.content = data;
  //           emailData.contentAct = data.myCart.activities;
  //           emailData.contentAcc = data.myCart.accomodation;
  //           emailData.contentFrom = fromDate;
  //           emailData.contentTo = toDate;

  //           emailData.filename = "customMailer.ejs";
  //           emailData.subject = "TBT - CUSTOMIZED CART INFO";


  //           Config.email(emailData, function (err, emailRespo) {
  //             if (err) {
  //               console.log("EROR in EMAIL CONFIG", err);
  //               callback(err, null);
  //             } else {
  //               console.log(emailRespo);

  //               callback(null, data);
  //             }
  //             //   callback(null, data);
  //           });
  //         }
  //       });

  //       ///----------///


  //       //s callback(null, data);
  //     }
  //   });
  // }
  saveCart: function (data, callback) {
    var mycartdata = data;
    // blue(mycartdata.myCart);
    // red(data.myCart);
    console.log(data.myCart);
    // mycartdata.myCart.package = _.map(data.myCart.package, function (n) {
    //   n.type2 = n.type;
    //   delete n.type;
    //   return n;
    // });

    mycartdata = this(mycartdata);
  var deepSearch = "myCart.whatshot.whatshot  myCart.activities.activities.destination myCart.activities.activities myCart.package myCart.package.package.destination myCart.activities myCart.whatshot";

    mycartdata.save(function (err, respo) {
      if (err) {
        callback(err, null);
      } else {
        //    console.log("THIS IS RESPO", respo);
        ///---------------////
        // console.log("data plan", respo);
        // console.log("data size", respo);
        Customisation.deepPopulate(respo, deepSearch, function (err, data) {
          if (err) {
            callback(err, null);
          } else {
           // console.log("data", data);
            // console.log("data DEST", data.myCart.activities[0].activities.destination.name);
            // console.log("data ACT", data.myCart.activities);
            // console.log("data ACC", data.myCart.accomodation);
            // console.log("data group", data.group);
            // console.log("data group", data.plan);
            // console.log("data comm", data.comment);

            var dateFrom = data.from;
            var dateTo = data.to;
            var fromDate = moment(dateFrom).format('MM/DD/YYYY');
            var toDate = moment(dateTo).format('MM/DD/YYYY');

            var emailData = {};
            emailData.email = data.email;
            emailData.cc = "pratik.gawand@wohlig.com";
            emailData.content = data;
            emailData.contentAct = data.myCart.activities;
            emailData.contentAcc = data.myCart.accomodation;
            emailData.contentFrom = fromDate;
            emailData.contentTo = toDate;

            emailData.filename = "customMailer.ejs";
            emailData.subject = "TBT - CUSTOMIZED CART INFO";


            Config.email(emailData, function (err, emailRespo) {
              if (err) {
                console.log("EROR in EMAIL CONFIG", err);
                callback(err, null);
              } else {
                console.log(emailRespo);

                callback(null, data);
              }
              //   callback(null, data);
            });
          }
        });

        ///----------///


        //s callback(null, data);
      }
    });
  }

};
module.exports = _.assign(module.exports, exports, model);