var express = require('express');
var router = express.Router(); 
let AuthController =  require('./auth/authController'); 
const fs = require("fs");  
const path = require('path');
var app = express();

let route = fs.readdirSync(__dirname);

route.forEach((file) => {
    if(file === 'index.js') return;
    console.log("2222 path==>",file);
    app.use(`/${file}`, require(`./${file}`))
});


router.get('/home', AuthController.dashboard); 
router.get('/login', AuthController.loginPage); 
router.get('/profile', AuthController.profilePage); 
router.post('/profle', AuthController.profile); 
router.get('/changepassword', AuthController.changePasswordPage); 
router.post('/changepassword', AuthController.changePassword); 
router.get('/settings', AuthController.settingPage); 
router.post('/settings', AuthController.setting); 
router.get('/logout', AuthController.logout); 







module.exports = router;
