const express = require('express');
const { body } = require('express-validator');

const NotificationToken = require('../models/notificationToken');
const notificationController = require('../controllers/notification');

const router = express.Router();

router.post('/postNotification/:ingrumCode', notificationController.postNotification);


router.get('/getNotification/:_id', notificationController.getNotification);


module.exports = router;
