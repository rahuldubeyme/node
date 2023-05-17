const express = require('express');
const router = express.Router(); 
const ordersController =  require('./ordersController'); 

router.get('/',  ordersController.userPage); 

router.get('/list',  ordersController.list);     



module.exports = router;   