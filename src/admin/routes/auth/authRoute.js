const express = require('express');
const router = express.Router(); 
const AuthController =  require('./authController'); 
const varifyToken =  require('../../utils/auth'); 



router.get('/login',  AuthController.loginPage); 

router.post('/login',  AuthController.login); 

router.get('/dashboard', AuthController.dashboard); 


module.exports = router;   