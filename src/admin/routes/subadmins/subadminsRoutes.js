const express = require('express');
const router = express.Router(); 
const subadminsController =  require('./subadminsController'); 

router.get('/',  subadminsController.userPage); 

router.get('/list',  subadminsController.list);     



module.exports = router;   