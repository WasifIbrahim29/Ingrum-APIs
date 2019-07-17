const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const location = new Schema({
  GeoPoint: {
    type: Object,
    required: true
  },
  userid:{
      type:String,
      required:true
  }
});

module.exports = mongoose.model('Location', location);
