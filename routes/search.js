const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../middleware/is-auth');

const NotificationToken = require('../models/notificationToken');
const searchController = require('../controllers/search');

const router = express.Router();

router.get('/searchUsers/:ingrumCode',isAuth, searchController.getAllUsers);


module.exports = router;
