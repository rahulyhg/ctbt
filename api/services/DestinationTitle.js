var objectid = require("mongodb").ObjectId;
var schema = new Schema({
  name: {
    type: String,
    default: ""
  },
  thumbnail:String,
  destination: {
    type: Schema.Types.ObjectId,
    ref: 'Destination',
    index: true
  },
  status: {
    type: String,
    enum: ["true", "false"]
  },
    order: {
      type: Number,
      default:0
  }
});

schema.plugin(deepPopulate, {
  populate:{
    'destination':{
      select:'name _id'
    }
  }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('DestinationTitle', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,'destination','destination'));
var model = {

      search: function (data, callback) {
        var Model = this;
        var Const = this(data);
        var maxRow = Config.maxRow;
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
            var Search = DestinationTitle.aggregate([{
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
                        "destination.name": RegExp(data.keyword,'i')
                    }, {
                        "name": RegExp(data.keyword,'i')
                    }]
                }
            }, {
                $limit: 10
            }], function (err, data) {
                if (err) {
                    console.log("In Err");
                    callback(err, null);
                } else {
                    var count1 =10;
                    var data1 = {
                        results: data,
                        options: {
                            count : count1
                        }
                    };
                    console.log("In Data", data1);
                    callback(null, data1);
                }
            });
        } else {
            var Search = Model.find(data.filter)

            .order(options)
                .deepPopulate("destination")
                .keyword(options)
                .page(options, callback);
        }
    }
};
module.exports = _.assign(module.exports, exports, model);
