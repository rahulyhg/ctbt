var schema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate: validators.isEmail(),
        required: true
    },
    mobile: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    country: {
        type: String
    },

    details: {
        type: String
    },
    profilePic: {
        type: String
    },
    accessToken: {
        type: [String],
        index: true
    },
    achievements: {
        type: String
    },

    previousSeasonReview: {
        type: String
    },
    paypalId: {
        type: String
    },
    paypalToken: {
        type: String
    },
    athleteInjury: [{
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
        }
    }],
    notificationAthlete: [{
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
    }],
    blog: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Blog"
        }],
        index: true,
        restrictedDelete: true
    },
    competition: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "AthleteCompetition"
        }],
        index: true,
        restrictedDelete: true
    },
    athleteCoaching: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "AthleteCoaching"
        }],
        index: true,
        restrictedDelete: true
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Athlete', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);