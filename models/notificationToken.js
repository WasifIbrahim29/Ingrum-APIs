const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationToken = new Schema({
    user:{
        type: String,
        required:true
    },
  notificationToken: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('NotificationToken', notificationToken);
