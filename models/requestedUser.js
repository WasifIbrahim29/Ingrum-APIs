const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestedUser = new Schema({
    requestToUser:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        required:true
    },
    requestedUsers:[{
        _id:false,
            ingrumCode:{
            type:String,
            required:true
            },
            name:{
                type:String,
                required:true
            },
            imageUrl:{
                type:String,
                required:true
                }


    }]
});

module.exports = mongoose.model('RequestedUser', requestedUser);
