var express = require('express');
var router = express.Router(); 
let AuthController =  require('./auth/authController'); 
const fs = require("fs");  

const path = require('path');
var app = express();

let route = fs.readdirSync(__dirname);

route.forEach((file) => {
    if(file === 'index.js') return;
    app.use(`/${file}`, require(`./${file}`))
});



router.get('/login', AuthController.loginPage); 

router.post('/login', AuthController.login); 

router.get('/dashboard', AuthController.dashboard); 

router.get('/profile', AuthController.profilePage); 

router.post('/profle', AuthController.profile); 

router.get('/changepassword', AuthController.changePasswordPage); 

router.post('/changepassword', AuthController.changePassword); 

router.get('/settings', AuthController.settingPage); 

router.post('/settings', AuthController.setting); 

router.get('/logout', AuthController.logout); 







module.exports = router;
