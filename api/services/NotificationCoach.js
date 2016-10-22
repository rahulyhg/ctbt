var schema = new Schema({
    coach: {
        type: Schema.Types.ObjectId,
        ref: 'Coach',
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
module.exports = mongoose.model('NotificationCoach', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);