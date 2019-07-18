const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const radarController = require('../controllers/radar');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/postMyLocation/:ingrumCode', isAuth, radarController.postMyLocation);


router.delete('/deleteMyLocation/:ingrumCode', isAuth, radarController.deleteMyLocation);



router.get('/getTheNearbyUsers/ingrumCode', isAuth, radarController.getTheNearbyUsers);


router.get('/getMyLocation/:ingrumCode', isAuth, radarController.getMyLocation);


module.exports = router;
