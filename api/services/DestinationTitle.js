var objectid = require("mongodb").ObjectId;
var schema = new Schema({
  title: {
    type: String,
    default: ""
  },
  thumbnail:String,
  destination: {
    type: Schema.Types.ObjectId,
    ref: 'Destination',
    index: true
  },
  status: {
    type: String,
    enum: ["true", "false"]
  }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('DestinationTitle', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
