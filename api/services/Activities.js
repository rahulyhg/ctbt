var schema = new Schema({
    order: {
        type: Number,
        default: 0
    },
    typeCart: {
        type: String,
        default: "Activities"
    },
    name: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    image1: {
        type: String,
        default: ""
    },
    image2: {
        type: String,
        default: ""
    },
    image3: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        enum: ["day", "night"]
    },
    destination: {
        type: Schema.Types.ObjectId,
        ref: 'Destination',
        index: true
    },
    isSlider: {
        type: String,
        enum: ["Yes", "No"]
    },
    status: {
        type: String,
        enum: ["true", "false"]
    },
    popular: {
        type: String,
        enum: ["None", "Popular Attraction"]
    }
});

schema.plugin(deepPopulate, {
    populate: {
        'destination': {
            select: 'name _id'
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Activities', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, 'destination', 'destination'));
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
                    var Search = Activities.aggregate([{
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
                    var Search = Activities.aggregate([{
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
                if(_.isEmpty(data4[1])){
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
                data5.total=data4[1][0].count;
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
    }
};
module.exports = _.assign(module.exports, exports, model);