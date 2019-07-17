const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recent = new Schema({
    meUser:{
        type:String,
        required:true
    },
    count:{
        type: Number,
        required: true
    },
    myRecents:[{
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
                },
            email:{
                type:String,
                required:true
            },
            phoneNumber:{
                type:String,
                required:true
            },
            facebook:{
                type:String,
                required:true
            },
            instagram:{
                type:String,
                required:true
            },
            linkedin:{
                type:String,
                required:true
            },
            snapchat:{
                type:String,
                required:true
            },
            twitter:{
                type:String,
                required:true
            }    

    }]
});

module.exports = mongoose.model('Recent', recent);
