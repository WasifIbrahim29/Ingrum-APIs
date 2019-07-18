const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


const Location = require('../models/location');
const GeoPoint=require('../models/geoPoint');
const Socials= require('../models/socials');
var async = require("async");
var forEachAsync = require('futures').forEachAsync;


var rp = require('request-promise');

const mongodb= require('mongodb');

const ObjectId= mongodb.ObjectId;
var distance = require('google-distance');

exports.getMyLocation = (req, res, next) => {
    const ingrumCode = req.params.ingrumCode;
    var usersProjection = { 
        __v: false,
        _id: false
    };
    Location.findOne({ ingrumCode : ingrumCode},usersProjection)
    .then(location =>{
        res.status(201).json({
            location: location
          });

    })
    .catch(err =>{
        console.log(err);
    });
    // Create post in db
  };

  exports.getTheNearbyUsers= async(req,res,next)=>{
      const ingrumCode= req.params.ingrumCode;
      var usersProjection = { 
        __v: false,
        _id: false,
        ingrumCode:false
    };


    // Step 1: Get my own location

    var myLocation= await Location.findOne({ingrumCode: ingrumCode},usersProjection)
    .then(myLocation=>{

        return myLocation;

    }).catch({

    });
    
    console.log('My latitude is: '+ myLocation.GeoPoint.latitude);
    console.log('My longitude is: '+ myLocation.GeoPoint.longitude);

    var allUsers= await Location.find({})
    .then(allUsers=>{
        return allUsers;

    })
    .catch();

    otherUsers=[];
    var ifThereAreOtherUsers=false;
    await allUsers.forEach(element => {
        if(element.ingrumCode !== ingrumCode){
            otherUsers.push(element);
            ifThereAreOtherUsers=true;

        }
    });

    console.log(otherUsers);

    if(ifThereAreOtherUsers){

        console.log('why am I here');
        var myNearbyUsers=[];

        await async.eachSeries(otherUsers, function(element,next){
            
            lon1=myLocation.GeoPoint.longitude;
            lat1=myLocation.GeoPoint.latitude;
            lon2=element.GeoPoint.longitude;
            lat2=element.GeoPoint.latitude;
            //console.log('My latitude= ' +myLatitude);
            var exactDistance='';

            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344 ;
            console.log('The distance is: '+ dist);
            if(dist<1){
                myNearbyUsers.push(element.ingrumCode);
                next();
            }

            // var options = {
            //     uri: 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+ myLatitude + ',' + myLongitude + '&destinations=' + otherLatitude + '%2C' + otherLongitude + '&key=AIzaSyBgAFQynczAxKx7MzaZFHTwKShvWW5mBS4',
            //     headers: {
            //         'User-Agent': 'Request-Promise'
            //     },
            //     json: true // Automatically parses the JSON string in the response
            // };

            // async function helpme (a){

            //     await rp(options)
            //     .then(function (body) {
            //         console.log(body);
            //         var obj1=body.rows;
            //         var newArray = obj1.filter(function (el) {
            //             //console.log(el.elements);
            //             var newArray1 = el.elements.filter(function (el) {
            //                 var distance=el.distance.value;
            //                 console.log(distance);
            //                 if(distance<100000){
            //                     myNearbyUsers.push(element.userid);
            //                     next();
            //                     //console.log(myNearbyUsers);
            //                 }
            //                 else{
            //                     next();
            //                 }
                            
            //             });
            //         });

            //     })
            //     .catch(function (err) {
            //         // API call failed...
            //     });

            // }

            // helpme();
        })

        console.log(myNearbyUsers);

        res.status(201).json({
            myNearbyUsers: myNearbyUsers
        })
        
        
    }
    else{
        res.status(201).json({
            message: 'No nearby contacts found.'
        })
    }


  }


exports.postMyLocation = async (req, res, next) => {
    console.log("what is this sorcery!!!");
    const ingrumCode=req.params.ingrumCode;
    const geoPoint=req.body.geoPoint;

    console.log(geoPoint);

    await Location.findOne({ingrumCode: ingrumCode})
    .then(location =>{
        if(!location){         
            const location1 = new Location({
                GeoPoint: geoPoint,
                ingrumCode: ingrumCode
            });
            location1.save();

            res.status(200).json({
                location : location1
            })
        }

    }).catch({

    })

    console.log("leaving");
    };

    exports.deleteMyLocation = (req, res, next) => {
        const ingrumCode=req.params.ingrumCode;

        Location.findOne({ingrumCode : ingrumCode})
            .then(location =>{
                if(location){                        
                    console.log(location);
                    location.remove();
                }
            })
            .catch(err =>{
                console.log(err);
            });
    }
  