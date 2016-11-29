var schema = new Schema({
    name:String,
    email:String,
    phone:String,
    group:String,
    from:Date,
    to:Date,
    budget:String,
    stage:String,
    somethingelse:String,
      myCart: {
    activities: [{
      type2:String,
      activities:{
      type: Schema.Types.ObjectId,
      ref: 'Activities',
      index: true
    }
  }],
  accomodation:[{
      destination:String,
      name:String,
      image:String
  }]
},
   order: {
      type: Number,
      default:0
  }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Customisation', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

      saveCart: function(data, callback) {
    var mycartdata = data;
    // blue(mycartdata.myCart);
    // red(data.myCart);
    console.log(data.myCart);
    //   mycartdata.myCart.package=_.map(data.myCart.package,function(n) {
    //     n.type2 = n.type;
    //     delete n.type;  
    //     return n;
    //   });

      mycartdata = this(mycartdata);

    mycartdata.save(function(err, respo) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, respo);
      }
    });
  }
};
module.exports = _.assign(module.exports, exports, model);