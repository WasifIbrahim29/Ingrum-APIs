const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middleware/is-auth');

const sendingRequestController = require('../controllers/sendingRequest');

const router = express.Router();

router.post('/request/:ingrumCode',isAuth, sendingRequestController.sendRequestToUser);

router.get('/getCount/:ingrumCode', isAuth, sendingRequestController.getCountOfRequestedUsers);


router.delete('/rejectRequest/:ingrumCode', isAuth, sendingRequestController.rejectRequest);


router.get('/getSpecificRequestedUser/:param1/:param2', isAuth, sendingRequestController.getSpecificRequestedUser);


router.get('/getAllRequestedUsers/:ingrumCode', isAuth, sendingRequestController.getAllRequestedUsers);

module.exports = router;  
