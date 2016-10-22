var schema = new Schema({
    Coach: {
        type: Schema.Types.ObjectId,
        ref: 'Coach',
        required: true,
        index: true
    },
    CoachGroup: {
        type: Schema.Types.ObjectId,
        ref: 'CoachGroup',
        required: true,
        index: true
    },
    Athlete: [{
        type: Schema.Types.ObjectId,
        ref: 'Athlete',
        required: true,
        index: true
    }],
    message: {
        type: String
    },
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Chat', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);