var express = require('express');
var router = express.Router(); 
let AuthController =  require('./auth/authController'); 
console.log('===>>',AuthController.login); 
const fs = require("fs");  
const path = require('path');
var app = express();
let route = fs.readdirSync(__dirname);
console.log("check path==>",route);
route.forEach((file) => {
    console.log("1111 path==>",file);
    if(file === 'index.js') return;
    app.use(`/${file}`, require(`./${file}`))
});






router.get('/', AuthController.loginPage); 
router.get('/login', AuthController.login); 
router.get('/profile', AuthController.profilePage); 
router.post('/profle', AuthController.profile); 
router.get('/changepassword', AuthController.changePasswordPage); 
router.post('/changepassword', AuthController.changePassword); 
router.get('/setting', AuthController.settingPage); 
router.post('/setting', AuthController.setting); 
router.get('/logout', AuthController.logout); 







module.exports = router;
