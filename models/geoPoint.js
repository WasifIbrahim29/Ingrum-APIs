const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const geoPoint = new Schema({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('GeoPoint', geoPoint);
