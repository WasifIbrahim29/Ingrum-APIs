const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const userController = require('../controllers/user');

const router = express.Router();

router.put('/userDetails/:_id', userController.updateUserDetails);


router.get('/userDetails/:_id', userController.getUserDetails);


router.get('/userDetailsThroughCode/:ingrumCode', userController.getUserDetailsThroughCode);


router.get('/socialDetails/:email', userController.getSocialDetails);


module.exports = router;
