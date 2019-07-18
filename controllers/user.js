const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Socials= require('../models/socials');
const mongodb= require('mongodb');

const ObjectId= mongodb.ObjectId;

exports.getUserDetails = (req, res, next) => {
    const ingrumCode = req.params.ingrumCode;
    var usersProjection = { 
        __v: false,
        isVerified:false
    };
    User.findOne({ingrumCode : ingrumCode},usersProjection)
    .then(user =>{
        res.status(201).json({
            user: user
          });

    })
    .catch(err =>{
        console.log(err);
    });
    // Create post in db
  };


  
exports.getSocialDetails = (req, res, next) => {
    const email = req.params.email;
    var usersProjection = { 
        __v: false,
        isVerified:false
    };
    User.findOne({email : email},usersProjection)
    .then(user =>{
        if(user){
            res.status(201).json({
                user: user
            })
        }
        else{
            res.status(201).json({
                message: "The user doesn't exists."
              });
        }

    })
    .catch(err =>{
        console.log(err);
    });
    // Create post in db
  };

exports.updateUserDetails = (req, res, next) => {
    const ingrumCode=req.params.ingrumCode;
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const position=req.body.position;
    const company=req.body.company;
    const ingrumScore=req.body.ingrumScore;
    const facebook=req.body.facebook;
    const instagram=req.body.instagram;
    const linkedin=req.body.linkedin;
    const twitter=req.body.twitter;
    const phoneNumber=req.body.phoneNumber;
    const snapchat=req.body.snapchat;
    const imageUrl=req.body.imageUrl;
    const friendSettings=req.body.friendSettings;
    const customSettings=req.body.customSettings;
    const corporateSettings=req.body.corporateSettings;

    var usersProjection = { 
        __v: false,
        isVerified:false
    };
  
    console.log(facebook);
  
    User.findOne({ingrumCode : ingrumCode},usersProjection)
      .then(user =>{
          user.email=email;
          user.facebook=facebook;
          user.phoneNumber=phoneNumber;
          user.snapchat=snapchat;
          user.position=position;
          user.company=company;
          user.ingrumCode=ingrumCode;
          user.ingrumScore=ingrumScore;
          user.instagram=instagram;
          user.linkedin=linkedin;
          user.name=name;
          user.password=password;
          user.twitter=twitter;
          user.friendSettings=friendSettings;
          user.customSettings=customSettings;
          user.corporateSettings=corporateSettings;
          user.twitter=twitter;
          user.imageUrl=imageUrl;
          user.save();
  
      })
      .catch(err =>{
          console.log(err);
      });
      // Create post in db
    };
  