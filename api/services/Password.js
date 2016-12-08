var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
require('mongoose-middleware').initialize(mongoose);

var Schema = mongoose.Schema;

var schema = new Schema({

    name:String

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Password', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    deleteData: function(data, callback) {
       this.findOneAndRemove({
           _id: data._id
       }, function(err, deleted) {
           if (err) {
               callback(err, null)
           } else {
               callback(null, deleted)
           }
       });
   },


   

};
module.exports = _.assign(module.exports, exports, model);