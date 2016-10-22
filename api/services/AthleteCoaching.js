var schema = new Schema({
    athlete: {
        type: Schema.Types.ObjectId,
        ref: 'Athlete',
        required: true,
        index: true
    },
    coach: {
        type: Schema.Types.ObjectId,
        ref: 'Coach',
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: ['Request', 'PaymentPending', 'Active', 'Reject']
    },
    acceptedDate: {
        type: Date
    },
    expiryDate: {
        type: Date
    },
    subscriptionType: {
        type: String,
        enum: ['Monthly', 'Yearly']
    },
    reason: {
        type: String
    },
    athleteBilling: [{
        timestamp: {
            type: Date,
            default: Date.now
        },
        paymentMode: {
            type: String
        },
        status: {
            type: String,
            enum: ['Pending', 'Processing']
        },
        amount: {
            type: Number,
            default: 0
        },
        tax1: {
            type: Number,
            default: 0
        },
        tax2: {
            type: Number,
            default: 0
        },
        tax3: {
            type: Number,
            default: 0
        },
        totalAmount: {
            type: Number,
            default: 0
        },
        transactionCode: {
            type: String
        }
    }]
});

schema.plugin(deepPopulate, {
    populate: {
        'athlete': {
            select: 'name _id'
        },
        'coach': {
            select: 'name _id'
        }
    },
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('AthleteCoaching', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, 'athlete coach', 'athlete coach'));
var model = {};
module.exports = _.assign(module.exports, exports, model);