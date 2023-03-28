const express = require('express');
const router = express.Router(); 
const AuthController =  require('./authController'); 



router.get('/', AuthController.dashboard); 

router.get('/auth-login', AuthController.loginPage); 

router.post('/login', AuthController.login); 

router.get('/profile', AuthController.profilePage); 

router.post('/profle', AuthController.profile); 

router.get('/changepassword', AuthController.changePasswordPage); 

router.post('/changepassword', AuthController.changePassword); 

router.get('/settings', AuthController.settingPage); 

router.post('/settings', AuthController.setting); 

router.get('/logout', AuthController.logout); 



module.exports = router;   