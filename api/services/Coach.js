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
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    profileStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Active', 'Rejected']
    },
    dob: {
        type: Date,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    credentials: {
        type: String,
        required: true
    },
    yearsOfCoaching: {
        type: Number,
        required: true
    },
    coachingFocus: [{
        type: Schema.Types.ObjectId,
        ref: 'CoachingFocus',
        index: true
    }],
    specialisations: [{
        type: Schema.Types.ObjectId,
        ref: 'Specialisations',
        index: true
    }],
    specialisationOther: {
        type: String
    },
    freeTextCV: {
        type: String
    },
    CV: {
        type: String
    },
    profilePic: {
        type: String
    },
    accessToken: {
        type: [String],
        index: true
    },
    experience: {
        type: Number
    },
    expertise: {
        type: String
    },
    achievements: {
        type: String
    },
    coachingLimit: {
        type: Number
    },
    coachAskingPrice: {
        type: Number
    },
    paypalId: {
        type: String
    },
    paypalToken: {
        type: String
    },
    forgotPassword: {
        type: String
    },

    otp: {
        type: String
    },

    googleAccessToken: String,
    googleRefreshToken: String,
    oauthLogin: {
        type: [{
            socialId: String,
            socialProvider: String
        }],
        index: true
    },
    accessLevel: {
        type: String,
        default: "User",
        enum: ['User', 'Admin']
    },
    notificationCoach: [{
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
    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Coach', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);