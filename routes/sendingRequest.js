const express = require('express');
const { body } = require('express-validator');

const sendingRequestController = require('../controllers/sendingRequest');

const router = express.Router();

router.post('/request/:_id', sendingRequestController.sendRequestToUser);

router.get('/getCount/:ingrumCode', sendingRequestController.getCountOfRequestedUsers);


router.delete('/rejectRequest/:ingrumCode', sendingRequestController.rejectRequest);


router.get('/getSpecificRequestedUser/:param1/:param2', sendingRequestController.getSpecificRequestedUser);


router.get('/getAllRequestedUsers/:ingrumCode', sendingRequestController.getAllRequestedUsers);

module.exports = router;  
