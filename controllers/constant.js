const { validationResult } = require('express-validator');

const Constant = require('../models/constants');
const mongodb= require('mongodb');

const ObjectId= mongodb.ObjectId;
    
exports.getApiKey = (req, res, next) => {

    var usersProjection = {
        _id:false
    };


    Constant.findOne({_id : new ObjectId('5d27cb27da45fc3ad91b7f10')},usersProjection)
    .then(apiKey=>{
            res.status(200).json({
                apiKey: apiKey.apiKey
            })

    })
    .catch(err=>{

        console.log(err);
    });
    };
  