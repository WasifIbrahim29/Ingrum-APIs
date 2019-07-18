const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../middleware/is-auth');

const recentController = require('../controllers/recent');

const router = express.Router();

router.post('/addRecent/:ingrumCode', isAuth, recentController.addRecent);


router.get('/getAllRecentUsers/:ingrumCode', isAuth, recentController.getAllRecentUsers);

module.exports = router;  
