const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Recent= require('../models/recent');
const mongodb= require('mongodb');

const ObjectId= mongodb.ObjectId;

exports.addRecent =  (req, res, next) => {

    console.log('I am here');
    const meUser=req.params.ingrumCode;
    const name=req.body.name;
    const imageUrl=req.body.imageUrl;
    const ingrumCode= req.body.ingrumCode;
    const email=req.body.email;
    const facebook=req.body.facebook;
    const phoneNumber=req.body.phoneNumber;
    const instagram=req.body.instagram;
    const linkedin=req.body.linkedin;
    const snapchat=req.body.snapchat;
    const twitter=req.body.twitter;
    console.log(meUser);
    console.log(name);
    console.log(imageUrl);
    console.log(ingrumCode);

    var myRecents=[{
        "name": name,
        "imageUrl": imageUrl,
        "ingrumCode": ingrumCode,
        "email": email,
        "phoneNumber": phoneNumber,
        "facebook": facebook,
        "snapchat": snapchat,
        "twitter": twitter,
        "linkedin": linkedin,
        "instagram": instagram
    }]


    Recent.findOne({meUser: meUser})
    .then(user =>{
        if(user){

            console.log('update me');

            Recent.updateOne(
                { "meUser": meUser },
                { "$push": { "myRecents": {
                    "$each": myRecents
                } } }
            ).then(

            ).catch(err=>{
                console.log(err);
            })

            console.log('After adding new Recent');

            if(user.count===3){

                Recent.updateOne({ meUser: user.meUser }, { "$pop": { "myRecents": 1 }}, { safe: true, multi:true }).then(obj=>{

                    console.log('After removing first element');

                    Recent.findOne({meUser: meUser})
                    .then(updatedUser=>{

                        res.status(200).json({
                            myRecents: updatedUser.myRecents
                        })

                    }).catch({

                    });

                })
            }

            if(user.count<3){                   
                user.count=user.count+1;
                user.save();
            }
            
        }else{       
            const recent= new Recent({
            meUser: meUser,
            count: 1,
            myRecents : myRecents
        });

        recent.save();
        }

    }).catch(); 

      // Create post in db
    };

    exports.getAllRecentUsers = (req, res, next) => {
        const ingrumCode= req.params.ingrumCode;
    
        var usersProjection = { 
            _id: false,
            meUser: false,
            count: false,
            __v: false
        };
    
        Recent.findOne({meUser: ingrumCode},usersProjection)
        .then(recentUser=>{

            if(recentUser){
                
                console.log(recentUser);
                
                res.status(200).json({
                    myRecents: recentUser.myRecents
                })
            }
    
        }).catch({
    
        });
    
    
    }
  