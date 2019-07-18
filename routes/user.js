const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const isAuth = require('../middleware/is-auth');
const userController = require('../controllers/user');

const router = express.Router();

router.put('/userDetails/:ingrumCode',isAuth, userController.updateUserDetails);


router.get('/userDetails/:ingrumCode',isAuth, userController.getUserDetails);


router.get('/socialDetails/:email', isAuth, userController.getSocialDetails);


module.exports = router;
