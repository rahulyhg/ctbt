var objectid = require("mongodb").ObjectId;
var schema = new Schema({
  name: {
    type: String,
    default: ""
  },
  description: String,
  destination: {
    type: Schema.Types.ObjectId,
    ref: 'Destination',
    index: true
  },
  destinationTitle: {
    type: Schema.Types.ObjectId,
    ref: 'DestinationTitle',
    index: true
  },
  images: [{
    image: String,
    status: {
      type: String,
      enum: ["true", "false"]
    }
  }],
  status: {
    type: String,
    enum: ["true", "false"]
  },
  order: {
    type: Number,
    default: 0
  }
});

schema.plugin(deepPopulate, {
  populate: {
    'destination': {
      select: 'name _id'
    },
    'destinationTitle': {
      select: 'name _id'
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('DestinationContent', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, 'destinationTitle destination', 'destinationTitle destination'));
var model = {

  search: function (data, callback) {
    var Model = this;
    var Const = this(data);
    var maxRow = Config.maxRow;
    var pagestartfrom = (data.page - 1) * maxRow;
    var page = 1;
    // var name1=subString()
    if (data.page) {
      page = data.page;
    }
    var field = data.field;
    var options = {
      field: data.field,
      filters: {
        keyword: {
          fields: ['name'],
          term: data.keyword
        }
      },

      sort: {
        desc: "name",
      },
      start: (page - 1) * maxRow,
      count: maxRow
    };
    _.each(data.filter, function (n, key) {
      if (_.isEmpty(n)) {
        n = undefined;
      }
    });
    if (data.keyword != "") {
      async.parallel([
        //Start 
        function (callback) {
          var Search = DestinationContent.aggregate([{
            $lookup: {
              from: "destinations",
              localField: "destination",
              foreignField: "_id",
              as: "destination"
            }
          }, {
            $unwind: "$destination"
          }, {
            $match: {
              $or: [{
                "destination.name": {
                  $regex: data.keyword,
                  $options: 'i'
                }
              }, {
                "name": {
                  $regex: data.keyword,
                  $options: 'i'
                }
              }]
            }
          }, {
            $skip: parseInt(pagestartfrom)
          }, {
            $limit: maxRow
          }], function (err, data1) {
            if (err) {
              console.log("In Err");
              callback(err, null);
            } else {
              console.log("In Data data", data1);
              callback(null, data1);
            }
          });

        },

        function (callback) {
          var Search = DestinationContent.aggregate([{
            $lookup: {
              from: "destinations",
              localField: "destination",
              foreignField: "_id",
              as: "destination"
            }
          }, {
            $unwind: "$destination"
          }, {
            $match: {
              $or: [{
                "destination.name": RegExp(data.keyword, 'i')
              }, {
                "name": RegExp(data.keyword, 'i')
              }]
            }
          }, {
            $group: {
              _id: null,
              count: {
                $sum: 1
              }
            }
          }, {
            $project: {
              "_id": 1,
              "count": 1
            }
          }], function (err, data2) {
            if (err) {
              console.log("In Err");
              callback(err, null);
            } else {
              console.log("In Data", data2);
              callback(null, data2);
            }
          });
        }

        //end
      ], function (err, data4) {
        if (err) {
          callback(err, null);
        }
        if (_.isEmpty(data4[1])) {
          var data5 = {
            results: data4[0],
            options: {
              count: 0
            }
          };
        } else {
          var data5 = {
            results: data4[0],
            options: {
              count: maxRow
            }
          };
          data5.total = data4[1][0].count;
        }

        console.log("Data 5 ", data5);
        callback(null, data5);
      });
    } else {
      var Search = Model.find(data.filter)

      .order(options)
        .deepPopulate("destination")
        .keyword(options)
        .page(options, callback);
    }
  },

  // 

  getImages: function (data, callback) {
    DestinationContent.findOne({
      _id: data._id
    }).exec(function (err, found) {
      if (err) {
        // console.log(err);
        callback(err, null);
      } else {
        // console.log(found,"000");
        var data = {};
        data.results = found.images;
        if (found && found.images.length > 0) {
          callback(null, data);
        } else {
          callback(null, {
            message: "No Data Found"
          });
        }
      }

    })
  },


  getOneImages: function (data, callback) {
    DestinationContent.aggregate([{
      $unwind: "$images"
    }, {
      $match: {
        "images._id": objectid(data._id)
      }
    }, {
      $project: {
        "images.name": 1,
        "images.description": 1,
        "images.order": 1,
        "images.status": 1,
        "images.image": 1,
        "images.descriptionTitle": 1,
        "images._id": 1
      }
    }]).exec(function (err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, found[0].images);
      }
    });
  },


  deleteImages: function (data, callback) {
    DestinationContent.update({
      "images._id": data._id
    }, {
      $pull: {
        "images": {
          "_id": objectid(data._id)
        }
      }
    }, function (err, updated) {
      console.log(updated);
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, updated);
      }
    });
  },


  saveImages: function (data, callback) {
    //  var product = data.product;
    //  console.log(product);
    console.log("dddddd", data);
    if (!data._id) {
      DestinationContent.update({
        _id: data.DestinationContent
      }, {
        $push: {
          images: data
        }
      }, function (err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    } else {
      data._id = objectid(data._id);
      tobechanged = {};
      var attribute = "images.$.";
      _.forIn(data, function (value, key) {
        tobechanged[attribute + key] = value;
      });
      DestinationContent.update({
        "images._id": data._id
      }, {
        $set: tobechanged
      }, function (err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    }
  }

};
module.exports = _.assign(module.exports, exports, model);