const express = require('express');
const { body } = require('express-validator');

const recentController = require('../controllers/recent');

const router = express.Router();

router.post('/addRecent/:ingrumCode', recentController.addRecent);


router.get('/getAllRecentUsers/:ingrumCode', recentController.getAllRecentUsers);

module.exports = router;  
