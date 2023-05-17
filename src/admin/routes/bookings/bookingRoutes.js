const express = require('express');
const router = express.Router(); 
const bookingController =  require('./bookingController'); 

router.get('/',  bookingController.userPage); 

router.get('/list',  bookingController.list);     



module.exports = router;   