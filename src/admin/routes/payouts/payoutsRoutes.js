const express = require('express');
const router = express.Router(); 
const payoutsController =  require('./payoutsController'); 

router.get('/',  payoutsController.userPage); 

router.get('/list',  payoutsController.list);     



module.exports = router;   