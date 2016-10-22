var schema = new Schema({
    blogPost: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Coach',
        required: true,
        index: true
    },
    athlete: [{
        type: Schema.Types.ObjectId,
        ref: 'Athlete',
        index: true,
        required: true,
        key: "blog"
    }],
    image: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    publishingDate: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    blogLikes: [{
        athlete: {
            type: Schema.Types.ObjectId,
            ref: 'Athlete',
            required: true,
            index: true
        },
        type: {
            type: String,
            enum: ['Like', 'Dislike']
        }
    }]
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
module.exports = mongoose.model('Blog', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "athlete", "athlete"));
var model = {};
module.exports = _.assign(module.exports, exports, model);