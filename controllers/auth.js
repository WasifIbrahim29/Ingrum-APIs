const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
var jwt= require('jsonwebtoken');
var config=require('../')

const User = require('../models/user');
const Token = require('../models/token');
const Socials=require('../models/socials');


const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:
          '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'
      }
    })
  );

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    var usersProjection = { 
        __v: false,
        _id:false

    };
    User.findOne({ email: email },usersProjection)
      .then(user => {
        if (!user) {
            console.log('Check post 1');
            res.status(201).json({
                message: "Invalid email or Password!"
            })
        }
        // Make sure the user has been verified
        else{
            console.log('Check post 2');
            if (!user.isVerified) return res.status(401).send({ message: 'Your account has not been verified.' });
            var newUsersProjection = { 
                __v: false,
                isVerified:false,
                _id:false
        
            };
            User.findOne({ email: email },newUsersProjection)
            .then(user => { 

                console.log('Check post 3');
                    
                bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                if (doMatch) {
                    console.log('wasif is here');
                    jwt.sign({user:user},'secret1',(err,token)=>{
                        res.status(201).json({
                            user: user,
                            token:token
                            })
                    })
                    
                }
                else{
                    res.status(201).json({
                        message: "Invalid email or Password!"
                    })
                }
                })
                .catch(err => {
                    console.log(err);
                });

            });

        }
      })
      .catch(err => console.log(err));
  };

  exports.confirmationPost = function (req, res, next) {
 
    // Find a matching token
    Token.findOne({ token: req.params.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
 
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                console.log('The account has been verified. Please log in.');
                res.status(200).send("The account has been verified. Please log in.");
            });
        });
    });
};

  

exports.signup = (req, res, next) => {

    console.log('I am here');

  const email = req.body.email;
  const name = req.body.name;
  const company=req.body.company;
  const position=req.body.position;
  const password = req.body.password;
  const ingrumScore=req.body.ingrumScore;
  const ingrumCode=req.body.ingrumCode;
  const facebook=req.body.facebook;
  const instagram=req.body.instagram;
  const linkedin=req.body.linkedin;
  const twitter=req.body.twitter;
  const phoneNumber=req.body.phoneNumber;
  const snapchat=req.body.snapchat;
  const imageUrl=req.body.imageUrl;
  const friendSettingSchema=req.body.friendSettings;
  const customSettingSchema=req.body.customSettings;
  const corporateSettingSchema=req.body.corporateSettings;

  User.findOne({ingrumCode : ingrumCode})
  .then(userAlreadyExists =>{
      if(userAlreadyExists){
          res.status(201).json({
              message: "Ingrum code already taken."
          })
      }
      else{
          User.findOne({email : email})
          .then(UserAlreadyHasThisEmail =>{
              if(UserAlreadyHasThisEmail){
                res.status(201).json({
                    message: "Email already taken."
                })
              }
              else{

                        bcrypt.hash(password,12)
                  .then(hashedPassowrd=>{
                      
                    var token;
                    crypto.randomBytes(24, function(err, buffer) {
                        token = buffer.toString('hex');
                        console.log(token);

                    const user = new User({
                        email: email,
                        password: hashedPassowrd,
                        name: name,
                        ingrumCode: ingrumCode,
                        facebook: facebook,
                        ingrumScore: ingrumScore,
                        instagram : instagram,
                        linkedin : linkedin,
                        position : position,
                        company : company,
                        twitter : twitter,
                        phoneNumber : phoneNumber,
                        snapchat : snapchat,
                        imageUrl: imageUrl,
                        friendSettings : friendSettingSchema,
                        customSettings : customSettingSchema,
                        corporateSettings : corporateSettingSchema
                    });
                    user.save();

                    var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
            
                    // Save the verification token
                    token.save(function (err) {
                        if (err) { return res.status(500).send({ msg: err.message }); }
            
                        // Send the email
                        var mailOptions = { from: 'www.ingrumid.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '/auth' + '\/confirmation\/' + token.token + '.\n' };
                        transporter.sendMail(mailOptions, function (err) {
                            console.log('I am here');
                            console.log(err);
                            if (err) { return res.status(500).send({ msg: err.message }); }
                            console.log('A verification email has been sent.');
                            res.status(201).json({
                                message: "A verification email has been sent."
                            })
                        });
                    });
                  })
                  });
                  
              }

          }).catch(err=>{
              console.log(err);
          })
      }
  })
  .catch(err =>{
      console.log(err);
  });
};