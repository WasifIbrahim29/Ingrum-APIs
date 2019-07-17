const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const radarController = require('../controllers/radar');

const router = express.Router();

router.post('/postMyLocation/:_id', radarController.postMyLocation);


router.delete('/deleteMyLocation/:_id', radarController.deleteMyLocation);



router.get('/getTheNearbyUsers/:id', radarController.getTheNearbyUsers);


router.get('/getMyLocation/:_id', radarController.getMyLocation);


module.exports = router;
