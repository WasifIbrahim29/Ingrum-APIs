const express = require('express');
const { body } = require('express-validator');

const NotificationToken = require('../models/notificationToken');
const searchController = require('../controllers/search');

const router = express.Router();

router.get('/searchUsers/:ingrumCode', searchController.getAllUsers);


module.exports = router;
