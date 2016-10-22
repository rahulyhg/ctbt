var schema = new Schema({
    Athlete: {
        type: Schema.Types.ObjectId,
        ref: 'Athlete',
        required: true,
        index: true
    },
    injuryDate: {
        type: Date,
        default: Date.now
    },
    ResumeTraningDate: {
        type: Date,
        default: Date.now
    },
    severity: {
        type: String,
        enum: ['Minor', 'Moderate', 'Severe']
    },
    prescribingPractitioner: {
        type: String
    },
    prescribingPractitionerDoc: {
        type: String
    },
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('AthleteInjury', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);