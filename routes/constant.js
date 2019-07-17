const express = require('express');
const { body } = require('express-validator');

const NotificationToken = require('../models/notificationToken');
const constantController = require('../controllers/constant');

const router = express.Router();

router.get('/getConstant', constantController.getApiKey);


module.exports = router;
