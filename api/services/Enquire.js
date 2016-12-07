var objectid = require("mongodb").ObjectId;
var schema = new Schema({
  cities: String,
  activities: String,
  plan: String,
  size: Number,
  budget: Number,
  from: Date,
  to: Date,
  comment: String,
  name: String,
  phone: String,
  email: String,
  order: {
    type: Number,
    default: 0
  },

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Enquire', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

  saveEnquire: function (data, callback) {
    var enquiredata = data;
    // blue(enquiredata.myCart);
    // red(data.myCart);
    console.log(data);
    // enquiredata.myCart.package = _.map(data.myCart.package, function (n) {
    //   n.type2 = n.type;
    //   delete n.type;
    //   return n;
    // });

    enquiredata = this(enquiredata);
    enquiredata.save(function (err, respo) {
      if (err) {
        callback(err, null);
      } else {
        //callback(null, respo);
        ///COM
        var dateFrom = data.from;
        var dateTo = data.to;

        var fromDate = moment(dateFrom).format('MM/DD/YYYY');
        var toDate = moment(dateTo).format('MM/DD/YYYY');
        console.log(fromDate);
        console.log(toDate);
        var emailData = {};
        emailData.email = data.email;
        emailData.cc = "pratik.gawand@wohlig.com";
        emailData.content = data;
        emailData.contentFrom = fromDate;
        emailData.contentTo = toDate;

        // emailData.contentAct = data.myCart.activities;
        // emailData.contentPack = data.myCart.package;
        // emailData.contentWhot = data.myCart.whatshot;
        emailData.filename = "enquireletter.ejs";
        emailData.subject = "Enquiry Info TBT ";
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
        // callback(null, data);
      }
    });






    /////////COM
    // }
    // });

    // enquiredata.save(function (err, respo) {
    //   if (err) {
    //     callback(err, null);
    //   } else {
    //     console.log("respo", respo);
    //     Cart.populate(respo, [{
    //       path: 'myCart.activities.activities',
    //       select: 'name _id image1',

    //     }, {
    //       path: 'myCart.package.package',
    //       select: 'title1 image _id'
    //     }, {
    //       path: 'myCart.whatshot.whatshot',
    //       select: 'name image _id'
    //     }], function (err, data) {
    //       if (err) {
    //         callback(err, null);
    //       } else {
    //         console.log("data", data);

    //         console.log("data ACT", data.myCart.activities);
    //         console.log("data PACK", data.myCart.package);
    //         console.log("data WHTH", data.myCart.whatshot);
    //         var emailData = {};
    //         emailData.email = data.email;
    //         emailData.cc = "pratik.gawand@wohlig.com";
    //         emailData.content = data;
    //         emailData.contentAct = data.myCart.activities;
    //         emailData.contentPack = data.myCart.package;
    //         emailData.contentWhot = data.myCart.whatshot;
    //         emailData.filename = "emailletter.ejs";
    //         emailData.subject = "MyCart on TBT";
    //         // console.log("FINAL DATA",data.myCart.activities.activities.name);
    //         Config.email(emailData, function (err, emailRespo) {
    //           if (err) {
    //             console.log("EROR in EMAIL CONFIG", err);
    //             callback(err, null);
    //           } else {
    //             console.log(emailRespo);

    //             callback(null, data);
    //           }
    //           //  callback(null, data);
    //         });
    // callback(null,data);
    //       }
    //     });
    //   }
    // });
  },



};
module.exports = _.assign(module.exports, exports, model);