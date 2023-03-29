const express = require('express');
const router = express.Router(); 
const AuthController =  require('./authController'); 
const varifyToken =  require('../../utils/auth'); 
let token = varifyToken.varifyToken;



router.get('/',token, AuthController.dashboard); 

router.get('/auth-login', token, AuthController.loginPage); 

router.post('/login', token,  AuthController.login); 

router.get('/profile',token,  AuthController.profilePage); 

router.post('/profle', token, AuthController.profile); 

router.get('/changepassword',token,  AuthController.changePasswordPage); 

router.post('/changepassword', token, AuthController.changePassword); 

router.get('/settings', token, AuthController.settingPage); 

router.post('/settings', token, AuthController.setting); 

router.get('/logout', token, AuthController.logout); 



module.exports = router;   