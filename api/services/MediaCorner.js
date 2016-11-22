var schema = new Schema({
    name:String,
    description:String,
    image:String,
    url:String,
    date:Date,
        status: {
        type: String,
        enum:["true","false"]
    },
    order: {
      type: Number,
      default:0
  }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('MediaCorner', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
