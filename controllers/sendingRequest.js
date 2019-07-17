const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const RequestedUser= require('../models/requestedUser');
const mongodb= require('mongodb');

const ObjectId= mongodb.ObjectId;

exports.getUserDetails = (req, res, next) => {
    const id = req.params._id;
    User.findOne({_id : new ObjectId(id)})
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

  
exports.getCountOfRequestedUsers = (req, res, next) => {

    const ingrumCode= req.params.ingrumCode;

    RequestedUser.findOne({requestToUser: ingrumCode})
    .then(requestedUser=>{
        if(requestedUser){
            res.status(200).json({
                count: requestedUser.count
            })
        }

    }).catch(err=>{
        console.log(err);

    });
    
    // RequestedUser.aggregate([{$match:{requestToUser: ingrumCode}},{$project:{count:{$size:"$requestedUsers"}}}]).then(count=>{
    //         var result = JSON.stringify(count[0])
    //         result = result.replace(/(^\[)/, '');
    //         result =  result.replace(/(\]$)/, '');
    //         try {
    //         var resultObj = JSON.parse(result);
    //         } catch (e) {
    //         console.log("Error, not a valid JSON string");
    //         }
    //         var my_value = resultObj["count"];
    //         console.log(my_value);
    //         res.status(200).json({
    //             count: my_value
    //         })
    // }).catch(err=>{
    //     console.log(err);
    // })
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

        if(requestedUser){
                
            console.log(requestedUser);

            res.status(200).json({
                requestedUsers: requestedUser.requestedUsers
            })
        }



    }).catch({

    });

}

exports.getSpecificRequestedUser = (req, res, next) => {
    const requestToUser= req.params.param1;
    const anotherUser=req.params.param2;
    
    console.log(requestToUser);
    console.log(anotherUser);

    RequestedUser.findOne({requestToUser:requestToUser})
    .then(requestedUser=>{
        if(requestedUser){
            //console.log(requestedUser.count);
            var theRequestedUsers=requestedUser.requestedUsers;
            //console.log(theRequestedUsers);
            theRequestedUsers.forEach(element => {
                if(element.ingrumCode===anotherUser){
                    res.status(200).json({
                        requestedUser: element
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

exports.rejectRequest = async (req, res, next) => {
    const ingrumCode=req.params.ingrumCode;
    const ingrumCodeToDelete=req.body.ingrumCode;
    console.log(ingrumCode);
    console.log(ingrumCodeToDelete);

    await RequestedUser.update({ requestToUser: ingrumCode }, { "$pull": { "requestedUsers": { "ingrumCode": ingrumCodeToDelete } }}, { safe: true, multi:true }, function(err, obj) {
    });

    RequestedUser.findOne({requestToUser: ingrumCode})
        .then(requestedUser=>{
            var count=requestedUser.count-1;
            console.log(count);
            if(count===0){
                requestedUser.remove();
            }
            else{
                requestedUser.count=requestedUser.count-1;        
                requestedUser.save();
            }
        })
        .catch(err=>{
            console.log(err);
        });
}

exports.sendRequestToUser = (req, res, next) => {
    const requestToUser=req.params._id;
    const name=req.body.name;
    const imageUrl=req.body.imageUrl;
    const ingrumCode= req.body.ingrumCode;
    console.log(requestToUser);
    console.log(name);
    console.log(imageUrl);
    console.log(ingrumCode);

    var requestedUsers=[{
        "name": name,
        "imageUrl": imageUrl,
        "ingrumCode": ingrumCode
    }]


    RequestedUser.findOne({requestToUser: requestToUser})
    .then(requestedUser =>{
        if(requestedUser){

            requestedUser.count=requestedUser.count+1;
            requestedUser.save();

            RequestedUser.updateOne(
                { "requestToUser": requestToUser },
                { "$push": { "requestedUsers": requestedUsers } }
            ).then().catch(err=>{
                console.log(err);
            })
            
        }else{       

            const requestedUser= new RequestedUser({
            requestToUser: requestToUser,
            requestedUsers : requestedUsers,
            count:1
        });

        requestedUser.save();
        }

    }).catch(); 

      // Create post in db
    };
  