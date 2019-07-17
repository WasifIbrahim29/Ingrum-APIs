const { validationResult } = require('express-validator');

const User = require('../models/user');
const mongodb= require('mongodb');
const async=require('async');

const ObjectId= mongodb.ObjectId;


    
exports.getAllUsers = async (req, res, next) => {
    const ingrumCode=req.params.ingrumCode;
    var allUsers=[];
    var userMap={};

    
    var usersProjection = { 
        __v: false,
        isVerified: false
    };

    await User.find({},usersProjection)
    .then(users =>{

        users.forEach(function(user){
            if(user.ingrumCode!==ingrumCode){
                allUsers.push(user);
            }
        })      
      
    }) 
    res.status(200).json({
        allUsers: allUsers
    })
    };
  