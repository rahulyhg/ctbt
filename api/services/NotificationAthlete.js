var schema = new Schema({
    Athlete: {
        type: Schema.Types.ObjectId,
        ref: 'Athlete',
        index: true
    },
    status: {
        type: String,
        enum: ['Read', 'Unread']
    },
    type: {
        type: String
    },
    url: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    readDate: {
        type: Date,
        default: Date.now
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('NotificationAthlete', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);