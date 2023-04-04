var express = require('express');
var router = express.Router(); 
const AuthController =  require('./auth/authController'); 
const verifyToken =  require('../utils/auth'); 
const token = verifyToken.varifyToken;



const fs = require("fs");  

const path = require('path');
var app = express();

let route = fs.readdirSync(__dirname);

route.forEach((file) => {
    console.log('file 23==>>',file)
    if(file === 'index.js') return file;

    console.log('Middleware function running==>>', file);
    app.use(`/${file}`, require(`./${file}`))
});


router.get('/auth/auth-login', function(req, res) {
    res.send('Hello World!');
    return;
  });

/* all login routes */
console.log('token==>',token);

router.get('/',token, AuthController.dashboard); 

router.get('/profile',token,  AuthController.profilePage); 

router.post('/profle', token, AuthController.profile); 

router.get('/changepassword',token,  AuthController.changePasswordPage); 

router.post('/changepassword', token, AuthController.changePassword); 

router.get('/settings', token, AuthController.settingPage); 

router.post('/settings', token, AuthController.setting); 

router.get('/logout', token, AuthController.logout); 


module.exports = router;
