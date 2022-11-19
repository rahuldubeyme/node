var express = require('express');
var router = express.Router(); 
var authController =  require('./authController'); 

router.get('/login',  authController.list);     
router.get('/forgetPassword', authController.edit);     
router.post('/forgetPassword',  authController.edit); 
router.get('/signUp', authController.add); 
router.post('/signUp',  authController.add);


module.exports = router;   