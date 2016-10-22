var schema = new Schema({
    athlete: {
        type: Schema.Types.ObjectId,
        ref: 'Athlete',
        required: true,
        index: true,
        key: 'competition'
    },
    competition: {
        type: Schema.Types.ObjectId,
        ref: 'Competition',
        required: true,
        index: true,

    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected']
    },
    reason: {
        type: String
    },
});

schema.plugin(deepPopulate, {
    populate: {
        'athlete': {
            select: 'name _id'
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('AthleteCompetition', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, 'athlete', 'athlete'));
var model = {};
module.exports = _.assign(module.exports, exports, model);