const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Friend= require('../models/friend');
const mongodb= require('mongodb');

const ObjectId= mongodb.ObjectId;



exports.getAllFriends = (req, res, next) => {
    const ingrumCode= req.params.ingrumCode;

    var usersProjection = { 
        _id: false,
        meUser: false,
        __v: false
    };

    Friend.findOne({meUser: ingrumCode},usersProjection)
    .then(friend=>{

        if(friend){

            console.log(friend);
            res.status(200).json({
                myFriends: friend.myFriends
            })
        }

    }).catch({

    });


}


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

  exports.getSpecificFriend = (req, res, next) => {
    const meUser= req.params.param1;
    const anotherUser=req.params.param2;
    
    console.log(meUser);
    console.log(anotherUser);

    Friend.findOne({meUser:meUser})
    .then(friend=>{
        if(friend){
            //console.log(requestedUser.count);
            var TheFriends=friend.myFriends;
            //console.log(theRequestedUsers);
            TheFriends.forEach(element => {
                if(element.ingrumCode===anotherUser){
                    res.status(200).json({
                        myFriend: element
                    })
                }
                
            });
        }
        else{
            res.json({
                message: 'Not found' 
            })
        }

    }).catch({

    });

}

exports.getAllRequestedUsers = (req, res, next) => {
    const ingrumCode= req.params.ingrumCode;

    var usersProjection = { 
        _id: false,
        ingrumCode: false,
        requestToUser:false
    };

    RequestedUser.findOne({requestToUser: ingrumCode},usersProjection)
    .then(requestedUser=>{

        console.log(requestedUser);

        res.status(200).json({
            requestedUsers: requestedUser.requestedUsers
        })

    }).catch({

    });


}

exports.addFriend = (req, res, next) => {

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

    var myFriends=[{
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


    Friend.findOne({meUser: meUser})
    .then(user =>{
        if(user){

            user.count= user.count+1;
            user.save();

            Friend.updateOne(
                { "meUser": meUser },
                { "$push": { "myFriends": myFriends } }
            ).then().catch(err=>{
                console.log(err);
            })
            
        }else{       

            const friend= new Friend({
            meUser: meUser,
            myFriends : myFriends,
            count : 1
        });

        friend.save();
        }

    }).catch(); 

      // Create post in db
    };
  