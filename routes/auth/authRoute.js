var express = require('express');
var router = express.Router(); 
var authController =  require('./authController'); 

router.get('/',  authController.dashboard);  
/* router.get('/login',  authController.dashboard);  
router.get('/login',  authController.dashboard);  
router.get('/login',  authController.dashboard);   */


module.exports = router;   