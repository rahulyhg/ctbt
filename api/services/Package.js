var objectid = require("mongodb").ObjectId;
var schema = new Schema({
    typeCart: {
        type: String,
        default: "Package"
    },
    title1: {
        type: String,
        default: ""
    },
    title2: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    banner: {
        type: String,
        default: ""
    },
    mobileBanner: {
        type: String,
        default: ""
    },
    duration: {
        type: String,
        default: ""
    },
    price: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["true", "false"]
    },
    destination: {
        type: Schema.Types.ObjectId,
        ref: 'Destination',
        index: true
    },
    pack: [{
        day: String,
        image: String,
        description: String,
        status: {
            type: String,
            enum: ["true", "false"]
        }
    }],
    order: {
        type: Number,
        default: 0
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
module.exports = mongoose.model('Package', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, 'destination', 'destination'));
var model = {
    getPack: function (data, callback) {
        Package.findOne({
            _id: data._id
        }).exec(function (err, found) {
            if (err) {
                // console.log(err);
                callback(err, null);
            } else {
                // console.log(found,"000");
                var data = {};
                data.results = found.pack;
                if (found && found.pack.length > 0) {
                    callback(null, data);
                } else {
                    callback(null, {
                        message: "No Data Found"
                    });
                }
            }

        })
    },

    getOnePack: function (data, callback) {
        Package.aggregate([{
            $unwind: "$pack"
        }, {
            $match: {
                "pack._id": objectid(data._id)
            }
        }, {
            $project: {
                "pack._id": 1,
                "pack.image": 1,
                "pack.description": 1,
                "pack.day": 1,
                "pack.status": 1,
                "pack.activities": 1
            }
        }]).exec(function (err, found) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                callback(null, found[0].pack);
            }
        });
    },

    savePack: function (data, callback) {
        if (!data._id) {
            Package.update({
                _id: data.Package
            }, {
                $push: {
                    pack: data
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
            var attribute = "pack.$.";
            _.forIn(data, function (value, key) {
                tobechanged[attribute + key] = value;
            });
            Package.update({
                "pack._id": data._id
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
    },
    deletePack: function (data, callback) {
        Package.update({
            "pack._id": data._id
        }, {
            $pull: {
                "pack": {
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
                    var Search = Package.aggregate([{
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
                    var Search = Package.aggregate([{
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
    }


};
module.exports = _.assign(module.exports, exports, model);