const express = require('express');
const { body } = require('express-validator');

const friendsController = require('../controllers/friends');

const router = express.Router();

router.post('/addFriend/:ingrumCode', friendsController.addFriend);

router.get('/getUserDetails/:ingrumCode', friendsController.getUserDetails);

router.get('/getSpecificFriend/:param1/:param2', friendsController.getSpecificFriend);

router.get('/getAllFriends/:ingrumCode', friendsController.getAllFriends);

module.exports = router;  
