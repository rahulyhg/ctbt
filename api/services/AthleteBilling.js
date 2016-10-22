var schema = new Schema({
    AthleteCoaching: {
        type: Schema.Types.ObjectId,
        ref: 'AthleteCoaching',
        required: true,
        index: true
    },
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
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('AthleteBilling', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);