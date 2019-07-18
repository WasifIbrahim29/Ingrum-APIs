const { validationResult } = require('express-validator');

const NotificationToken = require('../models/notificationToken');
const mongodb= require('mongodb');

const ObjectId= mongodb.ObjectId;

exports.postNotification = (req, res, next) => {
    const ingrumCode=req.params.ingrumCode;
    const token=req.body.notificationToken;
    console.log(ingrumCode);
    console.log(token);

    const notificationToken= NotificationToken({
        ingrumCode: ingrumCode,
        notificationToken: token
    })

    notificationToken.save();
    };


    
exports.getNotification = (req, res, next) => {
    const ingrumCode=req.params.ingrumCode;

    console.log('I am here');

    var usersProjection = { 
        ingrumCode: false,
        __v: false,
        _id:false
    };

    NotificationToken.findOne({ingrumCode : ingrumCode},usersProjection)
    .then(notificationToken=>{
        if(notificationToken){
            res.status(200).json({
                notificationToken: notificationToken.notificationToken
            })
        }

    })
    .catch(err=>{

        console.log(err);
    });
    };
  