var schema = new Schema({

    Blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        index: true,
        required: true
    },
    Athlete: {
        type: Schema.Types.ObjectId,
        ref: 'Athlete',
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['Like', 'Dislike']
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('BlogLikes', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);